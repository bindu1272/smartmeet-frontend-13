"use client";
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ButtonPrimary from '../../buttons/buttonPrimary';
import SelectTime from '../../selectTime';
import styles from './style.module.scss';
import hospitalStyles from './hospitalstyles.module.scss';
import Image from "next/image";

ContactHours.propTypes = {
  active: PropTypes.bool,
  clickHandler: PropTypes.func,
  errors: PropTypes.any,
  data: PropTypes.any,
  onChange : PropTypes.any,
  onClickBack : PropTypes.any,
};

export default function ContactHours(props) {
  const onChangeFormData = (value, key) => {
    props.onChange({ ...props.data, [key]: value });
  };

  return (
    <div className={props.active ? styles["register-section"] : styles["register-section"] + " " + 'd-none'}>
      <div className={hospitalStyles["form-section"]}>
        <Row align="bottom" justify="space-between" className={hospitalStyles["logo"]}>
          <Col>
            <div>
              <Image src="../../static/images/logo/logo.svg" alt="" width={10}
          height={10}/>
            </div>
          </Col>
          <Col className={hospitalStyles["back-link"]} onClick={props.onClickBack}>
            Go back
          </Col>
        </Row>
        <h3 className={"title3"}>Tell us when can we contact you</h3>
        <div className={hospitalStyles["info"]}>
          We will reach out to you soon on your registered email address with a
          link to your personalised hospital page after verifiying your
          submitted details
        </div>
        <div className={"form"}>
          <div className={styles["contact-hours"]}>
            <div className={styles["label"]}>Please enter best time to contact</div>
            <div className={styles["small-label"]}>
              <Row>
                <Col span={12} push={12}>
                  Work Hours
                </Col>
                <Col span={12} pull={12}>
                  Work days
                </Col>
              </Row>
            </div>

            <SelectTime
              openHours={props?.data?.contact_hours}
              setOpenHours={(value) => onChangeFormData(value, 'contact_hours')}
            />
          </div>

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
