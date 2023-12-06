"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ButtonOutline from "@/components/buttons/buttonOutline";
import ButtonPrimary from "@/components/buttons/buttonPrimary";
import LayoutContainer from "@/components/layoutContainer";
import EditProfile from "@/components/personalDetails/editProfile";
import ViewProfile from "@/components/personalDetails/viewProfile";
import { axiosInstance } from "@/remote/axios";
import { authorizeGetRequest } from "@/utilities/axiosHelper";
import get from "lodash/get";
import map from "lodash/map";

// styles
import styles from "./styles.module.scss";
import MemberDetails from "@/components/memberDetails/MemberDetails";
import AdditionalDetails from "@/components/additionalDetails/AdditionalDetails";
import { Col, Divider, Drawer, Row, message } from "antd";
import MedicalHistory from "@/components/medicalHistory";
import axios from "axios";
import getConfig from "next/config";
import moment from "moment";
// const { publicRuntimeConfig } = getConfig();
const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ProfileDetails(props:any) {
  const [formStep, setFormStep] = useState(1);
  const [viewUserProfile, setViewUserProfile] = useState(true);
  const [addMemberForm, setAddMemberForm] = useState(false);
  const [addAdditionalForm, setAddAdditionalForm] = useState(false);

  const [profile, setProfile] = useState();
  const { data: session } :any= useSession();
  const [loading, setLoading] = useState(false);
  // const session = JSON.parse(sessionStorage.getItem('user'));

  const onViewUserProfile = () => {
    setViewUserProfile(true);
  };

  const onEditUserProfile = () => {
    setViewUserProfile(false);
  };

  const [medicalDocument, setMedicalDocument] = useState<any>();
  const toggleMedical = (data:any = null, isAllMedicalHistory = false) => {
    setMedicalDocument({
      visible : !get(medicalDocument, "visible"),
      data,
      isAllMedicalHistory,
    });
  };

  useEffect(() => {
    if (get(session, "user")) {
      const getProfileDetailsInitial = async () => {
        let result = await authorizeGetRequest(
          axiosInstance,
          get(session, "user"),
          `/patients/dashboard`
        );
    
        setProfile(get(result, "data.data"));
      };
      getProfileDetailsInitial();
    }
  }, [session]);

  const getProfileDetails = async () => {
    let result = await authorizeGetRequest(
      axiosInstance,
      get(session, "user"),
      `/patients/dashboard`
    );

    setProfile(get(result, "data.data"));
  };

  const [editData, setEditData] = useState();
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      name: "",
      surname: "",
      relation_ship: "",
      contactCode: "",
      contactNumber: "",
    },
  ]);
  useEffect(() => {
    if (session) {
      setLoading(true);
      getAdditionalDetails();
    }
  }, [session?.user]);
  const getAdditionalDetails = async () => {
    if (session?.user?.id) {
      const url = `${backendUrl}/patients/additional-details/${session?.user?.id}`;
      await axios
        .get(url)
        .then((res) => {
          let result = res?.data?.data;
          let obj = {
            ...result,
            allergy_problems:
              result?.allergy_problems && JSON.parse(result?.allergy_problems),
            d_v_a_expiry_date:
              result?.d_v_a_expiry_date && moment(result?.d_v_a_expiry_date),
            healthcare_expiry:
              result?.healthcare_expiry && moment(result?.healthcare_expiry),
            pension_expiry:
              result?.pension_expiry && moment(result?.pension_expiry),
            medicare_valid:
              result?.medicare_valid && moment(result?.medicare_valid),
            birth_country: result?.birth_country,
          };
          setEmergencyContacts(
            result?.emergency_contacts
              ? JSON.parse(result?.emergency_contacts)
              : [
                  {
                    name: "",
                    surname: "",
                    relation_ship: "",
                    contactCode: "",
                    contactNumber: "",
                  },
                ]
          );
          if (result?.uuid) {
            setEditData(obj);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("Err", err);
        });
    }
  };
  useEffect(() => {
    if(session){
    if (session?.user?.is_default_login && session?.user?.id) {
      axiosInstance
        .post("change-default", { id: session?.user?.id })
        .then((res) => {
          let defaultValue = session?.user?.is_default_login;
          defaultValue = false;
        });
      message.success("Please fill the profile details");
    }
  }
  }, [session?.user?.id]);

  return (
      <div className={styles["profile-container-style"]}>
        <div className={styles["banner-section"]}>
          <div className={styles["banner-inner"]}>
            <h4 className={styles["title2"]}>
              Hello {get(profile, "user.title")} {get(profile, "user.name")},
            </h4>
            <p className={styles["description"]}>
              This is your profile page. You can see your details and your
              family details here.
            </p>
            <div className={styles["banner-button-section"]}>
              <ButtonOutline
                title="Medical History"
                theme="white"
                onClick={() => toggleMedical(get(session, "user.id"), true)}
              />
            </div>
          </div>
        </div>

        <div className={styles["form-section"]}>
          {/* {formStep === 0 && <EditProfile />}
 {formStep === 1 && <ViewProfile />} */}
          {viewUserProfile ? (
            <ViewProfile onClick={onEditUserProfile} data={profile} />
          ) : (
            <EditProfile
              onClick={onViewUserProfile}
              data={profile}
              getProfileDetails={getProfileDetails}
            />
          )}
          <Row gutter={28}>
            <Col span={14}>
              <div className={styles["card"]}>
                <div className={styles["card-title"]}>Family details</div>
                <div className={styles["card-body"]}>
                  <div className="form">
                    {map(get(profile, "members"), (member, index) => (
                      <>
                        <MemberDetails
                          data={member}
                          index={index + 1}
                          getProfileDetails={getProfileDetails}
                        />
                        <Divider />
                      </>
                    ))}
                    {addMemberForm ? (
                      <MemberDetails
                        setAddMemberForm={setAddMemberForm}
                        add={true}
                        getProfileDetails={getProfileDetails}
                      />
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <ButtonPrimary
                          theme="purple"
                          title="Add Family Member"
                          onClick={() => setAddMemberForm(true)}
                        />
                      </div>
                    )}
                  </div>
                  {addAdditionalForm ? (
                    <AdditionalDetails
                      setAddAdditionalForm={setAddAdditionalForm}
                      add={true}
                      editData={editData}
                      emergencyContacts={emergencyContacts}
                      setEmergencyContacts={setEmergencyContacts}
                      setEditData={setEditData}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "12px",
                      }}
                    >
                      <ButtonPrimary
                        theme="purple"
                        title="Add Additional Details"
                        onClick={() => setAddAdditionalForm(true)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Drawer
          title="Medical Document"
          placement="right"
          closable={true}
          onClose={toggleMedical}
          open={get(medicalDocument, "visible")}
          className="appointment-drawer"
          destroyOnClose={true}
        >
          <MedicalHistory isAllMedicalHistory={true} />
        </Drawer>
      </div>
  );
}
