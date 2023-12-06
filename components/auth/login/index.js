"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Checkbox } from 'antd';
import InputCustom from '../../inputCustom';
import ButtonPrimary from '../../buttons/buttonPrimary';
import Image from "next/image";

import styles from './styles.module.scss';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={styles["login-section"]}>
      <div className={styles["form-section"]}>
        <div className={styles["logo"]}>
          <Image src="../../static/images/logo/logo.svg" alt="" width={10}
          height={10}/>
        </div>
        <div className={styles["head-section"]}>
          <h3 className={styles["title3"]}>Login</h3>
          <div className={styles["text-info"]}>
            {' '}
            Welcome Back! Please login to your account
          </div>
        </div>
        <div className={styles["form"]}>
          <InputCustom
            onChange={handleEmailChange}
            value={email}
            placeholder="Enter Email"
            label="Email"
            required
          />

          <InputCustom
            inputPassword
            label="Create Password"
            placeholder="Enter password"
            required
            onChange={handlePasswordChange}
            value={password}
          />

          <div className={styles["forgot-link checkbox-inner-style"]}>
            <Checkbox>Remember me</Checkbox>
            <div className={styles["link"]} onClick={props.forgotHandler}>
              Forgot Password
            </div>
          </div>

          <div className={styles["mt--30"]}>
            <ButtonPrimary
              title="Login"
              onClick={props.clickHandler}
              disabled={!email || !password}
            />
          </div>

          <div className={styles["or-divider"]}>
            <div className={styles["divider-style"]}>Or</div>
          </div>

          <div className={styles["social-lg-buttons"]}>
            <Link href="/">
                <Image src="../../static/images/icons/google-plus.svg" alt="" width={10}
          height={10} />
            </Link>
            <Link href="/">
                <Image src="../../static/images/icons/facebook.svg" alt="" width={10}
          height={10}/>
            </Link>
          </div>

          <div className={styles["link-section"]}>
            Already have an account?{' '}
            <div className={styles["link"]} onClick={props.signupHandler}>
              Sign up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
