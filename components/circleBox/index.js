// Styles
"use client";
import styles from "./styles.module.scss";
import Image from "next/image";

export default function CircleBox(props) {
  return (
    <div
      style={{
        borderColor: props.borderColor,
      }}
      className={styles["circle-box"]+" "+props.className}
    >
      <div
        className={styles["innerStyle"]}
        style={{
          borderColor: props.borderColorInner,
        }}
      >
        <Image src={props?.imgUrl} alt="" width={129}
          height={129} />
      </div>
    </div>
  );
}
