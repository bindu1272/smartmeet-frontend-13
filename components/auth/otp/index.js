"use client";
import { notification,message } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import OtpInput from 'otp-input-react'
import Image from "next/image";
// 'react-otp-input';

import { REGISTRATION_STEPS } from "../../../app/hospital-registration/page"
// '@/app/hospital-registration/page';
import { axiosInstance } from '../../../remote/axios';
import ButtonPrimary from '../../buttons/buttonPrimary';

// Styles
import styles from './styles.module.scss';
import hospitalStyles from './hospitalstyles.module.scss';


Otp.propTypes = {
  active: PropTypes.bool,
  clickHandler: PropTypes.func,
  otp : PropTypes.any,
  data : PropTypes.any,
  errors: PropTypes.any,
  onChange : PropTypes.any,
  onClickBack : PropTypes.any,
  completeData : PropTypes.any,
};

export default function Otp(props) {
  const { active, data, onChange, completeData, onClickBack } = props;

  const onChangeOtp = (key, value) => {
    onChange({ ...data, [key]: value });
  };

  const handleResendCode = async () => {
    return await axiosInstance
      .post('/resend-otp', { uuid: data.otp_uuid })
      .then((res) => {
        onChangeOtp('otp_uuid', res.data.data.uuid);
        console.log('The resent OTP >>>>> ', res.data.data.otp);
        message.success('Otp send Successfully');
      })
      .catch((error) => {
        console.log('ERROR >> ', error);
      });
  };

  return (
    <div className={`${active ? styles["otp-section"] : styles["otp-section"] + " " + 'd-none'}`}>
      <div className={hospitalStyles["form-section"]}>
        <div>
          <div className={hospitalStyles["logo"]}>
            <Image src="../../static/images/logo/logo.svg" alt="" width={10}
          height={10}/>
          </div>
          <h3 className={hospitalStyles["title3"]}>Please verify your email</h3>
          <div className={hospitalStyles["info"]}>
            We have sent a 4-digit verification code to your email address{' '}
            {completeData[REGISTRATION_STEPS.PERSONAL_DETAILS].email}
          </div>
          <div className={styles["otp-box"]}>
            {/* <Form.Item validateStatus={!props.errors.otp ? "validating" : "error"} help={props.errors.otp}> */}
            <OtpInput
              value={data?.otp}
              onChange={(value) => onChangeOtp('otp', value)}
              // numInputs={4}
              inputCount={6}
              // separator={<span>-</span>}
            />
            {/* </Form.Item> */}
          </div>

          <div className={styles["other-link-section"]}>
            <div className={styles["description sm"]}>
              Didn’t recieve it?{' '}
              <a onClick={handleResendCode}>Resend code</a>
            </div>
            <div className={styles["description sm"]}>
              Change email address? <a onClick={onClickBack}>Go back</a>
            </div>
          </div>
        </div>

        <div className={styles["form"]}>
          <ButtonPrimary
            icon={true}
            title="Continue"
            onClick={props.clickHandler}
          />
        </div>
      </div>
    </div>
  );
}
