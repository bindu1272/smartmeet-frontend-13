import { Button, Col, Row } from 'antd';
import { get, gt } from 'lodash';

// Styles
import styles from './styles.module.scss';
import Image from "next/image";

export default function HeaderComponent({ data }) {
  return (
    // <div className={styles[{`header-component ${props.headerStyle}`}>
    <div className={styles["header-component"]}>
      <div className={styles["theme-title"]}>
        Appointment No: {get(data, 'appointment_id')}{' '}
      </div>

      <Row gutter={16}>
        <Col span={10}>
          <div className={styles["text"]}>Appointment Date</div>
          <div className={styles["date"]}>{get(data, 'date')}</div>
          <div className={styles["time"]}>{get(data, 'time')}</div>
        </Col>
        <Col span={14}>
          <div className={styles["text"]}>Treated by</div>
          <div className={styles["user-details"]}>
            <div className={styles["image-user"]}>
              <Image src={get(data?.doctor?.image, 'url')} alt="" layout='fill'/>
            </div>
            <div className={styles["ml--10"]}>
              <div className={styles["doctor-name"]}>
                {get(data, 'doctor.title')} {get(data, 'doctor.name')}
              </div>
              <div className={styles["theme-style"]}>
                {get(data, 'doctor.doctor_detail.qualifications')}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
