import { Row, Col } from 'antd';
import Link from 'next/link';
// Styles
import styles from './styles.module.scss';
import Image from "next/image";

export default function AppBottom(props:any) {
  return (
    <div className={styles["app-bottom-style"]}>
      <Row className={styles["row-section"]}>
        <Col xs={24} xl={10}>
          <div className={styles["content-sec"]}>
            <div className="title2">
              For faster bookings, <br /> Use Smart Meet App
            </div>
            <div className={styles["logo-section"]}>
              <Link href="">
                <Image alt=""
                width={180}
                height={52.72}
                  src="../../static/images/app-bottom/apple.svg"
                  className={styles["logo"]}
                />
              </Link>
              <Link href="">
                <Image alt=""
                width={180}
                height={53.16}
                  src="../../static/images/app-bottom/play-store.svg"
                  className={styles["logo"]}
                />
              </Link>
            </div>
          </div>
        </Col>
        <Col xs={24} xl={14}>
          <div className={styles["img-section"]}>
            <Image src="../../static/images/app-bottom/phones.svg" alt="" width={800}
          height={665.83} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
