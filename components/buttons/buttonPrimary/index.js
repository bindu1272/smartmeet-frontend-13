import { Button } from 'antd';
import get from 'lodash/get';

// Styles
import styles from './styles.module.scss';
import Image from "next/image";

export default function ButtonPrimary(props) {
  return (
    <div className={styles['button-primary'] + " " + styles[props.theme] + " " + props.className}>
      <Button
        type="primary"
        style={props.style}
        onClick={props.onClick}
        disabled={props.disabled}
        htmlType={get(props, 'htmlType') ? get(props, 'htmlType') : null}
      >
        {props.title}{' '}
        {props.icon === true && (
          <Image alt="" width={10} height={10}
            src="../../../static/images/icons/arrow-next.svg"
            className={styles["icon-style"]}
          />
        )}
      </Button>
    </div>
  );
}
