"use client";
import { Col, Row, Badge, Alert } from 'antd';
import { CalendarOutlined, FieldTimeOutlined } from '@ant-design/icons';
import ButtonOutline from '../buttons/buttonOutline';
import RatingBox from '../ratingBox';
import get from 'lodash/get';
import Image from "next/image";

// styles
import styles from './styles.module.scss';
import { map } from 'lodash';
import { getDoctorAddress } from '../../utilities/helpers';
import moment from 'moment';

export default function MyAppointmentComponent({
  data,
  medicalHandler,
  rescheduleHandler,
  cancelHandler,
  reviewHandler,
}) {
  let color = '';

  switch (get(data, 'status.name')) {
    case 'Pending':
      color = 'blue';
      break;
    case 'Done':
      color = 'green';
      break;
    case 'No Show':
      color = 'default';
      break;
    case 'Cancelled':
      color = 'red';
      break;
    case 'In complete':
      color = 'grey';
      break;
    default:
      color = 'grey';
  }
  return (
    <div className={styles["my-appointment-component"]}>

      <Badge.Ribbon text={get(data, 'status.name')} color={color}>
        {/* <div className={styles["title">{get(data, 'date')}</div> */}
        <div className={styles["card-style"]} color="pink">
          <div className={styles["header-style"]}>
            <Row>
              <Col span={18}>
                <div className={styles["user-info"]}>
                  <div className={styles["circle-image"]}>
                    <Image alt=""
                    layout='fill'
                      src={get(data, 'doctor.image.url')}
                      className={styles["circle-user"]}
                    />
                  </div>
                  <div>
                    <div className={styles["name"]}>
                      {get(data, 'doctor.title')} {get(data, 'doctor.name')}
                    </div>
                    <div className={styles["address"]}>
                      {getDoctorAddress(get(data, 'doctor.doctor_detail'))}
                    </div>
                    <div className={styles["hospital"]}>{get(data, 'hospital.name')}</div>
                    <div className={styles["experience"]}>
                      {get(data, 'doctor.doctor_detail.qualifications')}{' '}
                      {get(data, 'doctor.doctor_detail.experience')} years of
                      experience
                    </div>
                    {get(data, 'status.name') === 'Cancelled' && get(data, 'reschedule_reason') ? (
                      <Alert type='error' title='Reason'>{get(data, 'reschedule_reason')}</Alert>) :
                      ""}
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className={styles["flex-column"] + " " + styles["between"]}>
                  <div className={styles["flex-column"]}>
                    {get(data, 'is_rating_done') && (
                      <RatingBox
                        ratingValue={get(data, 'appointment_rating.rating')}
                        edit={false}
                        // onChange={props.onChange}
                        size={20}
                      />
                    )}
                    {/* <div className={styles["rating-info">Video Consultation</div> */}
                  </div>
                  <div> {data?.cancel_reason ? `Reason : ${data?.cancel_reason}` : null}</div>
                  <div className={styles["flex-layout"]}>
                    <Image alt=""
                    width={10}
                    height={16}
                      src="../../static/images/icons/user.svg"
                      className={styles["user-image"] + " " + "mr--10"}
                    />
                    <div className={styles["self-info"]}>
                      {get(data, 'patient.is_primary')
                        ? 'My self'
                        : get(data, 'patient.name')}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div className={styles["divider"] + " " + "divider"} />

          <div className={styles["button-layout"]}>
            <Row>
              <Col span={12}>
                <div className={styles["date-action"]}>
                  <div className={styles["button-dashed"]}>
                    <CalendarOutlined />{' '}
                    <span className={styles["date-time"]}>{get(data, 'date')}</span>
                  </div>
                  <div className={styles["button-dashed"]}>
                    <FieldTimeOutlined />{' '}
                    <span className={styles["date-time"]}>{get(data, 'time')}</span>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className={styles["buttons"]}>
                  {get(data, 'status.value') === 3 && (
                    <ButtonOutline
                      title="Medical Document"
                      theme="red"
                      className={styles["button-outline"]}
                      onClick={() => medicalHandler(data)}
                    />
                  )}
                  {get(data, 'status.value') === 1 && (
                    <ButtonOutline
                      title="Reschedule"
                      theme="green"
                      className={styles["button-outline"]}
                      onClick={() => rescheduleHandler(data)}
                    />
                  )}
                  {get(data, 'status.value') === 1 && (
                    <ButtonOutline
                      title="Cancel"
                      theme="red"
                      className={styles["button-outline"]}
                      onClick={() => cancelHandler(data)}
                    />
                  )}
                  {!get(data, 'is_rating_done') &&
                    get(data, 'status.value') === 3 && (
                      <ButtonOutline
                        title="Write Review"
                        theme="blue"
                        className={styles["button-outline"]}
                        onClick={() => reviewHandler(data)}
                      />
                    )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Badge.Ribbon>
    </div>
  );
}
