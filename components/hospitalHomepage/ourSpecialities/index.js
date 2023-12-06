import { Row, Col } from 'antd';
import get from 'lodash/get';

// Styles
import styles from './styles.module.scss';
import Image from "next/image";

export default function OurSpecialities(props) {
  const { details } = props;

  const serviceSection = [
    {
      imgUrl: '../../static/images/icons/lg/doctor.svg',
      title: 'GP',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      imgUrl: '../../static/images/icons/lg/teeth.svg',
      title: 'Dentist',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      boxStyle: 'dentist-style',
    },
    {
      imgUrl: '../../static/images/icons/lg/heart.svg',
      title: 'Cardiologist',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
  ];
  return (
    <div className={styles["our-specialities-style"]}>
      <div className={styles["title2"]}>Our Specialities</div>
      <Row gutter={15}>
        {get(details, 'specialisations').map((specialisation, index) => (
          <Col xs={24} xl={8} key={index}>
            <div className={styles["service-box"]}>
              <div className={styles["icon-box dentist-style"]}>
                <Image src="../../static/images/icons/lg/heart.svg" alt="" width={10}
          height={10}/>
              </div>
              <div className={styles["title3"]}>{get(specialisation, 'name')}</div>
              <div className={styles["description"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
