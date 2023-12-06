import {Button} from "antd";

// Styles
import styles from './styles.module.scss';
import Image from "next/image";

export default function ButtonOutline(props) {
  return (
    <div className={styles['button-outline'] + " "+ styles[props.theme] + " " + props.className}>
      <Button onClick={props.onClick}>
        {props.title} {props.icon === true && <Image src="../../../static/images/icons/arrow-next.svg" 
          className={styles["icon-style"]}  
            alt=""
          width={10}
          height={10}/>}
      </Button>
    </div>
  );
}
