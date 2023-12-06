"use client";
import { useState } from 'react';
import { Row, Col, Modal, notification } from 'antd';
import { useRouter } from 'next/navigation';

// Custom Components
import Login from '@/components/auth/login';
import ForgotPassword from '@/components/auth/forgotPassword';
import Signup from '@/components/auth/signup';
import Otp from '@/components/auth/otp';
import assign from 'lodash/assign';
import get from 'lodash/get';
import ModalPrimary from '@/components/modals/modalPrimary';
import SuccessContent from '@/components/successContent';
import {PATIENT_REGISTRATION_STEPS} from "@/constants/registrationsteps";

// styles
import styles from './styles.module.scss';
import hospitalRegistrationStyles from "../hospital-registration/styles.module.scss"
import { axiosInstance } from '@/remote/axios';
import AboutPatient from '@/components/auth/aboutPatient';
import OtpPatient from '@/components/auth/otpPatient';
import ButtonDefault from '@/components/buttons/buttonDefault';
import ButtonPrimary from '@/components/buttons/buttonPrimary';
import Image from "next/image";

import { signIn } from 'next-auth/react';

export default function PatientRegistration() {
  const [formStep, setFormStep] = useState(PATIENT_REGISTRATION_STEPS?.SIGNUP);
  const [otpId, setOtpId] = useState();
  const [signUpData, setSignUpData] = useState();
  const [successModal, setSuccessModal] = useState(false);

  const completeformStep = () => {
    setFormStep((cur:any) => cur + 1);
  };

  const singupPage = () => {
    setFormStep(PATIENT_REGISTRATION_STEPS?.SIGNUP);
  };

  const forgotPage = () => {
    setFormStep(PATIENT_REGISTRATION_STEPS?.ABOUT_PATIENT);
  };

  const loginPage = () => {
    signIn('Credentials');
  };

  const router = useRouter();

  const renderSection = () => {
    if (formStep > PATIENT_REGISTRATION_STEPS?.HOME) {
      router.push('/home');
    }
  };

  const onClickBack = () => {
    if (formStep === PATIENT_REGISTRATION_STEPS?.ABOUT_PATIENT) {
      setFormStep(1);
    } else {
      setFormStep((cur:any) => cur - 1);
    }
  };

  const resendOtp = async () => {
    return await axiosInstance
      .post('/resend-otp', {uuid: otpId})
      .then((res) => {
        setOtpId(get(res, 'data.data.id'));
        notification.success({message: 'OTP sent successfully'});
      })
      .catch((error) => { });
  }

  const patientSignUp = async (values:any) => {
    return await axiosInstance
      .post('/patients/sign-up', values)
      .then((res) => {
        setOtpId(get(res, 'data.data.id'));
        completeformStep();
      })
      .catch((error) => { });
  };

  const validateSignUp = async (values:any) => {
    assign(values, { otp_uuid: otpId });
    return await axiosInstance
      .post('/patients/validate-sign-up', values)
      .then((res) => {
        // completeformStep();
        setSuccessModal(true);
      });
  };

  const handleHome = () => {
    router.push('/home');
  };

  const addPatientDetails = async (values:any) => { };

  return (
    <section className={hospitalRegistrationStyles["auth-container"]}>
      <Row>
        <Col className={hospitalRegistrationStyles["form-col"]} span={12}>
          {/* <div className={styles["form-container">
            <div className={styles["section-first"> */}
          {formStep === PATIENT_REGISTRATION_STEPS?.LOGIN && (
            <Login
              clickHandler={completeformStep}
              forgotHandler={forgotPage}
              signupHandler={singupPage}
            />
          )}
          {formStep === PATIENT_REGISTRATION_STEPS?.SIGNUP && (
            <Signup
              clickHandler={patientSignUp}
              loginHandler={loginPage}
              handleHome={handleHome}
              setSignUpData={setSignUpData}
              signUpData={signUpData}
            />
          )}

          {formStep === PATIENT_REGISTRATION_STEPS?.OTP_PATIENT && (
            <OtpPatient
              clickHandler={validateSignUp}
              onClickBack={onClickBack}
              onResendOtp={resendOtp}
            />
          )}
          {formStep === PATIENT_REGISTRATION_STEPS?.ABOUT_PATIENT ?
            <AboutPatient
              clickHandler={completeformStep}
              onClickBack={onClickBack}
            /> : null
          }
          {formStep === PATIENT_REGISTRATION_STEPS?.FORGOT_PASSWORD &&
            <ForgotPassword
            clickHandler={completeformStep}
            signupHandler={singupPage}
          />
        }

          {/* {renderSection()} */}
          {/* </div>
          </div> */}
        </Col>

        <Col span={12}>
          <div className={hospitalRegistrationStyles["color-section"]}>
            <div className={hospitalRegistrationStyles["img-box"]}>
              <div className={hospitalRegistrationStyles["img-style"]}>
                <Image src="../../static/images/login/image1.svg" alt="" width={160} height={24.5}/>
              </div>
              <div className={hospitalRegistrationStyles["title2"]}>At Your Quick Service</div>
              <div className={hospitalRegistrationStyles["description"]}>An address for health and care</div>
            </div>

            <div className={hospitalRegistrationStyles["circle1" ]}/>
            <div className={hospitalRegistrationStyles["circle2"]}/>
            <div className={hospitalRegistrationStyles["circle3" ]}/>
          </div>
        </Col>
      </Row>

      <ModalPrimary
        visible={successModal}
        modalStyle={styles["sure-modal-style"]}
        onCancel={() => setSuccessModal(false)}
        closable={false}
      >
        <SuccessContent title="You are signed up!" hideClose />
        <Row align="middle" justify="space-around">
          <ButtonDefault title="Go to Homepage" onClick={handleHome} />
          <ButtonDefault
            title="Go to Login Page"
            onClick={() => signIn('Credentials')}
          />
        </Row>
      </ModalPrimary>
    </section>
  );
}
