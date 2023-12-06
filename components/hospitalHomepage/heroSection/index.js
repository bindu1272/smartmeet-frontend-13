import ButtonPrimary from '../../buttons/buttonPrimary';
import { get } from 'lodash';

import { Row, Col } from 'antd';
import Image from "next/image";

// Styles
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';

export default function HeroSection(props) {
  const { details } = props;

  const router = useRouter();
  const goToHospital = () => {
    router.push('/hospital/' + get(details, 'id'));
  };
  return (
    <div className={styles["hero-section-style"]}>
      <Row className={styles["gutter-space"]}>
        <Col xs={24} xl={14}>
          <div className={styles["content-section"]}>
            <div className={styles["title1"]}>{get(details, 'name')}</div>
            <div className={styles["description"]}>{get(details, 'description')}</div>
            <div className={styles["btn-section"]}>
              <ButtonPrimary
                style={{
                  backgroundColor: `${get(details, 'brand_color.primary')}b3`,
                }}
                title="Book appointment"
                onClick={goToHospital}
              />
            </div>
          </div>
        </Col>
        <Col xs={24} xl={10}>
          <div className={styles["image-style"]}>
            {/* <img src={"../../static/images/shapes/union.svg"} /> */}
            <Image src={get(details, 'banner')} className={styles["banner-image"]} alt="" width={10}
          height={10}/>
          </div>
          <div
            className={styles["right-image-section"]}
            style={{ backgroundColor: get(details, 'brand_color.secondary') }}
          />
        </Col>
      </Row>
    </div>
  );
}
