"use client";
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import OtpInput from 'otp-input-react'

import ButtonPrimary from '../../buttons/buttonPrimary';
import { Form } from 'antd';
import Image from "next/image";
// import { setOptions } from 'next-auth/client';
import otpStyles from "../otp/styles.module.scss";
import HospitalRegistrationStyles from '@/app/hospital-registration/styles.module.scss';

export default function OtpPatient(props) {
  const onFinish = () => {
    props.clickHandler({ otp: otp });
  };

  const [otp, setOtp] = useState();

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={true ? otpStyles["otp-section"]: otpStyles["otp-section"] + " " + otpStyles['d-none']}>
      <div className={HospitalRegistrationStyles["form-section"]}>
        <Form
          name="control-hooks"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div>
            <div className={HospitalRegistrationStyles["logo"]}>
              <Image src="../../static/images/logo/logo.svg" alt="" width={10}
          height={10}/>
            </div>
            <h3 className="title3">Please verify your email</h3>
            <div className={HospitalRegistrationStyles["info"]}>
              We have sent a 4-digit verification code to your email address{' '}
            </div>

            <Form.Item
              name="otp"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <div className={otpStyles["otp-box"]}>
                {/* <OtpInput
                  numInputs={4}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                /> */}
                <OtpInput
              value={otp}
              onChange={(value) => setOtp(value)}
              // numInputs={4}
              inputCount={4}
              // separator={<span>-</span>}
            />
              </div>
            </Form.Item>

            <div className={otpStyles["other-link-section"]}>
              <div className={HospitalRegistrationStyles["description"]+" "+HospitalRegistrationStyles["sm"]}>
                Didn’t recieve it? <a onClick={props.onResendOtp}>Resend code</a>
              </div>
              <div className={HospitalRegistrationStyles["description"]+" "+HospitalRegistrationStyles["sm"]}>
                Change email address? <a onClick={props.onClickBack}>Go back</a>
              </div>
            </div>
          </div>

          <div className="form">
            <ButtonPrimary icon={true} title="Next" htmlType="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
}
