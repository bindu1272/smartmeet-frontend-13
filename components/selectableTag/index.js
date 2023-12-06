import React from 'react';
import { Tag } from 'antd';
import get from 'lodash/get';
import map from 'lodash/map';

const { CheckableTag } = Tag;

// Styles
import styles from './styles.module.scss';

const SelectableTag = (props) => {
  // state = {
  //   selectedTags: ['Books'],
  // };
  const tagData = get(props, 'tagsData', []);

  // handleChange(tag, checked) {
  //   const { selectedTags } = this.state;
  //   const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
  //   this.setState({ selectedTags: nextSelectedTags });
  // }
  let tag = [];
  return (
    <div className={styles["selectable-tag"]}>
      {map(tagData, (tag, i) => (
        <CheckableTag
          key={i}
          onChange={(checked) => this.handleChange(tag, checked)}
        >
          {get(tag, 'slot_start')}
        </CheckableTag>
      ))}
    </div>
  );
};

export default SelectableTag;
