import { Row, Col, Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import Link from "next/link";
import Aboutlinks from "./aboutlinks";
import Image from "next/image";
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const onSearch = (value: any) => console.log(value);

// Styles
import styles from "./styles.module.scss";
import memberStyles from "../memberDetails/style.module.scss";

export default function Footer() {
  return (
    <div className={styles["footer-custom"]}>
      <Row>
        <Col xs={24} xl={8}>
          <Image
          alt=""
          width={20}
          height={20}
            src="../../../static/images/logo/logo.svg"
            className={styles["logo-image"]}
          />
          <div className={styles["description"]}>
            Be sure to take a look at our Terms of Use and Privacy Policy
          </div>
        </Col>
        <Col xs={12} xl={3}>
          <div className={styles["heading"] + " " + memberStyles["heading"]}>
            About
          </div>
          <Aboutlinks />
        </Col>
        <Col xs={12} xl={3}>
          <div className={styles["heading"] + " " + memberStyles["heading"]}>
            Company
          </div>
          <div className={styles["link-section"]}>
            <Link href="/">Privacy</Link>
            <Link href="/">Support</Link>
            <Link href="/">Help Desk</Link>
            <Link href="/">FAQ</Link>
          </div>
        </Col>
        <Col xs={24} xl={10}>
          <div className={styles["heading"] + " " + memberStyles["heading"]}>
            You can connect with us on social media
          </div>

          {/* <div className={styles["search-box">
            <Search
              placeholder="Doctors, hospital or treatment"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </div> */}

          <div className={styles["social-section"]}>
            <Link href="/">
              <Image src="../../../static/images/icons/fa-twitter.svg" alt="" width={17}
          height={14}/>
            </Link>
            <Link href="/">
              <Image src="../../../static/images/icons/fa-facebook.svg" alt="" width={17}
          height={14}/>
            </Link>
            <Link href="/">
              <Image src="../../../static/images/icons/fa-google.svg" alt="" width={17}
          height={14}/>
            </Link>
          </div>
        </Col>
      </Row>

      <div className={styles["copyright"]}>&copy; Copyright Smartmeet Inc</div>
    </div>
  );
}
