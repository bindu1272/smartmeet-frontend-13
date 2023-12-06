import { Tabs, Modal } from "antd";
import React, { useEffect } from "react";
import get from "lodash/get";
import { axiosInstance } from "@/remote/axios";

const { TabPane } = Tabs;

// styles
import styles from "./styles.module.scss";
import HospitalPage from "@/components/hospitalDetailBanner/hospitalpage";



export default async function Hospital(props: any) {
  // const { hospital, doctors } = props;
  let hospital: any = null;
  let doctors = null;
  let slug = props?.params?.uuid;

  const res = slug && (await axiosInstance.get(`hospitals/${slug}`));
  const uuid = slug;
  const resDoctors =
    slug && (await axiosInstance.get(`hospitals/${uuid}/doctors`));

  hospital = get(res, "data.data");
  doctors = get(resDoctors, "data.data", []);

  return <HospitalPage hospital={hospital} doctors={doctors} />;
}
