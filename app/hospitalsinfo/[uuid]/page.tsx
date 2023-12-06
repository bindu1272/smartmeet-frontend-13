"use client";
import LayoutHospitalContainer from "@/components/layoutHospitalContainer";
import HeroSection from "@/components/hospitalHomepage/heroSection";
import PatientsTrust from "@/components/hospitalHomepage/patientsTrust";
import AboutContent from "@/components/hospitalHomepage/aboutContent";
import OurSpecialities from "@/components/hospitalHomepage/ourSpecialities";
import MeetDoctors from "@/components/hospitalHomepage/meetDoctors";
import LatestNews from "@/components/hospitalHomepage/latestNews";
import ContactDetails from "@/components/hospitalHomepage/contactDetails";
import get from "lodash/get";
import {useEffect} from "react";

// styles
import styles from "./styles.module.scss";
import { axiosInstance } from "@/remote/axios";

export default function HospitalHomepage(props: any) {
  const { uuid } = props?.params
//   context.params;
  let hospital = null; // Coming from the method getServerSideProps declared below
  let doctors = null;
  useEffect(()=>{
    const getHospitalDoctorsData = async() => {
      const resHospital = await axiosInstance.get(`hospitals/${uuid}`);
      const resDoctors = await axiosInstance.get(`hospitals/${uuid}/doctors`);
  
      doctors = get(resDoctors, "data.data", []);
  
      hospital = get(resHospital, "data.data");
    };
    getHospitalDoctorsData();
  },[])

  return (
    // <LayoutHospitalContainer details={hospital}>
      <div className={styles["hospital-homepage-main"]}>
        <HeroSection details={hospital} />

        <PatientsTrust details={hospital} />

        <AboutContent details={hospital} />

        <OurSpecialities details={hospital} />

        <MeetDoctors details={hospital} doctors={doctors} />

        <LatestNews details={hospital} />

        <ContactDetails details={hospital} />
      </div>
    // </LayoutHospitalContainer>
  );
}
// Will be called on Server side data will be hydrated to the component.

