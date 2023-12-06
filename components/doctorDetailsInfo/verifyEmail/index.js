"use client";
import { useState } from 'react';
import get from 'lodash/get';
import { Button, Spin, message } from 'antd';
import OtpInput from 'react-otp-input';
import ButtonPrimary from '../../buttons/buttonPrimary';
import { axiosInstance } from '../../../remote/axios';

// Styles
import styles from './styles.module.scss';

export default function VerifyEmail(props) {
  const {
    otp_uuid,
    goBack,
    onConfirmAppointment,
    email,
    inputs,
    onAppointmentCreated,
  } = props;

  const [otp, setOtp] = useState(null);
  const [newOtpUuid, setNewOtpUuid] = useState(otp_uuid);
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    setLoading(true);
    let payload = {
      otp: otp,
      otp_uuid: newOtpUuid,
    };
    try {
      let res = await axiosInstance.post(`appointments/validate`, payload);
      onConfirmAppointment();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    return await axiosInstance
      .post('/resend-otp', { uuid: newOtpUuid })
      .then((res) => {
        setNewOtpUuid(res.data.data.uuid);
        message.success('Otp send Successfully');
        console.log('The resent OTP >>>>> ', res.data.data.otp);
      })
      .catch((error) => {
        console.log('ERROR >> ', error);
      });
  };

  const onClickGoBack = () => {
    goBack();
  };

  return (
    <Spin spinning={loading}>
      <div className={styles["verify-email-section"]}>
        <div className={styles["form-section"]}>
          <div className={styles["inner-sectinon"]}>
            <h3 className={styles["modal-title"]}>Please verify your email</h3>
            <div className={styles["info"]}>
              We have sent a 4-digit verification code to your email address
              <span> {email}</span>
            </div>

            <div className={styles["otp-box"]}>
              <OtpInput
                value={otp}
                onChange={(value) => setOtp(value)}
                numInputs={4}
                // separator={<span>-</span>}
              />
            </div>

            <div className={styles["link-section"]}>
              <div className={styles["description sm"]}>
                Didn’t recieve it?{' '}
                <Button
                  type="link"
                  onClick={() => {
                    resendOtp();
                  }}
                >
                  Resend code
                </Button>
              </div>
              <div className={styles["description sm"]}>
                Change email address?{' '}
                <Button
                  type="link"
                  onClick={() => {
                    onClickGoBack();
                  }}
                >
                  {' '}
                  Go back
                </Button>
              </div>
            </div>
          </div>

          <div className={styles["form mt--80"]}>
            <ButtonPrimary title="Verify & Book" onClick={onSubmit} />
          </div>
        </div>
      </div>
    </Spin>
  );
}
