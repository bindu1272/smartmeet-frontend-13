"use client";
import { DatePicker, Form, Radio, Row, Col } from 'antd';
import ButtonPrimary from '../../buttons/buttonPrimary';
import PatientRegistrationstyles from '@/app/patientRegistration/styles.module.scss';
import Image from "next/image";

const AboutPatient = (props) => {
  const onFinish = (values) => {
    props.clickHandler(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={PatientRegistrationstyles["singup-section"]}>
      <div className={PatientRegistrationstyles["form-section"]}>
        <Row align="bottom" justify="space-between" className="logo">
          <Col>
            <div>
              <Image src="../../static/images/logo/logo.svg" alt="" width={10}
          height={10}/>
            </div>
          </Col>
          <Col className="back-link" onClick={props.onClickBack}>
            Go back
          </Col>
        </Row>
        <div className="head-section">
          <h3 className="title3">Tell us a bit more about yourself</h3>
        </div>
        <div className="form">
          <Form
            name="control-hooks"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker format={'DD-MM-YYYY'} size="large" />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Radio.Group>
                <Radio value={'m'}>Male</Radio>
                <Radio value={'f'}>Female</Radio>
              </Radio.Group>
            </Form.Item>

            <div className="mt--30">
              <ButtonPrimary
                htmlType="submit"
                title="Next"
                // onClick={props.clickHandler}
              />
            </div>
          </Form>

          <div className="link-section">
            Already have an account?{' '}
            <div className="link" onClick={props.loginHandler}>
              Login
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPatient;
