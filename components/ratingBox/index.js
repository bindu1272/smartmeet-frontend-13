"use client";
import ReactStars from 'react-rating-stars-component';

// Styles
import styles from './styles.module.scss';

export default function RatingBox(props) {
  return (
    <div className={styles["rating-box-style"]}>
      <ReactStars
        count={5}
        onChange={props.onChange}
        size={props.size || 24}
        activeColor="#FFD239"
        color="#DFDFDF"
        edit={props.edit}
        value={props.ratingValue}
        
      />
      {props.ratingText && props.ratingValue > 0 ? (
        <div className={styles["text-rating"]}>{props.ratingValue}/5 star rating</div>
      ) : null}
    </div>
  );
}
