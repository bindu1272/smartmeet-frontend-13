import { Row, Col } from 'antd';
import SimpleMap from '../../simpleMap';
import get from 'lodash/get';
// Styles
import styles from './styles.module.scss';
import { getAddress } from '../../../utilities/helpers';

export default function ContactDetails(props) {
  const { details } = props;

  return (
    <div className={styles["contact-details-style"]}>
      <div className={styles["header-section"]}>
        <div className={styles["title2"]}>Contact Us</div>
      </div>

      <div className={styles["map-section"]}>
        <SimpleMap />
      </div>

      <div className={styles["address-section"]}>
        <Row gutter={50}>
          <Col xs={24} xl={12}>
            <div className={styles["detail-box border-first"]}>
              <div className={styles["item"]}>
                <div className={styles["title"]}>Address: </div>
                <div className={styles["description"]}>{getAddress(details)}</div>
              </div>

              <div className={styles["item info"]}>
                <div className={styles["title"]}>Phone No:</div>

                <div className={styles["subtext"]}>
                  +{get(details, 'contact_code')}{' '}
                  {get(details, 'contact_number')}
                </div>
              </div>

              <div className={styles["item info"]}>
                <div className={styles["title"]}>Email:</div>

                <div className={styles["subtext"]}>{get(details, 'admin.email')}</div>
              </div>
            </div>
          </Col>
          <Col xs={24} xl={12}></Col>
        </Row>
      </div>
    </div>
  );
}
