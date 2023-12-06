"use client";
import InputCustom from '../../../components/inputCustom';

import ButtonPrimary from '../../buttons/buttonPrimary';
import { Select, Input, Checkbox } from 'antd';
import { InputNumber } from 'antd';
import { Radio } from 'antd';
import { Row, Col } from 'antd';
import Image from "next/image";

import styles from './styles.module.scss';
import SelectTime from '../../selectTime';
const { Option } = Select;
const { TextArea } = Input;

export default function ContactYou(props) {
  const specialisation = ['Dental', 'Cancer', 'Cardiology', 'Neurology'];
  const children = [];
  for (let i = 0; i < specialisation.length; i++) {
    children.push(
      <Option key={i} value={specialisation[i]}>
        {specialisation[i]}
      </Option>
    );
  }

  const openHours = [
    { day: 'Tuesday', startTime: '5', endTime: '17' },
    { day: 'Monday', startTime: '2', endTime: '18' },
  ];

  return (
    <div className={styles["contact-you-section"]}>
      <div className={styles["form-section"]}>
        <Row align="bottom" justify="space-between" className={styles["logo"]}>
          <Col>
            <div>
              <Image src="../../static/images/logo/logo.svg" alt="" width={10}
          height={10}/>
            </div>
          </Col>
          <Col className={styles["back-link"]} onClick={props.onPressBack}>
            Go back
          </Col>
        </Row>
        <h3 className={styles["title3"]}>Tell us when we can contact you</h3>
        <div className={styles["subtext-style"]}>
          We will reach out to you soon on your registered email address with a
          link to your personalised hospital page after verifying your sumbitted
          details.
        </div>

        <div className={styles["open-hours"]}>
          <div className={styles["label"]}>
            Please enter your work hours<span className={styles["text-error"]}>*</span>
          </div>

          <SelectTime />
        </div>

        {/* <ButtonPrimary
            icon={true}
            title="Continue"
            onClick={props.clickHandler}
          /> */}
      </div>
    </div>
  );
}
