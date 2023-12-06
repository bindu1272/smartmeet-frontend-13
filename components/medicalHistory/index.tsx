"use client";
import { Input, Collapse, Select } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import HeaderComponent from './headerComponent';
import ContectCard from './contectCard';
import EmptyCard from '../emptyCard';
import { get, map } from 'lodash';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { authorizeGetRequest } from '../../utilities/axiosHelper';
import { axiosInstance } from '../../remote/axios';
import ButtonPrimary from '../buttons/buttonPrimary';
import axios from 'axios';
import filterArr from 'lodash/filter';
import includes from 'lodash/includes';
import ButtonDefault from '../buttons/buttonDefault';
import getConfig from 'next/config';
import { saveAs } from 'file-saver';
// const { publicRuntimeConfig } = getConfig();
const backendUrl = process.env.NEXT_PUBLIC_API_URL;

const { Panel } = Collapse;
const { Option } = Select;

function callback(key:any) {
  console.log(key);
}

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

export default function MedicalHistory({ data, isAllMedicalHistory }:any) {
  const {data : session} = useSession();
  const [medicalHistory, setMedicalHistory] = useState<any>({
    data: [],
    filterData: [],
    pagination: null,
  });
  const [AllMedicalHistory, setAllMedicalHistory] =
    useState(isAllMedicalHistory);
  const [members, setMembers] = useState([{ name: 'MySelf', id: '' }]);
  const [filter, setFilter] = useState(members[0].id);

  useEffect(() => {
    if (isAllMedicalHistory) {
      const getFamilyMedicalHisotryInitial = async (page = 1, id = '') => {
        let url = `/patients/medical-history?limit=10&page=${page}`;
        if (id) {
          url = url.concat(`&members_uuid=${id}`);
        }
        let result = await authorizeGetRequest(
          axiosInstance,
          get(session, 'user'),
          url
        );
        console.log('Results>>>>', result);
        if (page > 1) {
          setMedicalHistory({
            data: [...get(medicalHistory, 'data'), ...result.data.data.data],
            filterData: [...get(medicalHistory, 'data'), ...result.data.data.data],
            pagination: result.data.data.meta.pagination,
          });
        } else {
          setMedicalHistory({
            data: result.data.data.data,
            filterData: result.data.data.data,
            pagination: result.data.data.meta.pagination,
          });
        }
    
        setFilter(id);
      };
      getFamilyMedicalHisotryInitial();

      const getFamilyMembersIntial = async () => {
        let result = await authorizeGetRequest(
          axiosInstance,
          get(session, 'user'),
          `/patients/dashboard`
        );
        const familyMembers = map(get(result, 'data.data.members'), (member) => {
          return { name: get(member, 'name'), id: get(member, 'id') };
        });
    
        setMembers([...members, ...familyMembers]);
      };

      getFamilyMembersIntial();
    }
  }, []);

  const onSearch = (value:any) => {
    let ndata = get(medicalHistory, 'data');
    console.log(ndata);
    let filterdata = filterArr(ndata, (data) => {
      const searchableData = JSON.stringify(data);

      return includes(searchableData, value);
    });
    setMedicalHistory({ data: ndata, filterData: filterdata,pagination:null });
  };

  const getFamilyMembers = async () => {
    let result = await authorizeGetRequest(
      axiosInstance,
      get(session, 'user'),
      `/patients/dashboard`
    );
    const familyMembers = map(get(result, 'data.data.members'), (member) => {
      return { name: get(member, 'name'), id: get(member, 'id') };
    });

    setMembers([...members, ...familyMembers]);
  };

  const getFamilyMedicalHisotry = async (page = 1, id = '') => {
    let url = `/patients/medical-history?limit=10&page=${page}`;
    if (id) {
      url = url.concat(`&members_uuid=${id}`);
    }
    let result = await authorizeGetRequest(
      axiosInstance,
      get(session, 'user'),
      url
    );
    console.log('Results>>>>', result);
    if (page > 1) {
      setMedicalHistory({
        data: [...get(medicalHistory, 'data'), ...result.data.data.data],
        filterData: [...get(medicalHistory, 'data'), ...result.data.data.data],
        pagination: result.data.data.meta.pagination,
      });
    } else {
      setMedicalHistory({
        data: result.data.data.data,
        filterData: result.data.data.data,
        pagination: result.data.data.meta.pagination,
      });
    }

    setFilter(id);
  };

  const handleMedicalHisotry = () => {
    getFamilyMembers();
    getFamilyMedicalHisotry(get(medicalHistory, 'pagination.current_page', 1), get(data, 'patient.id'));
    setAllMedicalHistory(true);
  };

  const handleDownload = async () => {
    axios({
      url: `${backendUrl}/patients/${get(
        data,
        'patient.id'
      )}/medical-history/${get(data, 'appointment_notes.id')}/print`, //your url
      method: 'GET',
      headers: {
        authorization: `Bearer ${get(session, 'user.token')}`,
      },
      // responseType: 'blob', // important
    }).then((response) => {
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'Medical_Report.pdf'); //or any other extension
      // document.body.appendChild(link);
      // link.click();
      saveAs(response?.data?.url, "Medical History");
    });
  };

  const handleLoadMore = () => {
    if (
      get(medicalHistory, 'pagination.current_page') + 1 <=
      get(medicalHistory, 'pagination.total_pages')
    ) {
      getFamilyMedicalHisotry(
        get(medicalHistory, 'pagination.current_page') + 1,
        filter
      );
    }
  };

  return (
    <div className={styles["medical-history-style"]}>
      {!AllMedicalHistory ? (
        <>
          {get(data, 'appointment_notes') ? (
            <>
              <div className={styles["collapse-section"]}>
                <div className={styles["title-sm"]}>{get(data, 'hospital.name')}</div>
                <Collapse defaultActiveKey={['1']} onChange={callback}>
                  <Panel header={<HeaderComponent data={data} />} key="1">
                    <ContectCard
                      notes={get(data, 'appointment_notes.notes')}
                      attachments={get(data, 'appointment_notes.attachments')}
                      handleDownload={handleDownload}
                    />
                  </Panel>
                </Collapse>
              </div>{' '}
              <div className={styles["button_medicalHistory"]}>
                <ButtonPrimary
                  title="See Full Medical History"
                  onClick={handleMedicalHisotry}
                />
              </div>
            </>
          ) : (
            <EmptyCard description="No medical Report. Book appointment and get consultation from doctor." />
          )}
        </>
      ) : (
        <>
          {medicalHistory.filterData ? (
            <>
              <div className={styles["search-section"]}>
                <div className={styles["title"]}>Medical Reports</div>
                <div className={styles["search-item"]}>
                  <Search
                    placeholder="Search by Doctor or Date of appointment"
                    onSearch={onSearch}
                  />
                </div>
              </div>
              <div className={styles["member-filter"]}>
                <Select
                  size={'large'}
                  value={filter}
                  onChange={(value) => getFamilyMedicalHisotry(1, value)}
                >
                  {map(members, (filter, i) => (
                    <Option key={i} value={get(filter, 'id')}>
                      {get(filter, 'name')}
                    </Option>
                  ))}
                </Select>
              </div>
              {get(medicalHistory, 'filterData').length > 0 ? (
                <div className={styles["collapse-section"]}>
                  {map(get(medicalHistory, 'filterData'), (singleReport) => (
                    <>
                      {' '}
                      <div className={styles["title-sm"]}>
                        {get(singleReport, 'appointment.hospital.name')}
                      </div>
                      <Collapse defaultActiveKey={['1']} onChange={callback}>
                        <Panel
                          header={
                            <HeaderComponent
                              data={get(singleReport, 'appointment')}
                            />
                          }
                          key="1"
                        >
                          <ContectCard
                            notes={get(singleReport, 'notes')}
                            attachments={get(singleReport, 'attachments')}
                            handleDownload={handleDownload}
                          />
                        </Panel>
                      </Collapse>
                    </>
                  ))}
                  {get(medicalHistory, 'pagination.current_page') + 1 <=
                    get(medicalHistory, 'pagination.total_pages') && (
                    <div className={styles["button_loadMore"]}>
                      <ButtonDefault
                        title="Load more"
                        onClick={handleLoadMore}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <EmptyCard description="No medical report found" />
              )}{' '}
            </>
          ) : (
            <EmptyCard description="No medical Report. Book appointment and get consultation from doctor." />
          )}
        </>
      )}
    </div>
  );
}
