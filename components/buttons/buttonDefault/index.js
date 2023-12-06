import { Button } from 'antd';

// Styles
import styles from './styles.module.scss';
import Image from "next/image";

export default function ButtonDefault(props) {
  return (
    <div className={styles["button-default"]}>
      <Button onClick={props.onClick}>
        {props.title}{' '}
        {props.icon === true && (
          <Image alt=""
          width={10}
          height={10}
            src="../../../static/images/icons/arrow-next.svg"
            className={styles["icon-style"]}
          />
        )}
      </Button>
    </div>
  );
}
