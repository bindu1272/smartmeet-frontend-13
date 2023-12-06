"use client";
import { DatePicker, Radio } from 'antd';
import { useState } from 'react';
import InputCustom from '../../../components/inputCustom';
import ButtonPrimary from '../../buttons/buttonPrimary';
import Link from 'next/link';
import Image from "next/image";

import styles from './styles.module.scss';

export default function Signup2(props) {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles["signup2-section"]}>
      <div className={styles["form-section"]}>
        <div className={styles["logo"]}>
          <Image src="../../static/images/logo/logo.svg" alt=""  width={10}
          height={10}/>

          <Link className={styles["skip-text"]} href="/">
            Skip
          </Link>
        </div>
        <h3 className={styles["title3"]}>Tell us a bit more about yourself</h3>
        <div className={styles["form"]}>
          <InputCustom
            selectbox
            defaultValue="Mr"
            options={['Ms', 'Mr', 'Mrs']}
            placeholder="Full Name"
            label="Full Name"
            required
          />

          <div className={styles["date-picker"]}>
            <div className={styles["label"]}>
              DOB <span className={styles["text-error"]}>*</span>
            </div>
            <DatePicker />
          </div>

          <div className={styles["date-picker mb--40"]}>
            <div className={styles["label"]}>Gender </div>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Male</Radio>
              <Radio value={2}>Female</Radio>
            </Radio.Group>
          </div>

          <ButtonPrimary title="Next" onClick={props.clickHandler} />

          <div className={styles["link-section"]}>
            Already have an account? <Link href="/">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
