"use client";
import { useState } from 'react';
import InputCustom from '@/components/inputCustom';
import ButtonPrimary from '../../buttons/buttonPrimary';
import Link from 'next/link';
import { Form, DatePicker, Input, Button, Row, Col } from 'antd';
import Image from "next/image";

import styles from './styles.module.scss';
import HospitalRegistrationStyles from '@/app/hospital-registration/styles.module.scss';
import { TitleSelector } from '../../titleSelector/TitleSelector';
import ContactCodeSelector from '../../contactCodeSelector';

export default function Signup(props) {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onFinish = (values) => {
    props.setSignUpData(values);
    props.clickHandler(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles["singup-section"]}>
      <div className={HospitalRegistrationStyles["form-section"]}>
        <Row align="bottom" justify="space-between" className={HospitalRegistrationStyles["logo"]}>
          <Col>
            <div>
              <Image src="../../static/images/logo/logo.svg" alt="" width={160} height={24.5}/>
            </div>
          </Col>
          <Col className={HospitalRegistrationStyles["back-link"]} onClick={props.handleHome}>
           <Link href="/"> Back to Homepage</Link>
          </Col>
        </Row>
        <div className={HospitalRegistrationStyles["head-section"]}>
          <h3 className={"title3"}>Signup</h3>
          <div className={styles["text-info"]}> Don’t have an account? Signup here</div>
        </div>
        <div className={styles["form"]}>
          <Form
            name="control-hooks"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={props.signUpData}
          >
            <Form.Item
              label=" Full Name"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                size="large"
                className={styles["custom-input"]}
                addonBefore={TitleSelector}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                },
              ]}
            >
              <Input size="large" className={styles["custom-input"]} />
            </Form.Item>
            <Form.Item
              label="Create Password"
              name="password"
              rules={[
                {
                  required: true,
                },
                {
                  min: 6,
                  message: 'Password must be atleast 6 characters',
                },
              ]}
            >
              <Input.Password size="large" className={styles["custom-input"]} />
            </Form.Item>
            <Form.Item
              label=" Confirm Password"
              name="confirm_password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password size="large" className={styles["custom-input"]} />
            </Form.Item>

            <div className={"mt--30"}>
              <ButtonPrimary htmlType="submit" title="Sign Up" />
            </div>
          </Form>
          {/* <div className={styles["or-divider"]}>
            <div className={styles["divider-style"]}>Or</div>
          </div> */}

          {/* <div className={styles["social-lg-buttons"]}>
            <Link href="/">
              <a>
                <Image src="../../static/images/icons/google-plus.svg" />
              </a>
            </Link>
            <Link href="/">
              <a>
                <Image src="../../static/images/icons/facebook.svg" />
              </a>
            </Link>
          </div> */}

          <div className={styles["link-section"]}>
            Already have an account?{' '}
            <div className={styles["link"]} onClick={props.loginHandler}>
              Login
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
