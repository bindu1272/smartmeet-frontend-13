import {  Modal } from "antd";
import styles from "./styles.module.scss";
// import { Media, Player, controls } from "react-media-player";
import Image from "next/image";
// const { PlayPause, MuteUnmute } = controls;

export default function openVideo({adModal,closeAdModal,ad}:any) {
  return (
    <Modal
      open={adModal}
      visible={adModal === ad?.uuid}
      onCancel={closeAdModal}
      footer={null}
    >
      <h1>{ad?.text}</h1>
      {/* <Media>
        <div className={styles["media"]} style={{ cursor: "pointer" }}>
          <div className={styles["media-player"]}>
            <Player src={ad?.video?.url} loop={true} autoPlay={true} />
          </div>
          <div className={styles["media-controls"]}>
            <PlayPause />
            <MuteUnmute />
          </div>
        </div>
      </Media> */}
      <Image src={ad?.image?.url} alt="ad Image" className={styles["ad-image"]} width={10}
          height={10}/>
    </Modal>
  );
}
