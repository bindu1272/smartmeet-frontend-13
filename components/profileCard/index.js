"use client";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { signOut } from 'next-auth/react';

// Styles
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/remote/axios';
import Image from "next/image";

const menu = (
  <Menu>
    <Menu.Item>
      <a href="/profileDetails">My Details</a>
    </Menu.Item>
    <Menu.Item>
      <div onClick={() => signOut()}>Logout</div>
    </Menu.Item>
  </Menu>
);

export default function ProfileCard(props) {
  console.log("props",props?.user);
  const [userDetails,setUserDetails] = useState();

  useEffect(()=>{
    if(props?.user?.id){
      const fetchDetails=async()=>{
        await axiosInstance.get(`user/${props?.user?.id}`).then((result)=>{
          setUserDetails(result?.data?.data)
        })
      }
      fetchDetails();
  }
  },[props?.user?.id])
  console.log("props",userDetails);

  return (
    <div className={styles["profile-card"]+" "+ props.className}>
      <div className={styles["user-photo-circle"]}>
        {/* <img src={props?.user?.thumbnail?.thumbnail_url} className={styles["logo"]} /> */}
        {/* <img src={props?.user?.image?.url} className={styles["logo"]} /> */}
        <Image src={userDetails?.image?.url} className={styles["logo"]} alt="" layout='fill'/>

      
      </div>
      <Dropdown overlay={menu}>
        <div className={styles["dropdown"]}>
          <div className={styles["user-title"]}>
            <a
              className={styles["ant-dropdown-link"]}
              onClick={(e) => e.preventDefault()}
            >
              {props?.user?.name} <DownOutlined />
            </a>
          </div>
          Signed in as
        </div>
      </Dropdown>
    </div>
  );
}
