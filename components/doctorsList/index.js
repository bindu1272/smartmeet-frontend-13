"use client";
import React from 'react';
import { Card, Input, Row, Col, List, Empty } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import map from 'lodash/map';
import get from 'lodash/get';
import { useRouter } from 'next/navigation';
import RatingBox from '../ratingBox';
import ButtonPrimary from '../buttons/buttonPrimary';
import PaginationPrimary from '../paginationPrimary';
import { getDoctorAddress } from '../../utilities/helpers';
import Image from "next/image";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = (value) => console.log(value);

// styles
import styles from './styles.module.scss';
import bookAppointmentStyles from "@/app/bookAppointment/styles.module.scss"
import DoctorsCount from '../doctorsCount/DoctorsCount';

export default function DoctorsList(props) {
  const { doctors, specialisations, currentPage, setCurrentPage } = props;

  React.useEffect(() => {});

  const tagList = [
    {
      text: 'All',
      value: doctors?.length,
    },
    {
      text: 'Cardiologist',
      value: '06',
    },
    {
      text: 'GP',
      value: '02',
    },
    {
      text: 'GPS',
      value: '022',
    },
  ];

  const router = useRouter();

  const goDoctorInfo = ({ doctor, hospital }) => {
    router.push(
      `/hospital/${get(hospital, 'slug')}/doctor/${get(doctor, 'id')}`
    );
  };

  const goToHospital = (id) => {
    router.push('/hospital/' + id);
  };

  return (
    <div className={styles["doctors-list"]}>
      <div className={styles["doctor-section"]}>
        <div className={bookAppointmentStyles["title2"]}>{props.title}</div>

        {doctors?.length > 0 ? (
          <>
            {' '}
            <div className={styles["action-section"] + " "+"mb--30"}>
              <DoctorsCount
                specialisations={specialisations}
                doctors={doctors}
              />
            </div>
            <div className={styles["card-section"]}>
              <List
                itemLayout="vertical"
                size="large"
                className={styles["custom-list"]}
                pagination={{
                  onChange: (page) => {
                    setCurrentPage(page);
                  },
                  current: currentPage,
                  pageSize: 10,
                }}
                dataSource={doctors}
                renderItem={({ doctor, hospital }) => (
                  <Card className={styles["card-style"]}>
                    <div className={styles["img-card"]}>
                      <Image alt="" width={114.49} height={130}
                        src={get(doctor?.image, 'url')}
                        className={styles["sm"]}
                        onClick={() => {
                          goDoctorInfo({ doctor, hospital });
                        }}
                      />
                    </div>

                    <div className={styles["text-section"]}>
                      <h4
                        className={styles["title4"]}
                        onClick={() => {
                          goDoctorInfo({ doctor, hospital });
                        }}
                      >{`${get(doctor, 'title')} ${get(doctor, 'name')}`}</h4>

                      <RatingBox
                        ratingValue={get(doctor, 'doctor_detail.rating')}
                        ratingText={true}
                        edit={false}
                      />
                      <div
                        className={styles["description"] + " " + styles["hospital-name"]}
                        onClick={() => goToHospital(get(hospital, 'slug'))}
                      >
                        {get(hospital, 'name')}
                      </div>
                      <div className={styles["description"]}>{getDoctorAddress(hospital)}</div>

                      <div className={styles["description"]}>
                        {get(doctor, 'doctor_detail.qualifications')}{' '}
                        {get(doctor, 'doctor_detail.experience')}, Years
                        Experience
                      </div>
                    </div>

                    <div className={styles["action-section"]}>
                      <div className={styles["availability-style"]}>
                        {/* <img
                    src={
                      data.availabilityText === 'Unavailable Today'
                        ? '../../static/images/icons/warning.svg'
                        : '../../static/images/icons/check.svg'
                    }
                    className={styles["logo-style"
                  /> */}
                        <div
                          className={styles['title'] + " " + `${
                            doctor.availabilityText === 'Unavailable Today'
                              ? styles['text-warning']
                              : ''
                          }`}
                        >
                          {doctor.availabilityText}
                        </div>
                      </div>

                      <ButtonPrimary
                        title="Consult Now"
                        onClick={() => {
                          goDoctorInfo({ doctor, hospital });
                        }}
                      />
                    </div>
                  </Card>
                )}
              />
              {/* {map(doctors, ({ doctor, hospital }) => (
            <Card
              className={styles["card-style"]}
              onClick={() => {
                goDoctorInfo({ doctor, hospital });
              }}
            >
              <div className={styles["img-card"]}>
                <img src={get(doctor, 'image')} className={styles["sm" />
              </div>

              <div className={styles["text-section"]}>
                <h4 className={styles["title4">{`${get(doctor, 'title')} ${get(
                  doctor,
                  'name'
                )}`}</h4>

                <RatingBox
                  ratingValue={get(doctor, 'doctor_detail.rating')}
                  onChange={props.onChange}
                  ratingText={true}
                />

                <div className={styles["description"]}>
                  {getAddress(get(doctor, 'doctor_detail'))}
                </div>
                <div className={styles["description hospital-name">
                  {get(hospital, 'name')}
                </div>
                <div className={styles["description"]}>
                  {get(doctor, 'doctor_detail.qualifications')}{' '}
                  {get(doctor, 'doctor_detail.experience')}, Years Experience
                </div>
              </div>

              <div className={styles["action-section"]}>
                <div className={styles["availability-style"]}>
                 
                  <div
                    className={`title ${
                      doctor.availabilityText === 'Unavailable Today'
                        ? 'text-warning'
                        : ''
                    }`}
                  >
                    {doctor.availabilityText}
                  </div>
                </div>

                <ButtonPrimary title="Consult Now" />
              </div>
            </Card>
          ))} */}
            </div>
          </>
        ) : (
          <Empty description="No doctors found" />
        )}
      </div>

      {/* <PaginationPrimary pageStyle="mt--60" total={50} defaultCurrent={1} /> */}
    </div>
  );
}
