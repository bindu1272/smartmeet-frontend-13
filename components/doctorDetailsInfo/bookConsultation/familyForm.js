"use client";
import { useState, useEffect } from 'react';
import assign from 'lodash/assign';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import get from 'lodash/get';
import map from 'lodash/map';
import {
  Form,
  Button,
  Radio,
  Input,
  Spin,
  InputNumber,
  Select,
  DatePicker,
} from 'antd';
import ContactCodeSelector from '../../contactCodeSelector';
import { authorizeGetRequest } from '../../../utilities/axiosHelper';
// styles
import { axiosInstance } from '../../../remote/axios';
import styles from './styles.module.scss';
import Image from "next/image";

const Option = Select.Option;

export default function FamilyDetailForm(props) {
  const [form] = Form.useForm();
  const [session, l] = useSession();
  const { hospital, doctor, slot, onAppointmentCreated, inputs } = props;
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState(0);
  const [familymembers, setFamilyMembers] = useState([]);

  const onFinish = async (payload) => {
    let newPayload = { ...inputs };
    assign(payload, { age: 21 });
    setLoading(true);
    assign(newPayload, {
      patient: payload,
    });

    try {
      let res = await axiosInstance.post(`appointments`, newPayload);
      onAppointmentCreated(get(res, 'data.data'), newPayload, 1);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(async () => {
    if (get(session, 'user')) {
      const getFamilyMembers = async () => {
        let result = await authorizeGetRequest(
          axiosInstance,
          get(session, 'user'),
          `/patients/dashboard`
        );
    
        setFamilyMembers([
          {
            name: 'Other',
            id: '0',
          },
          ...get(result, 'data.data.members'),
        ]);
      };    
      getFamilyMembers();
    }
  }, [session]);

  const onFinishFailed = () => {};

  const handleSelectFamilyMember = (index) => {
    setSelectedMember(index);
    if (index === 0) {
      form.resetFields();
    } else {
      form.setFieldsValue({
        name: familymembers[index].name,
        title: familymembers[index].title,
        contact_code: familymembers[index].contact_code,
        contact_number: familymembers[index].contact_number,
        gender: familymembers[index].gender,
        relation: familymembers[index].relation,
        dob: moment(familymembers[index].dob, 'YYYY-MM-DD HH:mm:ss'),
        age: 22,
      });
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="appointment"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className={styles["book-consultation-style"]}>
          <div className={styles["modal-title"]}>Book Consultation</div>

          <div className={styles["select-mode checkbox-inner-style"]}>
            <div className={styles["text-info"]}>
              For whom you wanna book consulation{' '}
              <span className={styles["text-danger"]}>*</span>
            </div>

            <Form.Item>
              <Select
                className={styles["custom-select"]}
                value={get(familymembers[selectedMember], 'name')}
                defaultValue={'Select Family Member'}
                onChange={(value) => handleSelectFamilyMember(value)}
              >
                {map(familymembers, (filter, i) => (
                  <Option key={i} value={i}>
                    {get(filter, 'name')}({' '}
                    {get(filter, 'relation', 'New member')} )
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Relation"
              name="relation"
              rules={[
                {
                  required: true,
                  message: 'Please select Relation',
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter relation"
                // disabled={
                //   get(session, 'user')
                //     ? get(familymembers[selectedMember], 'id') === 0
                //       ? false
                //       : true
                //     : false
                // }
              />
            </Form.Item>
          </div>

          <div className={styles["form-section"]}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please Input Name',
                },
              ]}
            >
              <Input size="large" placeholder="Enter Name" />
            </Form.Item>
            <Form.Item
              label="Date of birth"
              name="dob"
              rules={[
                {
                  required: true,
                  message: 'Please Input date of birth of patient',
                },
              ]}
            >
              <DatePicker
                className={styles["custom-date"]}
                size={'large'}
                format={'DD-MM-YYYY'}
              />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: 'Please select gender',
                },
              ]}
            >
              <Radio.Group>
                <div className={styles["select-area"]}>
                  <Radio value={'M'}>Male</Radio>
                  <Radio value={'F'}>Female</Radio>
                </div>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Contact Number"
              name="contact_number"
              rules={[
                {
                  required: true,
                  message: 'Please Input Contact number',
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter Contact"
                addonBefore={ContactCodeSelector}
              />
            </Form.Item>{' '}
            <div className={styles[`button-primary ${props.theme}`]}>
              <Form.Item>
                <Button type="primary" onClick={() => {}} htmlType="submit">
                  Continue
                  {props.icon === true && (
                    <Image alt="" width={10} height={10}
                      src="../../../static/images/icons/arrow-next.svg"
                      className={styles["icon-style"]}
                    />
                  )}
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </Spin>
  );
}
