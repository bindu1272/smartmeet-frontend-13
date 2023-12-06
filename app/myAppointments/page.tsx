"use client";
import { useEffect, useState } from "react";
import RatingBox from "@/components/ratingBox";
import { Col, Row, Select, Input, Drawer, Form, message, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import ButtonOutline from "@/components/buttons/buttonOutline";
import ButtonPrimary from "@/components/buttons/buttonPrimary";
import LayoutContainer from "@/components/layoutContainer";
import ModalPrimary from "@/components/modals/modalPrimary";
import MyAppointmentComponent from "@/components/myAppointments";
import SuccessContent from "@/components/successContent";
import get from "lodash/get";
import map from "lodash/map";
import Image from "next/image";

const { TextArea } = Input;

// styles
import styles from "./styles.module.scss";
import MedicalHistory from "@/components/medicalHistory";
import { useSession } from "next-auth/react";
import {
  authorizeGetRequest,
  authorizePostRequest,
  authorizePutRequest,
} from "@/utilities/axiosHelper";
import { axiosInstance } from "@/remote/axios";
import Reschedule from "@/components/reschedule/Reschedule";
import { filterPatients } from "@/constants/keys";

const { Option } = Select;

function handleChange(value: any) {
  console.log(`selected ${value}`);
}

export default function MyAppointments({
  bookAppointment,
  registerHospital,
}: any) {
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [appointments, setAppointments] = useState<any>({
    appointmentResult: [],
    pagination: null,
  });
  const [members, setMembers] = useState<any>([]);
  const [memberFilter, setMemberFilter] = useState("");
  const [filter, setFilter] = useState({
    page: 1,
    status: null,
  });

  const canceClick = () => {
    setIsCancelModalVisible(!isCancelModalVisible);
  };

  const [reviewModal, setReviewModal] = useState({
    visible: false,
    data: null,
  });

  const toggleReview = (data :any= null) => {
    setReviewModal({
      visible: !get(reviewModal, "visible"),
      data,
    });
  };

  const [cancelModal, setCancelModal] = useState({
    visible: false,
    data: null,
  });

  const toggleCancel = (data = null) => {
    if (!get(cancelModal, "visible")) {
      setModalFormStep(0);
    }
    setCancelModal({
      visible: !get(cancelModal, "visible"),
      data,
    });
  };

  const [modalFormStep, setModalFormStep] = useState(0);
  const completeModalStep = () => {
    setModalFormStep((cur) => cur + 1);
  };

  const [visible, setVisible] = useState(false);
  const drawerToggle = () => {
    setVisible(!visible);
  };

  const [reschedule, setReschedule] = useState<any>();
  const toggleReschedule = (data :any= null) => {
    setReschedule({
      visible : !get(reschedule, "visible") ,
      data,
    });
  };

  const [medicalDocument, setMedicalDocument] = useState<any>();
  const toggleMedical = (data :any= null, isAllMedicalHistory = false) => {
    setMedicalDocument({
      visible : !get(medicalDocument, "visible"),
      data,
      isAllMedicalHistory,
    });
  };

  const submitReview = async (payload: any) => {
    let result = await authorizePostRequest(
      axiosInstance,
      get(session, "user"),
      `/appointments/${get(reviewModal, "data.id")}/ratings`,
      payload
    );

    toggleReview();
    message.success("Review submitted succcessfully");
    getAppointments();
  };

  const submitCancel = async (payload: any) => {
    let result = await authorizePutRequest(
      axiosInstance,
      get(session, "user"),
      `/patients/appointments/${get(
        cancelModal,
        "data.id"
      )}/cancel-appointment`,
      payload
    );
    completeModalStep();
    getAppointments();
  };

  const { data: session } = useSession();

  const onFinish = (values:any) => {
    submitReview(values);
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log("Failed:", errorInfo);
  };

  const handleLoadMore = () => {
    const nextPage = get(filter, "page") + 1;

    getAppointments(nextPage, get(filter, "status"), memberFilter);
  };

  const getFamilyMembers = async () => {
    let result = await authorizeGetRequest(
      axiosInstance,
      get(session, "user"),
      `/patients/dashboard`
    );
    const familyMembers = map(
      get(result, "data.data.members"),
      (member: any) => {
        return { name: get(member, "name"), id: get(member, "id") };
      }
    );
    const memberDetails = {
      name: "myself",
      id: get(result, "data.data.user.id"),
    };
    //get(result, 'data.data.user.id')
    setMembers([
      { name: "All", id: null },
      { ...memberDetails },
      ...familyMembers,
    ]);
  };
  
  const getAppointments = async (
    page = 1,
    status = null,
    member_uuid:any = null,
    name: any = null
  ) => {
    let url = `/patients/appointments?limit=10&page=${page}`;
    if (status) {
      url = url.concat(`&status=${status}`);
    }
    if (name?.children !== "myself") {
      if (member_uuid) {
        url = url.concat(`&member_uuid=${member_uuid}`);
      }
    }
    if (name?.children === "myself") {
      url = url.concat(`&user_uuid=${member_uuid}`);
    }
    let result = await authorizeGetRequest(
      axiosInstance,
      get(session, "user"),
      url
    );

    if (page > 1) {
      setAppointments({
        appointmentResult: [
          ...get(appointments, "appointmentResult"),
          ...get(result, "data.data.data"),
        ],
        pagination: get(result, "data.data.meta.pagination"),
      });
    } else {
      setAppointments({
        appointmentResult: get(result, "data.data.data"),
        pagination: get(result, "data.data.meta.pagination"),
      });
    }
    setFilter({ page, status });
    setMemberFilter(member_uuid);
  };


  useEffect(() => {
    if (get(session, "user")) {
      const getAppointmentsInitial = async (
        page = 1,
        status = null,
        member_uuid:any = null,
        name: any = null
      ) => {
        let url = `/patients/appointments?limit=10&page=${page}`;
        if (status) {
          url = url.concat(`&status=${status}`);
        }
        if (name?.children !== "myself") {
          if (member_uuid) {
            url = url.concat(`&member_uuid=${member_uuid}`);
          }
        }
        if (name?.children === "myself") {
          url = url.concat(`&user_uuid=${member_uuid}`);
        }
        let result = await authorizeGetRequest(
          axiosInstance,
          get(session, "user"),
          url
        );
    
        if (page > 1) {
          setAppointments({
            appointmentResult: [
              ...get(appointments, "appointmentResult"),
              ...get(result, "data.data.data"),
            ],
            pagination: get(result, "data.data.meta.pagination"),
          });
        } else {
          setAppointments({
            appointmentResult: get(result, "data.data.data"),
            pagination: get(result, "data.data.meta.pagination"),
          });
        }
        setFilter({ page, status });
        setMemberFilter(member_uuid);
      };
      getAppointmentsInitial();
      const getFamilyMembers = async () => {
        let result = await authorizeGetRequest(
          axiosInstance,
          get(session, "user"),
          `/patients/dashboard`
        );
        const familyMembers = map(
          get(result, "data.data.members"),
          (member: any) => {
            return { name: get(member, "name"), id: get(member, "id") };
          }
        );
        const memberDetails = {
          name: "myself",
          id: get(result, "data.data.user.id"),
        };
        //get(result, 'data.data.user.id')
        setMembers([
          { name: "All", id: null },
          { ...memberDetails },
          ...familyMembers,
        ]);
      };
      getFamilyMembers();
    }
  }, [session]);

  console.log("APPOINTMENTS DATA>>>>", appointments);

  return (
    <div className={styles["my-appointment"]}>
      <div className={styles["header-style"] + " " + "mb--40"}>
        <Row>
          <Col span={12}>
            <div className={styles["title3"]}>Your Appointments</div>
          </Col>
          <Col span={12}>
            <div className={styles["flex-layout"]}>
              <Select
                className={styles["custom-select"]}
                value={memberFilter}
                onChange={(value:any, name:any) =>
                  getAppointments(1, get(filter, "status"), value, name)
                }
              >
                {map(members, (filter: any, i: any) => (
                  <Option key={i} value={get(filter, "id")}>
                    {get(filter, "name")}
                  </Option>
                ))}
              </Select>
              <Select
                value={get(filter, "status")}
                onChange={(value:any) => getAppointments(1, value, memberFilter)}
                className={styles["custom-select"]}
              >
                {map(filterPatients, (filter: any, i: any) => (
                  <Option key={i} value={get(filter, "value")}>
                    {get(filter, "label")}
                  </Option>
                ))}
              </Select>
              <ButtonPrimary
                title="Medical History "
                onClick={() => toggleMedical(get(session, "user.id"), true)}
              />
            </div>
          </Col>
        </Row>
      </div>

      {appointments && map(get(appointments, "appointmentResult"), (data: any, index: any) => (
        <MyAppointmentComponent
          data={data}
          medicalHandler={toggleMedical}
          rescheduleHandler={toggleReschedule}
          cancelHandler={toggleCancel}
          reviewHandler={toggleReview}
        />
      ))}
      {get(appointments, "pagination.current_page") + 1 <=
        get(appointments, "pagination.total_pages") && (
        <div className={styles["load-button"]}>
          <ButtonOutline title="Load More" onClick={() => handleLoadMore()} />
        </div>
      )}

      <Drawer
        title="Medical Document"
        placement="right"
        closable={true}
        onClose={toggleMedical}
        open={get(medicalDocument, "visible")}
        // className={styles["appointment-drawer"]}
        destroyOnClose={true}
        width="40%"
      >
        <MedicalHistory
          data={get(medicalDocument, "data")}
          isAllMedicalHistory={get(medicalDocument, "isAllMedicalHistory")}
        />
      </Drawer>

      <Drawer
        title="Reschedule Appointment"
        placement="right"
        closable={true}
        onClose={toggleReschedule}
        open={get(reschedule, "visible")}
        // destroyOnClose={true}
        width="40%"
      >
        <Reschedule
          data={get(reschedule, "data")}
          getAppointments={getAppointments}
          toggleReschedule={toggleReschedule}
        />
      </Drawer>

      <ModalPrimary
        visible={get(cancelModal, "visible")}
        modalStyle={styles["sure-modal-style"]}
      >
        {modalFormStep === 0 && (
          <div className={styles["sure-section"]}>
            <div className={styles["title"]}>
              Do you want to cancel appointment?
            </div>

            <div className={styles["button-section"]}>
              <ButtonOutline
                title="Cancel"
                onClick={toggleCancel}
                className={styles["button-outline"]}
              />
              <ButtonPrimary
                title="Yes"
                onClick={completeModalStep}
                className={styles["button-primary"]}
              />
            </div>
          </div>
        )}
        {modalFormStep === 1 && (
          <div className={styles["sure-section"]}>
            <div className={styles["title"]}>Reason to Cancel Appointment?</div>

            <div className={styles["textarea-sec"]}>
              <div className={styles["text-info"]}>Give Reason</div>
              <Form
                name="basic"
                layout="vertical"
                onFinish={submitCancel}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="cancel_reason"
                  rules={[
                    {
                      required: true,
                      message: "Please enter reason to cancel!",
                    },
                  ]}
                >
                  <TextArea rows={4} placeholder="Type here.." />
                </Form.Item>
                <div className={styles["button-section"]}>
                  <ButtonOutline
                    title="Cancel"
                    onClick={toggleCancel}
                    className={styles["button-outline"]}
                  />
                  <ButtonPrimary
                    title="Done"
                    htmlType="submit"
                    className={styles["button-primary"]}
                  />
                </div>
              </Form>
            </div>
          </div>
        )}

        {modalFormStep === 2 && (
          <SuccessContent
            title="Appointment Cancelled!"
            closeModal={toggleCancel}
          />
        )}
      </ModalPrimary>

      <ModalPrimary
        visible={get(reviewModal, "visible")}
        modalStyle="write-modal-style"
        closable={false}
      >
        <div className={styles["write-section"]}>
          <button className={styles["close-button"]} onClick={toggleReview}>
            <CloseOutlined />
          </button>

          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Image src="../../static/images/icons/comments.svg" alt=""  width={210} height={89}/>
            <div className={styles["title"]}>
              How likely would you recommend <br />{" "}
              <span>
                {get(reviewModal, "data.doctor.title")}{" "}
                {get(reviewModal, "data.doctor.name")}
              </span>{" "}
              to your friends?
            </div>
            <Form.Item
              name="appointment_rating"
              rules={[
                {
                  required: true,
                  message: "Please enter rating for doctor!",
                },
              ]}
            >
              <RatingBox />
            </Form.Item>
            <Form.Item
              name="appointment_comment"
              rules={[
                {
                  required: true,
                  message: "Please enter review for doctor!",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Type here.." />
            </Form.Item>

            <div className={styles["title"]}>
              How likely would you recommend <br />{" "}
              <span>{get(reviewModal, "data.hospital.name")}</span> to your
              friends?
            </div>

            <Form.Item
              name="hospital_rating"
              rules={[
                {
                  required: true,
                  message: "Please enter rating for hospital!",
                },
              ]}
            >
              <RatingBox />
            </Form.Item>
            <Form.Item
              name="hospital_comment"
              rules={[
                {
                  required: true,
                  message: "Please enter review for hospital!",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Type here.." />
            </Form.Item>
            <div className={styles["button-section"]}>
              <ButtonOutline
                title="Not Now"
                onClick={toggleReview}
                className={styles["button-outline"]}
              />
              <ButtonPrimary
                title="Done"
                htmlType="submit"
                className={styles["button-primary"]}
              />
            </div>
          </Form>
        </div>
      </ModalPrimary>
    </div>
  );
}
