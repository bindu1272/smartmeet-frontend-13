import { useState, useEffect } from 'react';
import styles from './style.module.scss';

const ColorPicker = ({ value, onChange }) => {
  const [color, setColor] = useState();

  useEffect(() => {
    if (value) { setColor(value); }
  }, [value])

  const ItemChecked = (e) => {
    if (onChange) {
      onChange(e.target.value)
    }
    else {
      setColor(e.target.value)
    }
  };

  return (
    <>
      <div>
        <label>
          <div className={styles["result"]} style={{ backgroundColor: color }}>
            {color ? null : '+'}
          </div>
          <input type="color" className={styles["color-picker"]} onChange={ItemChecked} />
        </label>
      </div>
    </>
  );
};

export default ColorPicker;
