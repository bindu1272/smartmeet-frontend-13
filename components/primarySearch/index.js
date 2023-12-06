"use client";
import { Select, Input } from 'antd';
import { useState, useEffect } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

const { Option } = Select;
const { Search } = Input;

// Styles
import styles from './styles.module.scss';

export default function PrimarySearch(props) {
  const [opened, setOpened] = useState(false);
  const [address, setAddress] = useState('');
  let google = {};

  const onSearch = (value) => {
    props.searchQuery(value);
    // prop.onClick();
  };

  useEffect(() => {
    google = window.google = window.google ? window.google : {};
  }, []);

  const handleAddressSelect = async (value) => {
    const results = await geocodeByAddress(value);
    setAddress(value);
  };

  return (
    <div
      className={styles[`search-box-style ${props.className}`]}
      // onClick={props.onClick}
    >
      <div className={styles["search-section"]}>
        <Select
          showSearch
          placeholder="Location"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          <Option value="1">Not Identified</Option>
          <Option value="2">Closed</Option>
          <Option value="3">Communicated</Option>
          <Option value="4">Identified</Option>
          <Option value="5">Resolved</Option>
          <Option value="6">Cancelled</Option>
        </Select>

        <Search
          placeholder="Doctor, specialty, hospital or treatment"
          allowClear
          enterButton={props.searchBtnText}
          size="large"
          onSearch={onSearch}
        />
      </div>
    </div>
  );
}
