import { Modal } from 'antd';

// styles
import styles from './styles.module.scss';

export default function ModalPrimary(props) {
  return (
    <Modal
      destroyOnClose
      title={props.title}
      visible={props.visible}
      onOk={props.onOk}
      closable={props.closable}
      maskClosable={false}
      onCancel={props.onCancel}
      footer={null}
      className={styles["modal-primary-style"]+" "+ props.modalStyle}
    >
      {props.children}
    </Modal>
  );
}
