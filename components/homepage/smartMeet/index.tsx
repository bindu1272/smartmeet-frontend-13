import {Row, Col} from "antd";

// Styles
import styles from "./styles.module.scss";
import Image from "next/image";

export default function SmartMeet(props:any) {
  const cardDataList = [
    {
      imgUrl: "../../../static/images/icons/find-hospital.svg",
      cardTitle: "Find a Hospital",
      style: 'sm'
    },
    {
      imgUrl: "../../../static/images/icons/find-doctor.svg",
      cardTitle: "Find a Doctor",
      style: 'lg'
    },
    {
      imgUrl: "../../../static/images/icons/book-online.svg",
      cardTitle: "Book online Consultation",
    },
    {
      imgUrl: "../../../static/images/icons/book-person.svg",
      cardTitle: "Book in-person Consultation",
    },
    {
      imgUrl: "../../../static/images/icons/book-consultation.svg",
      cardTitle: "Book Consultation for family",
    },
  ];
  return (
    <div className={styles["smartmeet-style"]}>
      <div className={styles["header-section"]}>
        <div className={"title2" + " " + styles["title2"]}>With Smart Meet, You can</div>
      </div>

      <div className={styles["card-section"]}>
        {cardDataList.map((data:any,index:any) => (
          <div className={styles["icon-title-card"]+" "+data?.cardStyle} key={index}>
            <Image src={data?.imgUrl} className={styles["icon-image"] +" "+data?.style} alt="" width={54}
          height={80}/>
            <div className={styles["card-title"]}>{data?.cardTitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
