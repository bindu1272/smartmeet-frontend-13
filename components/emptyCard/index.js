// styles
import styles from "./styles.module.scss";
import Image from "next/image";

export default function EmptyCard(props) {
  return (
    <div className={styles["empty-card-style"]}>
      <Image alt="" src="../../static/images/icons/notfound.svg" className={styles["image-style"]} width={10}
          height={10}/>
      <div className={styles["content"]}>{props.description}</div>
    </div>
  );
}
