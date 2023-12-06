import map from 'lodash/map';
import get from 'lodash/get';
import styles from './style.module.scss';

const SelectSlot = ({ slots, setNewSlot, newSlot }) => {
  const handleClick = (id) => {
    setNewSlot(id);
  };
  return (
    <div className={styles["slot-time"]}>
      {map(slots, (slot) => (
        <div
          className={styles["single-time"]}
          onClick={() => handleClick(get(slot, 'id'))}
          style={
            newSlot === get(slot, 'id')
              ? {
                  backgroundColor: '#532eb3',
                  color: 'white',
                }
              : null
          }
        >
          {get(slot, 'slot_start')}
        </div>
      ))}
    </div>
  );
};

export default SelectSlot;
