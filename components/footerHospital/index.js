import { Row, Col, Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import Link from "next/link";
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

const onSearch = (value) => console.log(value);

// Styles
import styles from "./styles.module.scss";

export default function FooterHospital(props) {
  return (
    <div className={styles["footer-hospital-style"]+ " "+props.className} style={props.style}>
      <Row>
        <Col xs={24} xl={8}>
          <Image src={props?.logoUrl} className={styles["logo-image"]} alt="" width={10} height={10}/>
          <div className={styles["description"]}>
            Be sure to take a look at our Terms of Use and Privacy Policy
          </div>
        </Col>
        <Col xs={12} xl={3}>
          <div className={styles["heading"]}>About</div>
          <div className={styles["link-section"]}>
            <Link href="/">About Us</Link>
            <Link href="/">Blog</Link>
            <Link href="/">Team</Link>
            <Link href="/">Contact</Link>
          </div>
        </Col>
        <Col xs={12} xl={3}>
          <div className={styles["heading"]}>Company</div>
          <div className={styles["link-section"]}>
            <Link href="/">Privacy</Link>
            <Link href="/">Support</Link>
            <Link href="/">Help Desk</Link>
            <Link href="/">FAQ</Link>
          </div>
        </Col>
        <Col xs={24} xl={10}>
          <div className={styles["heading"]}>
            Search for doctor, hospital or treatment
          </div>

          <div className={styles["search-box"]}>
            <Search
              placeholder="Doctors, hospital or treatment"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </div>

          <div className={styles["social-section"]}>
            <Link href="/">
                <Image src="../../static/images/icons/fa-twitter.svg" alt="" width={10}
          height={10}/>
            </Link>
            <Link href="/">
                <Image src="../../static/images/icons/fa-facebook.svg" alt="" width={10}
          height={10}/>
            </Link>
            <Link href="/">
                <Image src="../../static/images/icons/fa-google.svg" alt="" width={10}
          height={10}/>
            </Link>
          </div>
        </Col>
      </Row>

      <div className={styles["copyright"]}>Copyright2021 MaxHospital_Redien.Design</div>
    </div>
  );
}
