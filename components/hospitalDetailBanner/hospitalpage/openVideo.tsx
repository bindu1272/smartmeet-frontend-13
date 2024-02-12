import { Modal } from "antd";
import styles from "./styles.module.scss";
import Image from "next/image";

export default function OpenVideo({ adModal, closeAdModal, ad }: any) {
  return (
    <Modal
      open={adModal}
      visible={adModal === ad?.uuid}
      onCancel={closeAdModal}
      footer={null}
    >
      <h1>{ad?.text}</h1>

      {ad?.video?.url && (
        <video
          className={styles["media"]}
          controls
          loop
          autoPlay
          style={{ cursor: "pointer", width: "100%" }}
        >
          <source src={ad?.video?.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {ad?.image?.url && (
        <Image
          src={ad?.image?.url}
          alt="ad Image"
          className={styles["ad-image"]}
          width={10}
          height={10}
        />
      )}
    </Modal>
  );
}
