import {Row, Col} from "antd";

// Styles
import styles from "./styles.module.scss";
import Image from "next/image";

export default function OurPartnerships(props:any) {
  const cardDataList = [
    {
      imgUrl: "../../../static/images/clients/max.svg",
    },
    {
      imgUrl: "../../../static/images/clients/apollo.svg",
      cardStyle: "sm",
    },
    {
      imgUrl: "../../../static/images/clients/fortis.svg",
    },
    {
      imgUrl: "../../../static/images/clients/blk.svg",
    },
    {
      imgUrl: "../../../static/images/clients/artemis.svg",
    },
  ];
  return (
    <div className={styles["our-partnerships-style"]}>
      <div className={"header-section"}>
        <div className={"title2" + " " + styles["title2"]}>Our Partnerships</div>
        <div className={"description" + " " + styles["description"]}>
          We have partnered with the best hospitals and doctors in Australia to
          provide you the best healthcare.
        </div>
      </div>

      <div className={styles["client-section"]}>
          {cardDataList.map((data:any,index:any) => (
            <div className={styles["logo-card"]+" "+data.cardStyle} key={index}>
              <Image src={data.imgUrl} className={styles["icon-image"]+" "+ data?.style} alt="" width={10}
          height={10}/>
            </div>
          ))}
      </div>
    </div>
  );
}
