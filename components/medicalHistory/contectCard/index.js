import { Upload, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ButtonPrimary from '../../buttons/buttonPrimary';
import map from 'lodash/map';
import get from 'lodash/get';
import Image from "next/image";

const fileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];

// Styles
import styles from './styles.module.scss';

export default function ContectCard({ notes, attachments, handleDownload }) {
  return (
    // <div className={styles[{`content-component ${props.headerStyle}`}>
    <div className={styles["content-component"]}>
      <>
        {map(notes, (note) => (
          <div className={styles["list-section"]}>
            <div className={styles["title"]}>{get(note, 'heading')}</div>
            <div className={styles["card"]}>
              <ul>
                {map(get(note, 'note').split('\n'), (point) => (
                  <li>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </>

      <div className={styles["upload-section"]+" "+styles["mb--50"]}>
        {attachments.length > 0 && (
          <>
            <div className={styles["attachment"]}>
              <Image alt="" width={15} height={15}
                src="../../../static/images/icons/attachment.svg"
                className={styles["icon-style"]+" " +"mr--10"}
              />{' '}
              Attachment
            </div>
            {map(attachments, (singleAttachment) => (
              <div className={styles["upload"]+" "+"mt--20"}>
                <div className={styles["title-info"]}>
                  {get(singleAttachment, 'title')}
                </div>
                <br />
                <div style={{marginBottom: "8px"}}>
                  {map(get(singleAttachment, 'images'), (image) => (
                    <Image src={get(image, 'image_url')} width={120} height={100} alt="" style={{marginRight:"8px"}}/>
                  ))}
                  </div>
              </div>
            ))}
          </>
        )}

        {/* <div className={styles["upload mt--20">
          <div className={styles["title-info">X-ray Reports</div>
          <div className={styles["upload-action mb--30">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              defaultFileList={[...fileList]}
              className={styles["upload-list-inline"
            >
              <Button type="primary" icon={<PlusOutlined />}>
                Upload
              </Button>
            </Upload>
          </div>

          <div className={styles["title-info">Blood Report</div>
        </div> */}
      </div>

      <ButtonPrimary title="Download" onClick={handleDownload} />
    </div>
  );
}
