import { Alert, Tag } from 'antd';
import get from 'lodash/get';
import map from 'lodash/map';
import { useState } from 'react';
import ButtonPrimary from '../../buttons/buttonPrimary';
import SelectableTag from '../../selectableTag';
// import noDataImage from '../../../static/images/icons/data.svg';

// Styles
import styles from './styles.module.scss';
import Image from "next/image";
const { CheckableTag } = Tag;

export default function TimeSlot(props) {
  const { slots, date, onClickConsult } = props;
  const [selectedSlot, setSelectedSlot] = useState(null);

  // console.log('Slots>>>', slots);

  return (
    <div className={styles["timeslot-style"]}>
      {!props.noData ? (
        <div className={styles["data-section"]}>
          {get(slots[0], 'time', []).length > 0 && (
            <div className={styles["slot-section"]}>
              <div className={styles["title5"]}>Morning Slots</div>
              <div className={styles["slot-item"]}>
                <div className={styles["selectable-tag"]}>
                  {map(get(slots[0], 'time', []), (tag, i) => (
                    <CheckableTag
                      className={styles["single-tag"]}
                      key={i}
                      checked={selectedSlot === get(tag, 'id')}
                      onChange={(checked) =>
                        checked
                          ? setSelectedSlot(get(tag, 'id'))
                          : setSelectedSlot(null)
                      }
                    >
                      {get(tag, 'slot_start')}
                    </CheckableTag>
                  ))}
                </div>
              </div>
            </div>
          )}

          {get(slots[1], 'time', []).length > 0 && (
            <div className={styles["slot-section"]}>
              <div className={styles["title5"]}>Afternoon Slots</div>
              <div className={styles["slot-item"]}>
                <div className={styles["selectable-tag"]}>
                  {map(get(slots[1], 'time', []), (tag, i) => (
                    <CheckableTag
                      className={styles["single-tag"]}
                      key={i}
                      checked={selectedSlot === get(tag, 'id')}
                      onChange={(checked) =>
                        checked
                          ? setSelectedSlot(get(tag, 'id'))
                          : setSelectedSlot(null)
                      }
                    >
                      {get(tag, 'slot_start')}
                    </CheckableTag>
                  ))}
                </div>
              </div>
            </div>
          )}

          {get(slots[2], 'time', []).length > 0 && (
            <div className={styles["slot-section"]}>
              <div className={styles["title5"]}>Evening Slots</div>
              <div className={styles["slot-item"]}>
                <div className={styles["selectable-tag"]}>
                  {map(get(slots[2], 'time', []), (tag, i) => (
                    <CheckableTag
                      className={styles["single-tag"]}
                      key={i}
                      checked={selectedSlot === get(tag, 'id')}
                      onChange={(checked) =>
                        checked
                          ? setSelectedSlot(get(tag, 'id'))
                          : setSelectedSlot(null)
                      }
                    >
                      {get(tag, 'slot_start')}
                    </CheckableTag>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className={styles["button-section"]}>
            <ButtonPrimary
              disabled={selectedSlot ? false : true}
              title="Consult Now"
              onClick={() => onClickConsult({ slot_id: selectedSlot, date })}
            />
          </div>
        </div>
      ) : (
        <div className={styles["nodata-section"]}>
          <Image src="../../../static/images/icons/data.svg" alt="" width={10}
          height={10} />
          <Alert
            message="Check other dates for appointments"
            type="warning"
            showIcon
          />
        </div>
      )}
    </div>
  );
}
