import { Row, Col } from 'antd';
import get from 'lodash/get';
import Image from "next/image";

// Styles
import styles from './styles.module.scss';

export default function TrustSection(props) {
  const { details } = props;

  const counterData = [
    {
      number: '500+',
      infoText: 'Happy Patients',
      iconUrl: '../../../static/images/icons/patients.svg',
    },
    {
      number: `${get(details, 'doctor_count')}+`,
      infoText: 'Qualified Doctors',
      iconUrl: '../../../static/images/icons/happy-doctor.svg',
    },
    {
      number: `${get(details, 'specialisations').length}+`,
      infoText: 'Specialities',
      iconUrl: '../../../static/images/icons/speciality.svg',
    },
  ];
  return (
    <div className={styles["trust-section-style"]}>
      <div className={styles["counter-card"]}>
        {counterData.map((data, index) => (
          <div className={styles["counter-item"]} key={index}>
            <div className={styles["icon"]}>
              <Image src={data.iconUrl} alt="" width={10}
          height={10}/>
            </div>
            <div className={styles["text"]}>
              <div className={styles["title"]}>{data.number}</div>
              <div className={styles["text-sm"]}>{data.infoText}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
