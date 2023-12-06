"use client";
import { Tabs, Modal } from "antd";
import React, { useEffect, useState } from "react";
import get from "lodash/get";
import LayoutContainer from "@/components/layoutContainer";
import HospitalDetailBanner from "@/components/hospitalDetailBanner";
import DoctorsList from "@/components/doctorsList";
import ReviewBox from "@/components/reviewBox";
import FaqBlock from "@/components/faqBlock";
import { axiosInstance } from "@/remote/axios";
import { getDoctorAddress } from "@/utilities/helpers";
// import { Media, Player, controls } from "react-media-player";
import Image from "next/image";
import openVideo from "./openVideo";
// const { PlayPause, MuteUnmute } = controls;

const { TabPane } = Tabs;

// styles
import styles from "./styles.module.scss";

function callback(key: any) {
  console.log(key);
}

export default  function HospitalPage({
  hospital,
  doctors,
}: any) {
  const [ads, setAds] = useState<any>([]);
  const [notifications, setNotifications] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [adModal, setAdModal] = useState<any>(null);
  
  useEffect(() => {
    
    const fetchData = async () => {
      setLoading(true);
      const hospitalId = get(hospital, "id");
      var result;
      result = hospitalId && await axiosInstance.get(`hospitals/${hospitalId}/ads`);
      setLoading(false);
      setAds(get(result, "data.data"));
  
      var notifications =  hospitalId && await axiosInstance.get(
        `hospitals/${hospitalId}/notifications`
      );
      setNotifications(get(notifications, "data.data"));
    };

    fetchData();
  }, [hospital]);
  const clickAd = (ad: any) => {
    setAdModal(ad?.uuid);
  };
  const closeAdModal = () => {
    setAdModal(null);
  };


// console.log("hospital",hospital,doctors,ads);
console.log("admoda",adModal);
  return (
    <div className={styles["doctor-ads"]}>
      <div className={styles["doctors-appointment"]}>
        <HospitalDetailBanner
          title={get(hospital, "name")}
          ratingValue={get(hospital, "rating")}
          address={getDoctorAddress(hospital)}
          timing="9 am to 5 pm"
          phone={`+${get(hospital, "contact_code")}${get(
            hospital,
            "contact_number"
          )}`}
          mobile={`+${get(hospital, "admin.contact_code")}${get(
            hospital,
            "admin.contact_number"
          )}`}
          email={get(hospital, "admin.email")}
          treatment="Specialisations"
          specialisations={get(hospital, "specialisations", [])}
          availableResourceslist={[
            "132 Beds",
            "Pediatric Cardiology",
            "Cardiac Anthythmia",
            "Stem Cell Therapy",
          ]}
          sliderOpations={[get(hospital?.banner_url, "url")]}
        />

        <div className={styles["tab-section"]}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Doctors" key="1">
              <DoctorsList
                doctors={doctors?.map((doctor: any,index:any) => {
                  return { doctor, hospital };
                })}
              />
            </TabPane>
            <TabPane tab="Reviews" key="2">
              <ReviewBox type="hospitals" id={get(hospital, "id")} />
            </TabPane>
            <TabPane tab="FAQs" key="3">
              <FaqBlock hospitalId={get(hospital, "id")} hospital={true} />
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div>
        { ads?.length>0 && ads?.map((ad: any,index:any) => {
          return (
            <div key={index}>
              <div>
                {ad?.video?.key ? (
                  <div onClick={() => clickAd(ad)}>
                    <h3>{ad?.text}</h3>
                    {/* <Media>
                      <div
                        className={styles["media"]}
                        style={{ cursor: "pointer" }}
                      >
                        <div className={styles["media-player"]}>
                          <Player
                            src={ad?.video?.url}
                            loop={true}
                            autoPlay={true}
                          />
                        </div>
                      </div>
                    </Media> */}
                    <Image alt=""
                      src={ad?.image?.url}
                      style={{ width: "100px", height: "70px" }}
                      width={100}
          height={70}
                    />
                  </div>
                ) : (
                  <div>
                    <h3>{ad?.text} </h3>
                    <Image alt=""
                      src={ad?.image?.url}
                      style={{ width: "100px", height: "70px" }}
                      width={100}
          height={70}
                    />
                  </div>
                )}
              </div>
              {adModal && (
                // <openVideo adModal={adModal} closeAdModal={closeAdModal} ad={ad}/>
                <Modal
                open={adModal === ad?.uuid}
                // visible={adModal }
                onCancel={closeAdModal}
                footer={null}
              >
                <h1>{ad?.text}
                </h1>
                {/* <Media>
                  <div className={styles["media"]} style={{ cursor: "pointer",width:"700px" }}>
                    <div className={styles["media-player"]}>
                      <Player src={ad?.video?.url} loop={true} autoPlay={true} />
                    </div>
                    <div className={styles["media-controls"]}>
                      <PlayPause />
                      <MuteUnmute />
                    </div>
                  </div>
                </Media> */}
                <Image src={ad?.image?.url} alt="ad Image" className={styles["ad-image"]} style={{width:"200px",height:"200px",marginTop:"12px"}} width={200}
          height={200}/>
              </Modal>
              )}
            </div>
          );
        })}
        <div style={{ cursor: "pointer" }}>
          { notifications?.length > 0 && notifications?.map((notification: any,index:any) => {
            return (
              <div key={index}>
                <h1>{notification?.text}</h1>
                {
                  notification?.image?.url ? 
                  <Image 
                  width={100}
                  height={70}
                    src={notification?.image?.url}
                    alt="ad Image"
                    style={{ width: "100px", height: "70px" }}
                  />
                  :
                  null
                }
               
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
