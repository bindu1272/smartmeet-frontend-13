import BookAppointement from "@/components/homepage/bookAppointement";
import CircleBox from "../../circleBox";
import styles from "../bookAppointement/styles.module.scss";

export default function BookAppointementMainPage() {
  return (
    <div className={styles["book-appointement"]} id="book-appointement">
      <div className={styles["content-section"]}>
        <h1 className={styles["title1"]}>
          Book appointement for <span>you and your family</span> with qualified
          doctors online
        </h1>
        <BookAppointement />
      </div>

      <CircleBox
        borderColor="#4EC953"
        borderColorInner="#70A347"
        className={styles["circle1"] + " " + styles["circleItem"]}
        imgUrl="https://d3nn873nee648n.cloudfront.net/900x600/19397/220-SM925672.jpg"
      />
      <CircleBox
        borderColor="#FFC6C3"
        borderColorInner="#EF8883"
        className={styles["circle2"] + " " + styles["circleItem"]}
        imgUrl="https://d3nn873nee648n.cloudfront.net/900x600/19495/220-SM928630.jpg"
      />
      <CircleBox
        borderColor="#F5D0C8"
        borderColorInner="#F24291"
        className={styles["circle3"] + " " + styles["circleItem"]}
        imgUrl="https://d3nn873nee648n.cloudfront.net/900x600/19495/220-SM928630.jpg"
      />
      <CircleBox
        borderColor="#4EC953"
        borderColorInner="#70A347"
        className={styles["circle4"] + " " + styles["circleItem"]}
        imgUrl="https://d3nn873nee648n.cloudfront.net/900x600/19397/220-SM925672.jpg"
      />
    </div>
  );
}
