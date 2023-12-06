import ForgotPassword from "@/components/auth/forgotPassword";
import { Row, Col } from "antd";
import hospitalRegistrationStyles from "../hospital-registration/styles.module.scss";
import Image from "next/image";

export default function ForgotPasswordPage() {
  return (
    <>
      <section className={hospitalRegistrationStyles["auth-container"]}>
        <Row>
          <Col className={hospitalRegistrationStyles["form-col"]} span={12}>
            <ForgotPassword />
          </Col>
          <Col span={12}>
            <div className={hospitalRegistrationStyles["color-section"]}>
              <div className={hospitalRegistrationStyles["img-box"]}>
                <div className={hospitalRegistrationStyles["img-style"]}>
                  <Image src="../../static/images/login/image1.svg" alt="" width={10}
          height={10}/>
                </div>
                <div className={hospitalRegistrationStyles["title2"]}>
                  At Your Quick Service
                </div>
                <div className={hospitalRegistrationStyles["description"]}>
                  An address for health and care
                </div>
              </div>

              <div className={hospitalRegistrationStyles["circle1"]} />
              <div className={hospitalRegistrationStyles["circle2"]} />
              <div className={hospitalRegistrationStyles["circle3"]} />
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
}
