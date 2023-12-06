import { CloseOutlined } from '@ant-design/icons';

// styles
import styles from './styles.module.scss';
import Image from "next/image";

export default function SuccessContent(props) {
  return (
    <div className={styles["success-section"]}>
      {!props.hideClose && (
        <button className={styles["close-button"]} onClick={props.closeModal}>
          <CloseOutlined />
        </button>
      )}
      <div className={styles["verify-successfully"]}>
        <Image src="../../../static/images/icons/verify.svg" alt="" width={10}
          height={10}/>
        <div className={styles["modal-gradient-title"]}>{props.title}</div>
      </div>
    </div>
  );
}
