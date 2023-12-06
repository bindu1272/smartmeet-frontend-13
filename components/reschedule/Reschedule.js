"use client";
import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Col, DatePicker, Row, Spin, Form, Button, Empty, message } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import SelectSlot from './SelectSlot';
import TextArea from 'antd/lib/input/TextArea';
import get from 'lodash/get';
import filterArray from 'lodash/filter';
import {
  authorizePutRequest,
  authorizeGetRequest,
} from '../../utilities/axiosHelper';
import { useSession } from 'next-auth/react';
import { axiosInstance } from '../../remote/axios';

function Reschedule({ data, toggleReschedule, getAppointments }) {
  const date_format = 'YYYY-MM-DD';

  const [newDate, setNewDate] = useState(moment());
  const [newSlot, setNewSlot] = useState();
  const [slots, setSlots] = useState([]);
  const [bookedSlots,setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const {data:session} = useSession();

  const handleDate = (date) => {
    if (date) {
      setNewDate(date);
    }
  };

  useEffect(() => {
    setLoading(true);
    appointmentSlots();
    //eslint-disable-next-line
  }, [newDate]);


  const appointmentSlots = async () =>{
    let res = await authorizeGetRequest(
      axiosInstance,
      get(session, 'user'),
      `doctors/${get(data, 'doctor.id')}/appointment-slots/${get(
        data,
        'hospital.id',
      )}?date=${newDate.format(date_format)}`,
    );
    setLoading(false);
    const filteredSlots = filterArray(res.data.data, ['booked', false]);
    const filteredBookedSlots = filterArray(res.data.data,['booked',true]);
    setBookedSlots(filteredBookedSlots);
    setSlots(filteredSlots);
    setNewSlot(filteredSlots[0]?.id);
      }

  const reschedule = async (payload) => {
    setLoading(true);
    let res = await authorizePutRequest(
      axiosInstance,
      get(session, 'user'),
      `/appointments/${get(data, 'id')}/reschedule`,
      payload,
    );

    setLoading(false);
    toggleReschedule();
    message.success('Appointment Rescheduled');
    getAppointments();
  };

  const onFinish = (values) => {
    const payload = {
      ...values,
      date: get(values, 'date').format(date_format),
      slot_id: newSlot,
    };
    if (newSlot) {
      reschedule(payload);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Spin spinning={loading}>
      <div className={styles["add-drawer-content"]}>
        <div className={styles["add-drawer-form"]}>
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{ date: newDate }}
          >
            <Form.Item
              label="Select a date"
              name="date"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                onChange={(date) => handleDate(date)}
                format={date_format}
                disabledDate={(date) =>
                  moment().startOf('day').isSameOrAfter(date)
                }
              />
            </Form.Item>
            <Form.Item
              label="Booked Slots"
              name="Booked Slots"
            >
              {
                bookedSlots?.map((bookedSlot)=>bookedSlot?.slot_start)
              }
            </Form.Item>

            <Form.Item label="Choose a slot " name="choose_slot">
              {slots && slots.length > 0 ? (
                <SelectSlot
                  slots={slots}
                  setNewSlot={setNewSlot}
                  newSlot={newSlot}
                />
              ) : (
                <Empty description="No Slots Available" />
              )}
            </Form.Item>
            <Form.Item
              label="Give Reason"
              name="reschedule_reason"
              rules={[{ required: true, message: 'Please enter reason' }]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Done
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
}

export default Reschedule;
