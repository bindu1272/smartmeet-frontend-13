"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, Input, Button } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import ButtonPrimary from '../../buttons/buttonPrimary';
import ButtonDefault from '../../buttons/buttonDefault';
// import { signInWithGoogle } from '../../../pages/api/auth/firebase';
// import { signIn, signOut, useSession } from 'next-auth/react';

// Styles
import styles from './styles.module.scss';
import { get } from 'lodash';
import { useGlobalContext } from '@/context/store';
import Image from "next/image";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

export default function MenuPrimary(props) {
  const [isOpened, setIsOpened] = useState(false);
  const { queryObject,
    setQueryObject,
    selectedCity,
    setSelectedCity,
    selectedLocation,
    setSelectedLocation, } = useGlobalContext();

    console.log("selectedCity",selectedCity,"ppp",selectedLocation);
  function toggle() {
    setIsOpened((isOpened) => !isOpened);
  }

  const router = useRouter();

  const registerHospital = () => {
    // e.preventDefault();
    router.push(`/hospital-registration`);
  };

  const bookAppointment = (e) => {
    e.preventDefault();
    if(selectedCity !== undefined && selectedLocation !== undefined){
    router.push(`bookAppointment?city_uuid=${get(selectedCity, 'id')}&place_id=${get(selectedLocation, 'value.place_id')}`
      // {
      // pathname: '/bookAppointment',
      // query: {
      //   ...props.queryObject,
      //   city_uuid: get(props.selectedCity, 'id'),
      //   place_id: get(props.selectedLocation, 'value.place_id'),
      // },
    // }
    );
    }
  };

  const onClickLogin = (e) => {
    // e.preventDefault();
    // props.onLogin();
    router.push('/login?callbackUrl='+ process.env.NEXT_PUBLIC_API_URL)
  };

  const onClickSignUp = () => {
    router.push('/patientRegistration');
  };

  return (
    <div
      className={styles["menu-primary-style"] + " " + `${isOpened === true ? styles['menu-active'] : ''}`}
    >
      <div className={styles["logo"]} onClick={() => router.push('/')}>
        <Image src="/static/images/logo/logo.svg" className={styles["logo"]} alt=""   width={20}
          height={20}/>
      </div>

      <button className={"navbar-toggler"+" "+styles["navbar-toggler"]} type="button" onClick={toggle}>
        <div
          className={'hamburguer' + " " + `${
            isOpened === true ? 'close-hamburguer' : ''
          }`}
        >
          <div className={"lines" + " " + "line-top"}></div>
          <div className={"lines " + " " + "line-mid"}></div>
          <div className={"lines" + " " + "line-bottom"}></div>
        </div>
      </button>

      <div className={styles["flex-style"]}>
        {props?.searchShow && (
          <div className={styles["search-sec"]}>
            <Search
              placeholder="Doctor, specialty, hospital or treatment"
              onSearch={props?.onSearch}
            />
          </div>
        )}
        <Menu theme="light" mode="horizontal">
          <div onClick={onClickLogin} className={styles["color-text"]}>
            Login
          </div>
          {/* <Button onClick={signInWithGoogle}>Sign In with google</Button> */}
          <div onClick={onClickSignUp} className={styles["color-text"]}>
            Sign Up
          </div>

          {!props?.hideBookAppointment && (
            <ButtonPrimary title="Book appointment" onClick={bookAppointment} className={styles["button-primary"]}/>
          )}
          <ButtonDefault title="Register hospital" onClick={registerHospital} />
        </Menu>
      </div>
    </div>
  );
}
