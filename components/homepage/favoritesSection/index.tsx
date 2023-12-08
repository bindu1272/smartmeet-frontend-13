"use client";
import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "next/config";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import get from "lodash/get";

import ButtonDefault from "../../buttons/buttonDefault";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

// Styles
import styles from "./styles.module.scss";
import React from "react";
const backendUrl = process.env.NEXT_PUBLIC_API_URL;

console.log("backendUrl", backendUrl);
export default function FavoritesSection() {
  const { data: session } = useSession();
  const router = useRouter();
  const [doctorsData, setDoctorsData] = useState<any>(null);
  const [hospitalData, setHospitalData] = useState<any>(null);
  const [doctorsFavourites, setDoctorsFavourites] = useState<any>(null);
  const [hospitalsFavourites, setHospitalsFavourites] = useState<any>(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {

    const getHospitalsList = async () => {
      const LISTHOSPITAL = `${backendUrl}/hospitals`;
      await axios
        .get(LISTHOSPITAL)
        .then((res) => {
          setHospitalData(res?.data?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getHospitalsList();

    const getDoctorsList = async () => {
      const LISTDOCTORS = `${backendUrl}/alldoctors`;
      await axios
        .get(LISTDOCTORS)
        .then((res) => {
          setDoctorsData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getDoctorsList();

    const getPatientsFavouritesIntial = async () => {
      const userFavorites = `${backendUrl}/patients/favourites`;
      await axios
        .post(userFavorites, { user: get(session, "user") })
        .then((res) => {
          setDoctorsFavourites(res?.data?.data?.Doctors);
          setHospitalsFavourites(res?.data?.data?.hospitals);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (get(session, "user")) {
      getPatientsFavouritesIntial();
    }
  }, []);

  const getPatientsFavourites = async () => {
    const userFavorites = `${backendUrl}/patients/favourites`;
    await axios
      .post(userFavorites, { user: get(session, "user") })
      .then((res) => {
        setDoctorsFavourites(res?.data?.data?.Doctors);
        setHospitalsFavourites(res?.data?.data?.hospitals);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const getHospitalData = async (doctorUserId: any) => {
    const LISTDOCTORS = `${backendUrl}/hospital/${doctorUserId}`;
    await axios
      .get(LISTDOCTORS)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const onClickDoctorFavorite = async (data: any, bool: any) => {
    const owner_id = data?.uuid;
    const url = `${backendUrl}/patients/doctor/${owner_id}/mark-favourite`;
    await axios
      .put(url, { action: bool, user: get(session, "user") })
      .then((res) => {
        console.log(res);
        getPatientsFavourites();
        if (bool) {
          setDoctorsFavourites(
            doctorsFavourites?.filter((favDoct: any) => {
              favDoct?.uuid !== data?.uuid
            }));
        }
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };
  const onClickHospitalFavorite = async (data: any, bool: any) => {
    const owner_id = data?.id;
    const url = `${backendUrl}/patients/hospital/${owner_id}/mark-favourite`;
    await axios
      .put(url, { action: bool, user: get(session, "user") })
      .then((res) => {
        getPatientsFavourites();
        if (bool) {
          setHospitalsFavourites(
            hospitalsFavourites?.filter((favHosp: any) => {
              favHosp?.uuid !== data?.id
            }));
        }
      })
      .catch((err) => {
        console.log("Err", err);
      });

  }
  const clickAppointment = async (data: any) => {
    const hospitalData = `${backendUrl}/hospital/${data?.doctor?.id}/doctor`;
    await axios
      .get(hospitalData)
      .then((res) => {
        const slugName = res?.data?.data?.hospitals?.slug;
        if(slugName && data?.doctor?.uuid){
          window.location.href = window.location.origin + `/hospital/${slugName}/doctor/${data?.doctor?.uuid}`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const filterDoctorIds = doctorsData?.map((docData: any) => {
    return docData?.uuid;
  })
  const filterDoctorFavouriteIds = doctorsFavourites?.map((docFav: any) => {
    return docFav?.uuid;
  })
  const filterTwoArrays = (string1: any, string2: any) => string1?.filter((item: any) => string2?.includes(item));
  const finalFilterDoctors = filterTwoArrays(filterDoctorIds, filterDoctorFavouriteIds);

  const filterHospitalIds = hospitalData?.map((hosData: any) => {
    return hosData?.id;
  })
  const filterHospitalFavouriteIds = hospitalsFavourites?.map((hosFav: any) => {
    return hosFav?.uuid;
  })
  const finalFilterHospitals = filterTwoArrays(filterHospitalIds, filterHospitalFavouriteIds);
  const clickHospitalAppointment = async (data: any) => {
    router.push(`/hospital/${data?.slug}`);
  }
  const onClickFavourite = () => {
    setIsFav(!isFav);
  }
  return (
    <div className={styles["favorites-style"]} id="favoriteSection">
      <div className={styles["header-section"]}>
        <Row gutter={50}>
          <Col xs={12} xl={18}>
            <div className={styles["d-flex"] + " " + styles["header-inner"]}>
              <div className={styles["icon"]}>
                <Image src="../../../static/images/icons/favourite.svg" alt="" width={18} height={25} />
              </div>
              <div className={styles["title2"]}>Favourites</div>
            </div>
          </Col>
          <Col xs={12} xl={6}>
            <div className={styles["button-section"]}>
              <ButtonDefault onClick={onClickFavourite} title="Manage Favourites" />
            </div>
          </Col>
        </Row>
      </div>
      {isFav ?
        <div className={styles["image-card-section"]}>
          <Row gutter={50}>
            <Col xs={24} xl={4}>
              <div className={styles["title-section"]}>
                <div className={styles["title3"]}>Doctors</div>
              </div>
            </Col>
            <Col xs={24} xl={20}>
              <Row gutter={20} className={styles["slider-row"]}>
                {doctorsData?.map((data: any, index: any) => (
                  <Col xs={24} xl={4} key={index}>
                    <div className={styles["card-body"] + " " + styles[data?.cardStyle]}>
                      <div className={styles["img-card"]} onClick={() => clickAppointment(data)}>
                        <Image alt="" layout="fill"
                          src={data?.doctor?.image?.url}
                          className={styles["icon-image"] + " " + styles[data?.style]}
                        />
                      </div>
                      {finalFilterDoctors.includes(data?.uuid) ?
                        <HeartFilled
                          className={styles["favourite"]}
                          onClick={() => onClickDoctorFavorite(data, finalFilterDoctors.includes(data?.uuid) ? false : true)}
                        />
                        :
                        <HeartOutlined
                          className={styles["nonfavourite"]}
                          onClick={() => onClickDoctorFavorite(data, finalFilterDoctors.includes(data?.uuid) ? false : true)}
                        />
                      }
                      <div className={styles["card-title"]}>{data?.doctor?.name}</div>
                      {/* <div className={styles["description">{data.designation}</div> */}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          <Row gutter={50} className={styles["hospitals-section"]}>
            <Col xs={24} xl={4}>
              <div className={styles["title-section"]}>
                <div className={styles["title3"]}>Hospitals</div>
              </div>
            </Col>
            <Col xs={24} xl={20}>
              <Row gutter={20} className={styles["slider-row"]}>
                {hospitalData?.map((data: any, index: any) => (
                  <Col xs={24} xl={4} key={index}>
                    <div className={styles["card-body"] + " " + styles[data.cardStyle]}>
                      <div className={styles["img-card"]} onClick={() => clickHospitalAppointment(data)}>
                        <Image alt="" layout="fill"
                          src={data?.logo_url?.url}
                          className={styles["icon-image"] + " " + styles[data.style]}
                        />
                      </div>
                      {
                        finalFilterHospitals.includes(data?.id) ?
                          <HeartFilled
                            className={styles["favourite"]}
                            onClick={() => onClickHospitalFavorite(data, finalFilterHospitals.includes(data?.id) ? false : true)}
                          />
                          :
                          <HeartOutlined
                            className={styles["nonfavourite"]}
                            onClick={() => onClickHospitalFavorite(data, finalFilterHospitals.includes(data?.id) ? false : true)}
                          />
                      }
                      <div className={styles["card-title"]}>{data.name}</div>
                      {/* <div className={styles["description">{data?.specialisations?.name}</div> */}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
        :
        <div className={styles["image-card-section"]}>
          <Row gutter={50}>
            <Col xs={24} xl={4}>
              <div className={styles["title-section"]}>
                <div className={styles["title3"]}>Doctors</div>
              </div>
            </Col>
            <Col xs={24} xl={20}>
              <Row gutter={20} className={styles["slider-row"]}>
                {doctorsData?.map((data: any, index: any) =>
                (
                  <Col xs={24} xl={4} key={index}>
                    <div className={styles["card-body"] + " " + styles[data?.cardStyle]}>
                      <div className={styles["img-card"]} onClick={() => clickAppointment(data)}>
                        {
                          data?.doctor?.image?.url ?
                            <Image alt="" layout="fill"
                              src={data?.doctor?.image?.url}
                              // src={data?.doctor?.image?.url}src={data?.doctor?.thumbnail?.thumbnail_url}
                              className={styles["icon-image"] + " " + styles[data?.style]}
                            />
                            : null
                        }
                      </div>
                      <div className={styles["card-title"]}>{data?.doctor?.name}</div>
                      {/* <div className={styles["description">{data.designation}</div> */}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          <Row gutter={50} className={styles["hospitals-section"]}>
            <Col xs={24} xl={4}>
              <div className={styles["title-section"]}>
                <div className={styles["title3"]}>Hospitals</div>
              </div>
            </Col>
            <Col xs={24} xl={20}>
              <Row gutter={20} className={styles["slider-row"]}>
                {hospitalData?.map((data: any, index: any) => (
                  <Col xs={24} xl={4} key={index}>
                    <div className={styles["card-body"] + " " + styles[data.cardStyle]}>
                      <div className={styles["img-card"]} onClick={() => clickHospitalAppointment(data)}>
                        <Image alt="" layout="fill"
                          src={data?.logo_url?.url}
                          className={styles["icon-image"] + " " + styles[data.style]}
                        />
                      </div>
                      <div className={styles["card-title"]}>{data.name}</div>
                      {/* <div className={styles["description">{data?.specialisations?.name}</div> */}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      }
    </div>
  );
}
