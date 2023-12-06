"use client";
import React, { useEffect, useState } from 'react';
import { Tabs, Card, Spin } from 'antd';
import get from 'lodash/get';
import TimeSlot from '../../../components/doctorDetailsInfo/timeSlot';
import ModalPrimary from '../../../components/modals/modalPrimary';
import BookConsultation from '../../../components/doctorDetailsInfo/bookConsultation';
import FamilyForm from '../../../components/doctorDetailsInfo/bookConsultation/familyForm';
import VerifyEmail from '../../../components/doctorDetailsInfo/verifyEmail';
import SuccessContent from '../../../components/successContent';
import ButtonPrimary from '../../../components/buttons/buttonPrimary';
import { generateSlots, sliceDate } from '../../../utilities/helpers';
import { axiosInstance } from '../../../remote/axios';
import moment from 'moment';
import map from 'lodash/map';
import filter from 'lodash/filter';
// styles
import styles from './styles.module.scss';
import Image from 'next/image';

const { TabPane } = Tabs;
const todayDate = moment().format('YYYY-MM-DD');

export default function BookConsultationSlot(props) {
  const { doctor, hospital } = props;
  const [appointmentModal, setAppointmentModal] = useState({
    visible: false,
    data: null,
    payload: null,
    inputs: null,
    modalFormStep: null,
  });
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState({});

  const appointmentDuration = get(hospital, 'appointment_booking_duration');
  const [slotList, setSlotList] = useState(
    appointmentDuration!=null ? 
    map(Array(appointmentDuration), (a, key) => {
      return {
        key,
        date_formatted:
          key === 0
            ? 'Today'
            : key === 1
            ? 'Tomorrow'
            : moment().add(key, 'day').format('ddd, Do MMM'),
        date: moment().add(key, 'day').format('YYYY-MM-DD'),
      };
    })
    : []
  );

  const showModal = (data) => {
    setAppointmentModal({
      visible: true,
      data,
      modalFormStep: 0,
    });
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getSlots = async (date, key) => {
    try {
      setLoading(true);
      let res = await axiosInstance.get(
        `doctors/${get(doctor, 'id')}/appointment-slots/${get(
          hospital,
          'id'
        )}?date=${date}`
      );

      setSlots({
        date,
        selectedKey: key,
        ...generateSlots(get(res, 'data.data'), date),
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(slotList?.length>0){
      const getSlotsIntial = async (date, key) => {
        try {
          setLoading(true);
          let res = await axiosInstance.get(
            `doctors/${get(doctor, 'id')}/appointment-slots/${get(
              hospital,
              'id'
            )}?date=${date}`
          );
    
          setSlots({
            date,
            selectedKey: key,
            ...generateSlots(get(res, 'data.data'), date),
          });
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
      };
      getSlotsIntial(get(slotList?.[0], 'date'), 0);
    }
  }, [slotList]);

  const onAppointmentCreated = async (payload, inputs, type) => {
    if (type === 1) {
      setAppointmentModal({
        ...appointmentModal,
        payload,
        modalFormStep: 2,
        inputs,
      });
    } else if (type === 2) {
      setAppointmentModal({
        ...appointmentModal,
        modalFormStep: 1,
        inputs,
      });
    }
  };

  const validateAppointment = async () => {
    try {
      let res = await axiosInstance.post(`appointments`, payload);
    } catch (e) {}
  };

  const goBack = () => {
    setAppointmentModal({
      ...appointmentModal,
      modalFormStep: 0,
      payload: null,
    });
  };

  const onConfirmAppointment = () => {
    setAppointmentModal({
      visible: true,
      data: null,
      payload: null,
      inputs: null,
      modalFormStep: 3,
    });
    getSlots(get(slots, 'date'));
  };

  const [verifySection, setVerifySection] = React.useState(false);
  const bookConsultationHandler = () => setVerifySection(true);

  function callback(key) {
    if(slotList?.length>0){
    getSlots(get(slotList[key], 'date'), key);
    }
  }

  const [modalFormStep, setModalFormStep] = useState(0);

  const completeModalStep = () => {
    setModalFormStep((cur) => cur + 1);
  };
  console.log("hello",doctor,hospital,appointmentModal)
  return (
    <Spin spinning={loading}>
      <div className={styles["book-consultation-slot"]}>
        <Card className={styles["card-slot"]}>
          <div className={styles["card-header"]}>
            <div className={styles["title"]}>
              {' '}
              <Image alt=""
              width={18}
              height={18}
                src="../../../static/images/icons/plus-dark.svg"
                className={styles["mr--10"]}
              />{' '}
              Book Consultation
            </div>
            {/* <div className={styles["price">₹ 500</div> */}
          </div>
          <div className={styles["card-tab-sec"]}>
            <Tabs defaultActiveKey="0" onChange={callback}>
              {map(slotList, (data, i) => {
                return (
                  <TabPane
                    tab={
                      <div className={styles["text-block-style"]}>
                        <span>{get(data, 'date_formatted')}</span>
                        {get(slots, 'selectedKey') === `${i}`
                          ? `${get(slots, 'available_slots')} Slots Available`
                          : null}
                      </div>
                    }
                    key={data?.key}
                    className={styles["text-green"]}
                    // className={styles[{`${
                    //   // data.textblock === 'No Slots Available'
                    //   //   ? 'text-gray'
                    //   //   : 'text-green'
                    // }`}
                  >
                    <TimeSlot
                      date={get(data, 'date')}
                      noData={
                        get(slots, 'available_slots') === 0 ? true : false
                      }
                      slots={get(slots, 'slots', [])}
                      onClickConsult={showModal}
                    />
                  </TabPane>
                );
              })}
            </Tabs>
          </div>
        </Card>

        <ModalPrimary
          visible={get(appointmentModal, 'visible')}
          onOk={handleOk}
          onCancel={() => {
            setAppointmentModal({
              visible: false,
              data: null,
              payload: null,
            });
          }}
        >
          {get(appointmentModal, 'modalFormStep') === 0 && (
            <BookConsultation
              initialValues={
                get(appointmentModal, 'inputs')
                  ? get(appointmentModal, 'inputs')
                  : {}
              }
              clickHandler={completeModalStep}
              onAppointmentCreated={onAppointmentCreated}
              doctor={doctor}
              slot={get(appointmentModal, 'data')}
              hospital={hospital}
            />
          )}

          {get(appointmentModal, 'modalFormStep') === 1 && (
            <FamilyForm
              inputs={get(appointmentModal, 'inputs')}
              onAppointmentCreated={onAppointmentCreated}
              doctor={doctor}
              slot={get(appointmentModal, 'data')}
              hospital={hospital}
            />
          )}
          {get(appointmentModal, 'modalFormStep') === 2 && (
            <VerifyEmail
              goBack={goBack}
              inputs={get(appointmentModal, 'inputs')}
              email={get(appointmentModal, 'payload.owner')}
              clickHandler={completeModalStep}
              onConfirmAppointment={onConfirmAppointment}
              onAppointmentCreated={onAppointmentCreated}
              otp_uuid={get(appointmentModal, 'payload.id')}
            />
          )}

          {get(appointmentModal, 'modalFormStep') !== 3 && (
            <div className={styles["dot-setup"]}>
              <span
                className={styles[`dot-style ${
                  get(appointmentModal, 'modalFormStep') === 0
                    ? 'dot-active'
                    : ''
                }`]}
              />
              <span
                className={styles[`dot-style ${
                  get(appointmentModal, 'modalFormStep') === 2
                    ? 'dot-active'
                    : ''
                }`]}
              />
            </div>
          )}

          {get(appointmentModal, 'modalFormStep') === 3 && (
            <SuccessContent
              title="Verified and Booking done Successfully!"
              hideClose
            />
          )}

          {/* <div className={styles["button-section">
          <ButtonPrimary icon={true} title="Continue" onClick={completeModalStep} />
        </div> */}
        </ModalPrimary>
      </div>
    </Spin>
  );
}
