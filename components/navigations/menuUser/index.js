"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import ProfileCard from '../../profileCard';
import { useSession } from "next-auth/react";
import Image from "next/image";
// import ButtonPrimary from "../buttons/buttonPrimary";
// import ButtonDefault from "../buttons/buttonDefault";

// Styles
import styles from './styles.module.scss';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = (value) => console.log(value);

export default function MenuUser(props) {
  const [isOpened, setIsOpened] = useState(false);

  function toggle() {
    setIsOpened((isOpened) => !isOpened);
  }
  const router = useRouter();
  const {data:session} = useSession();
  useEffect(()=>{
     if( session?.user?.is_default_login){
        router.push("/profileDetails");
      }
  },[session?.user?.is_default_login])

  const handleLogoClick = () => {
    router.push('/');
  };
  return (
    <div
      className={styles["menu-user-style"] +" "+`${isOpened === true ? styles['menu-active'] : ''}`}
    >
      <div className={styles["logo"]}>
        <Image alt=""
          src="../../../static/images/logo/logo.svg"
          className={styles["logo"]}
          onClick={handleLogoClick}
          width={20}
          height={20}
        />
      </div>

      <button className={"navbar-toggler" +" "+styles["navbar-toggler"]} type="button" onClick={toggle}>
        <div
          className={"hamburguer"+" "+ 
            `${isOpened === true ? 'close-hamburguer' : ''}`
          }
        >
          <div className={"lines"+" "+"line-top"}></div>
          <div className={"lines"+" "+"line-mid"}></div>
          <div className={"lines"+" "+"line-bottom"}></div>
        </div>
      </button>

      <div className={styles["flex-style"]}>
        {props.searchShow && (
          <div className={styles["search-sec"]}>
            <Search
              placeholder="Doctor, specialty, hospital or treatment"
              onSearch={props.onSearch}
            />
          </div>
        )}
        <Menu theme="light" mode="horizontal">
          <Link href="/">Home</Link>
          <Link href="/myAppointments">My Appointments</Link>

          {/* <button className={styles["notify-button"]}>
            {' '}
            <img
              src="../../static/images/icons/notification.svg"
              className={styles["notifyIcon"]}
            />
          </button> */}
        </Menu>
        <ProfileCard user={props?.user} />
      </div>
    </div>
  );
}
