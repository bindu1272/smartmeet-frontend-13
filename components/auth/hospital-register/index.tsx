"use client";
import { useRouter } from "next/navigation";
import { Row, Col, notification, message } from "antd";
import Register from "@/components/auth/register";
import Otp from "@/components/auth/otp";
import AboutHospital from "@/components/auth/abouthospital";
import Personalisation from "@/components/auth/personalisation";
import ModalPrimary from "@/components/modals/modalPrimary";
import SuccessContent from "@/components/successContent";
import Image from "next/image";

// styles
import styles from "./styles.module.scss";
import ContactHours from "@/components/auth/contactHours";
import React, { useState } from "react";
import Validator from "validatorjs";
import { get } from "lodash";
import { axiosInstance } from "@/remote/axios";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { putTimeHelper } from "@/utilities/putTimeHelper";
import { isValidPhoneNumber } from "react-phone-number-input";

export default function HospitalRegistrationPage({
  currentStep,
  formData,
  onPressBack,
  handleClick,
  onChangeFormData,
  errors,
  setSuccessModal,
  successModal,
  handleHome,
  handleDashboard,
  REGISTRATION_STEPS,
}: any) {
  return (
    <section className={styles["auth-container"]}>
      <Row>
        <Col className={styles["form-col"]} span={12}>
          <Register
            active={currentStep === REGISTRATION_STEPS.PERSONAL_DETAILS}
            data={formData[REGISTRATION_STEPS.PERSONAL_DETAILS]}
            errors={errors[REGISTRATION_STEPS.PERSONAL_DETAILS]}
            onChange={(data: any) =>
              onChangeFormData(data, REGISTRATION_STEPS.PERSONAL_DETAILS)
            }
            onClickBack={onPressBack}
            clickHandler={handleClick}
          />

          <Otp
            active={currentStep == REGISTRATION_STEPS.OTP}
            data={formData[REGISTRATION_STEPS.OTP]}
            errors={errors[REGISTRATION_STEPS.OTP]}
            completeData={formData}
            onClickBack={onPressBack}
            onChange={(data:any) => onChangeFormData(data, REGISTRATION_STEPS.OTP)}
            clickHandler={handleClick}
          /> 

          <AboutHospital
            active={currentStep === REGISTRATION_STEPS.ABOUT_HOSPITAL}
            data={formData[REGISTRATION_STEPS.ABOUT_HOSPITAL]}
            errors={errors[REGISTRATION_STEPS.ABOUT_HOSPITAL]}
            onChange={(data:any) =>
              onChangeFormData(data, REGISTRATION_STEPS.ABOUT_HOSPITAL)
            }
            onClickBack={onPressBack}
            clickHandler={handleClick}
          />

          <Personalisation
            active={currentStep === REGISTRATION_STEPS.PERSONALISATION}
            data={formData[REGISTRATION_STEPS.PERSONALISATION]}
            errors={errors[REGISTRATION_STEPS.PERSONALISATION]}
            onChange={(data: any) =>
              onChangeFormData(data, REGISTRATION_STEPS.PERSONALISATION)
            }
            onClickBack={onPressBack}
            clickHandler={handleClick}
          />

          <ContactHours
            active={currentStep === REGISTRATION_STEPS.CONTACT_HOURS}
            data={formData[REGISTRATION_STEPS.CONTACT_HOURS]}
            onChange={(data: any) =>
              onChangeFormData(data, REGISTRATION_STEPS.CONTACT_HOURS)
            }
            onClickBack={onPressBack}
            clickHandler={handleClick}
          />
        </Col>
        <Col span={12}>
          <div className={"color-section" + " " + styles["color-section"]}>
            <div className={styles["img-box"]}>
              <div className={styles["img-style"]}>
                <Image src="../../static/images/login/image1.svg" alt="" width={160}
          height={24.55}/>
              </div>
              <div className={styles["title2"]}>At Your Quick Service</div>
              <div className={styles["description"]}>
                An address for health and care
              </div>
            </div>

            <div className={"circle1" + " " + styles["circle1"]} />
            <div className={"circle2" + " " + styles["circle2"]} />
            <div className={"circle3" + " " + styles["circle3"]} />
          </div>
        </Col>
      </Row>
      <ModalPrimary
        visible={successModal}
        modalStyle={styles["sure-modal-style"]}
        onCancel={() => setSuccessModal(false)}
        closable={false}
      >
        <SuccessContent title="Thanks for registration!" hideClose />
        <Row align="middle" justify="space-around">
          <ButtonDefault title="Go to Homepage" onClick={handleHome} />
          <ButtonDefault title="Go to Dashboard" onClick={handleDashboard} />
        </Row>
      </ModalPrimary>
    </section>
  );
}
