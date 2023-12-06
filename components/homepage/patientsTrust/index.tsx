// Styles
import styles from "./styles.module.scss";
import Image from "next/image";

export default function PatientsTrust(props:any) {
  const counterData = [
    {
      number: "200+",
      infoText: "Hospitals",
      iconUrl: "../../../static/images/icons/plus.svg",
    },
    {
      number: "1200+",
      infoText: "Doctors",
      iconUrl: "../../../static/images/icons/patients.svg",
    },
    {
      number: "5000+",
      infoText: "Happy Patients",
      iconUrl: "../../../static/images/icons/happy-doctor.svg",
    },
  ];
  return (
    <div className={styles["patients-trust-style"]}>
      <div className={styles["header-section"]}>
        <div className={"title2" + " " + styles["title2"]}>Patients Trust Us</div>
      </div>

      <div className={styles["counter-card"]}>
        {counterData.map((data:any,index:any) => (
          <div className={styles["counter-item"]} key={index}>
            <div className={styles["icon"]}>
              <Image src={data?.iconUrl} alt="" width={24}
          height={25}/>
            </div>
            <div className={styles["text"]}>
              <div className={styles["title"]}>{data?.number}</div>
              <div className={styles["text-sm"]}>{data?.infoText}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
