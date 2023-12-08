"use client";
import React from 'react';
import { Tabs, Row, Col, Card, Tag } from 'antd';
import get from 'lodash/get';
import map from 'lodash/map';
import LayoutContainer from '@/components/layoutContainer';
import ReviewBox from '@/components/reviewBox';
import FaqBlock from '@/components/faqBlock';
import RatingBox from '@/components/ratingBox';
import ButtonDefault from '@/components/buttons/buttonDefault';
import { getDoctorAddress, getAddress } from '@/utilities/helpers';
import BookConsultationSlot from '@/components/doctorDetailsInfo/bookConsultationSlot';
import { getAvailabilityTime } from '@/utilities/helpers';
import { getDoctors } from '@/utilities/ApiHelper';
import { useRouter } from 'next/navigation';
import Image from "next/image";

const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}

// styles
// import styles from "../styles.module.scss";
import styles from "../../../app/hospital/[uuid]/doctor/[doctorId]/styles.module.scss"
import { axiosInstance } from '@/remote/axios';
import Link from 'next/link';
// import { useEffect, useState } from 'react';

export default function DoctorPage({ doctor, props, doctorAvailability, hospital }: any) {
  const router = useRouter();
  return (
    <div className={styles["doctors-info"]}>
      <Row gutter={48}>
        <Col xs={24} xl={14}>
          <div className={styles["doctor-detail-section"]}>
            <div className={styles["card-section"]}>
              <Card className={styles["card-style"]}>
                <div className={styles["card-body"]}>
                  <div className={styles["img-card"]}>
                    <Image alt="" width={130}
                      height={130}
                      src={get(doctor?.image, 'url')}
                    // className={styles[{data.logoStyle}
                    />
                  </div>

                  <div className="text-section">
                    <h4 className={styles["title4"]}>
                      {`${get(doctor, 'title')} ${get(doctor, 'name')}`}
                    </h4>

                    <RatingBox
                      ratingValue={get(doctor, 'doctor_detail.rating')}
                      onChange={props?.onChange}
                      ratingText={true}
                      edit={false}
                    />

                    <div className={styles["description"]}>
                      {getDoctorAddress(get(doctor, 'doctor_detail'))}
                    </div>
                    <div className={styles["description"] + " " + styles["hospital-name"]}>
                      {get(doctor, 'doctor_detail.qualifications')}
                    </div>
                    {/* <div className={styles["description">{'qualification'}</div> */}

                    <div className={styles["description"] + " " + styles["hospital-name"]}>
                      {map(get(doctor, 'specialisations'), (s: any, i: any) => (
                        <Tag color="magenta" key={i}>
                          {get(s, 'name')}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles["featured-style"]}>
                  <div className={styles["title4"]}>FEATURED</div>

                  {map(get(doctor, 'doctor_detail.features'), (f: any) => (
                    <div className={styles["featured-list"]}>
                      <Image src="../../../../static/images/icons/check.svg" alt="" width={10}
                        height={10} />
                      {f}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Col>
        <Col xs={24} xl={10} className={styles["book-section"]}>
          <BookConsultationSlot doctor={doctor} hospital={hospital} />
        </Col>
      </Row>

      <div className={styles["tab-section"]}>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Doctors" key="1">
            <div className={styles["doctor-information-section"]}>
              <div className={styles["title3"]}>About Doctor</div>
              <div className={styles["description"]}>
                {get(doctor, 'doctor_detail.about')}
              </div>
              <div className={styles["address-section"]}>
                <div className={styles["title3"]}>Address</div>
                <div className={styles["address-text"]}>
                  {getDoctorAddress(get(doctor, 'doctor_detail'))}
                </div>
                <ButtonDefault
                    title="Get Direction"
                    onClick={() => {
                      window.open(
                        `http://maps.google.co.in/maps?q=${getDoctorAddress(
                          get(doctor, 'doctor_detail')
                        )}`,
                        '_blank'
                      );
                    }}
                  />
              </div>
              <div className={styles["availability-section"]}>
                <div className={styles["title3"]}>Availability</div>
                <div className="timing">
                  {map(doctorAvailability, (da: any, i: any) => (
                    <>
                      <Row className={styles["single-daytime"]}>
                        <Col span={3}>
                          <div className={i > 0 ? styles["day"] + " " + 'mt--10' : styles["day"]}>
                            {get(da[0], 'dayName', null)}
                          </div>
                        </Col>
                        <Col>
                          {map(da, (t: any) => (
                            <>
                              {' '}
                              <span>
                                {' '}
                                {`${get(t, 'from_time')}- ${get(
                                  t,
                                  'to_time'
                                )}`}{' '}
                              </span>
                            </>
                          ))}
                        </Col>
                      </Row>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Reviews" key="2">
            <ReviewBox id={get(doctor, 'id')} type="doctors" />
          </TabPane>
          <TabPane tab="FAQs" key="3">
            <FaqBlock doctorId={get(doctor, 'id')} />
          </TabPane>
        </Tabs>

      </div>
    </div>
  );
}

