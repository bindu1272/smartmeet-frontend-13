"use client";
import { Col, Row, Form, Radio, Input, Space, DatePicker } from 'antd';
import { assign, get } from 'lodash';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { axiosInstance } from '../../remote/axios';
import {
  authorizePostRequest,
  authorizePutRequest,
} from '../../utilities/axiosHelper';
import ButtonOutline from '../buttons/buttonOutline';
import ButtonPrimary from '../buttons/buttonPrimary';
import InputCustom from '../inputCustom';
import { TitleSelector } from '../titleSelector/TitleSelector';
import moment from 'moment';
import styles from './style.module.scss';
import _ from 'lodash';

function MemberDetails({
  data,
  index,
  getProfileDetails,
  add,
  setAddMemberForm,
}:any) {
  const [edit, setEdit] = useState(add);
  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div>
      {edit ? (
        <EditManagerDetails
          data={data}
          index={index}
          toggleEdit={toggleEdit}
          getProfileDetails={getProfileDetails}
          setAddMemberForm={setAddMemberForm}
          add={add}
        />
      ) : (
        <ViewManagerDetails data={data} index={index} toggleEdit={toggleEdit} />
      )}
    </div>
  );
}

export default MemberDetails;

const ViewManagerDetails = ({ data, toggleEdit, index }:any) => {
  return (
    <div className={styles["sec"]}>
      <Row justify="space-between" align="middle">
        <Col>
          <h4 className={styles["title"]}>MEMBER-{index} INFORMATION</h4>
        </Col>
        <Col>
          <ButtonPrimary title="Edit" theme="green" onClick={toggleEdit} />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12} className={styles["item-col"]}>
          <div className={styles["heading"]}>Relation</div>
          <div className={styles["info-text"]}>{get(data, 'relation')}</div>
        </Col>
        <Col span={12} className={styles["item-col"]}>
          <div className={styles["heading"]}>Name</div>
          <div className={styles["info-text"]}>
            {get(data, 'title')} {get(data, 'name')}
          </div>
        </Col>

        <Col span={12} className={styles["item-col"]}>
          <div className={styles["heading"]}>Gender</div>
          <div className={styles["info-text"]}>
            {get(data, 'gender') === 'M' ? 'Male' : 'Female'}
          </div>
        </Col>
        <Col span={12} className={styles["item-col"]}>
          <div className={styles["heading"]}>Age</div>
          <div className={styles["info-text"]}>{get(data, 'age')}</div>
        </Col>

        <Col span={12} className={styles["item-col"]}>
          <div className={styles["heading"]}>Insurance Details</div>
          <div className={styles["info-text"]}>
            {get(data, 'insurance_details.number')}
          </div>
        </Col>
        <Col span={12} className={styles["item-col"]}>
          <div className={styles["heading"]}>Blood group</div>
          <div className={styles["info-text"]}>{get(data, 'blood_group')}</div>
        </Col>
        <Col span={12} className={styles["item-col"]}>
          <div className={styles["heading"]}>Height(m)</div>
          <div className={styles["info-text"]}>{get(data, 'height')}</div>
        </Col>
        <Col span={12} className={styles["item-col"]}>
          <div className={styles["heading"]}>Weight(Kg)</div>
          <div className={styles["info-text"]}>{get(data, 'weight')}</div>
        </Col>
      </Row>
    </div>
  );
};

