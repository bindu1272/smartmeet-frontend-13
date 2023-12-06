import {Row, Col} from "antd";

// Styles
import  styles from "./styles.module.scss";
import Image from "next/image";

export default function HowWorks(props:any) {
  const cardDataList = [
    {
      number: "01",
      title: "Select hospital &location",
      imgUrl: "../../../static/images/icons/hospital.svg",
    },
    {
      number: "02",
      title: "Choose doctor and preferred slot",
      imgUrl: "../../../static/images/icons/doctor.svg",
    },
    {
      number: "03",
      title: "Add your details and verify",
      imgUrl: "../../../static/images/icons/details-verified.svg",
    },
    {
      number: "04",
      title: "Booking done",
      imgUrl: "../../../static/images/icons/booking-done.svg",
      style: 'lg'
    },
  ];
  return (
    <div className={styles["how-works-style"]} id="howWorks">
      <div className={"title2" + " " +  styles["title2"]}>How it works</div>

      <div className={styles["card-section"]}>
        <Row className={styles["gutter-space"]}>
          {cardDataList.map((data,index) => (
            <Col xs={24} xl={6} className="col-card" key={index}>
              <div className={styles["card-custom"]}>
                <div>
                  <div className={styles["number"]}>{data.number}</div>
                  <div className={styles["title"]}>{data.title}</div>
                </div>
                <div className={styles["icon"]}>
                  <Image src={data.imgUrl} className={styles["icon-image"]+" "+data.style} alt="" width={50}
          height={48}/>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