const EditManagerDetails = ({
  data,
  toggleEdit,
  index,
  getProfileDetails,
  setAddMemberForm,
  add,
}:any) => {
  const {data : session} = useSession();
  const onFinish = async (values:any) => {
    const insurance_details = { number: get(values, 'insurance_number') };

    var payload = _.omit(values, ['insurance_number']);

    assign(payload, {
      insurance_details: insurance_details,
    });

    const finalPayload = {
      ...payload,
      dob: moment(get(payload, 'dob')).format('YYYY-MM-DD'),
    };

    if (add) {
      let result = await authorizePostRequest(
        axiosInstance,
        get(session, 'user'),
        `/patients/members/`,
        finalPayload
      );
      setAddMemberForm(false);
      getProfileDetails();
      toggleEdit();
    } else {
      let result = await authorizePutRequest(
        axiosInstance,
        get(session, 'user'),
        `/patients/members/${get(data, 'id')}`,
        finalPayload
      );

      getProfileDetails();
      toggleEdit();
    }
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles["sec"]}>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          name: get(data, 'name'),
          gender: get(data, 'gender'),
          relation: get(data, 'relation'),
          insurance_number: get(data, 'insurance_details.number'),
          email: get(data, 'email'),
          title: get(data, 'title', 'Mr'),
          blood_group: get(data, 'blood_group'),
          height: get(data, 'height'),
          weight: get(data, 'weight'),
          dob: moment(get(data, 'dob', moment()), 'YYYY-MM-DD HH:mm:ss'),
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <h4 className={styles["title"]}>MEMBER-{index} INFORMATION</h4>
          </Col>
          <Col>
            <Row>
              <Space>
                {add ? (
                  <ButtonOutline
                    title="Cancel"
                    theme="red"
                    onClick={() => setAddMemberForm(false)}
                  />
                ) : null}

                <ButtonPrimary title="Save" theme="green" htmlType="submit" />
              </Space>
            </Row>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12} className={styles["item-col"]}>
            <div className={styles["heading"]}>Relation</div>
            <Form.Item
              name="relation"
              rules={[
                {
                  required: true,
                  message: 'Please enter relation',
                },
              ]}
            >
              <InputCustom placeholder="Enter relation" />
            </Form.Item>
          </Col>
          <Col span={12} className={styles["item-col"]}>
            <div className={styles["heading"]}>Name</div>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please enter name',
                },
              ]}
            >
              <Input
                placeholder="Enter name"
                className={styles["custom-input"]}
                required
                addonBefore={TitleSelector}
                size="large"
              />
            </Form.Item>
          </Col>

          <Col span={12} className={styles["item-col"]}>
            <div className={styles["heading"]}>Gender</div>
            <Form.Item
              name="gender"
              rules={[
                {
                  required: true,
                  message: 'Please select gender',
                },
              ]}
            >
              <Radio.Group>
                <Radio value={'M'}>Male</Radio>
                <Radio value={'F'}>Female</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12} className={styles["item-col"]}>
            <div className={styles["heading"]}>DOB</div>
            <Form.Item
              name="dob"
              rules={[
                {
                  required: true,
                  message: 'Please enter date of birth',
                },
              ]}
            >
              <DatePicker className={styles["custom-date"]} size={'large'} />
            </Form.Item>
          </Col>

          <Col span={12} className={styles["item-col"]}>
            <div className={styles["heading"]}>Insurance Details</div>
            <Form.Item name="insurance_number">
              <InputCustom placeholder="Enter details" />
            </Form.Item>
          </Col>
          <Col span={12} className={styles["item-col"]}>
            <div className={styles["heading"]}>Blood group</div>
            <Form.Item
              name="blood_group"
              rules={[
                {
                  required: true,
                  message: 'Please enter blood group',
                },
              ]}
            >
              <InputCustom placeholder="Enter blood group" />
            </Form.Item>
          </Col>
          <Col span={12} className={styles["item-col"]}>
            <div className={styles["heading"]}>Height(m)</div>
            <Form.Item
              name="height"
              rules={[
                {
                  required: true,
                  message: 'Please enter height',
                },
              ]}
            >
              <InputCustom placeholder="Enter height" />
            </Form.Item>
          </Col>
          <Col span={12} className={styles["item-col"]}>
            <div className={styles["heading"]}>Weight(Kg)</div>
            <Form.Item
              name="weight"
              rules={[
                {
                  required: true,
                  message: 'Please enter weight',
                },
              ]}
            >
              <InputCustom placeholder="Enter weight" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
