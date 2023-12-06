"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../remote/axios";
import { Select, Input } from "antd";
import { geocodeByAddress } from "react-places-autocomplete";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { geocodeByLatLng } from "react-google-places-autocomplete";
import get from "lodash/get";
import map from "lodash/map";
// Styles
import styles from "./styles.module.scss";
import Image from "next/image";

import ButtonPrimary from "../../buttons/buttonPrimary";
import { useGlobalContext } from "@/context/store";

const { Option } = Select;
const { Search } = Input;

const BookAppointement = (props: any) => {
  const [specialisations, setSpecialisations] = useState([]);
  const [cities, setCities] = useState([]);
  const {
    queryObject,
    setQueryObject,
    selectedCity,
    setSelectedCity,
    selectedLocation,
    setSelectedLocation,
  } = useGlobalContext();

  // const {
  //   queryObject,
  //   setQueryObject,
  //   selectedCity,
  //   setSelectedCity,
  //   selectedLocation,
  //   setSelectedLocation,
  // } = props;
  const router = useRouter();
  const getSpecialisations = async () => {
    const res2 = await axiosInstance.get(`specialisations`);
    setSpecialisations(get(res2, "data.data"));
  };

  const getCities = async () => {
    const res2 = await axiosInstance.get("cities");
    setCities(get(res2, "data.data"));
    if (res2) {
      setSelectedCity(res2?.data?.data?.[0]);
    }
  };

  console.log("CITIES >>>>", cities);

  function showPosition(position: any) {
    geocodeByLatLng({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    })
      .then((results) => {
        console.log("CURRENT LOCATION RESULTS ARE >>>> ", results);
        setSelectedLocation({
          label: get(results[0], "formatted_address"),
          value: results[0],
        });
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getSpecialisations();
    getCities();

    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
    };
    getCurrentLocation();
  }, []);

  const handleSpecialisation = (id: any) => {
    router.push(
      `/bookAppointment?specialisation_uuid=${id}&place_id=${get(
        selectedLocation,
        "value.place_id"
      )}&city_uuid=${get(selectedCity, "id")}`
      // {
      // pathname: '/bookAppointment',
      // query: {
      //   ...queryObject,
      //   specialisation_uuid: id,
      //   place_id: get(selectedLocation, 'value.place_id'),
      //   city_uuid: get(selectedCity, 'id'),
      // },
      // }
    );
  };

  const onSearch = () => {
    router.push(
      `/bookAppointment?place_id=${selectedLocation?.value?.place_id}&city_uuid=${selectedCity?.id}`
    );
  };

  const getGeoMetry = (details: any, geometry: any) => {
    console.log("geometry", geometry, details);
    const geo = geometry[0].geometry;
    setSelectedLocation(details);
    console.log("DETAILS >>>>>", details);
    setQueryObject({
      ...queryObject,
      lat: geo.location.lat(),
      lng: geo.location.lng(),
      place_id: details.value.place_id,
      city_uuid: get(selectedCity, "id"),
    });
  };

  const handleCity = (value: any) => {
    setSelectedCity(cities[value]);
    setQueryObject({
      ...queryObject,
      city_uuid: get(cities[value], "id"),
      place_id: get(selectedLocation, "value.place_id"),
    });
  };
  console.log("locations***", selectedLocation);

  return (
    <>
      <div className={styles["information-section"]}>
        {map(specialisations, (data: any) => (
          <div
            className={styles["icon-sec"]}
            onClick={() => handleSpecialisation(get(data, "id"))}
          >
            <Image src={data?.small_image} className={styles["icon"]} alt="" width={34}
          height={37.31} />
            <div className={styles["text"]}>{data?.name}</div>
          </div>
        ))}
      </div>
      <div
      // className={styles[{`search-box-style ${props.className}`}
      // onClick={props.onClick}
      >
        <div className={styles["search-section"]}>
          <Select
            onChange={(value) => handleCity(value)}
            value={get(selectedCity, "name")}
          >
            {map(cities, (city, i) => (
              <Option key={i} value={i}>
                {get(city, "name")}
              </Option>
            ))}
          </Select>
          <div>
            <Image 
              src="../static/images/icons/target.svg"
              alt=""
              className={styles["search_icon"]}
              width={20}
              height={21}
            />
          </div>
          <div className={styles["address-autocomplete-field"]}>
            <GooglePlacesAutocomplete
              apiKey="AIzaSyAh3h-q27PS0_U2_jInAcFhfL7wV890WQc"
              //  apiKey={process.env.REACT_APP_GOOGLE_LOCATION_KEY}
              // className={styles["search_input"]}
              autocompletionRequest={{
                location: {
                  lat: parseFloat(get(selectedCity, "lat")),
                  lng: parseFloat(get(selectedCity, "lng")),
                },

                radius: get(selectedCity, "radius"),
              }}
              selectProps={{
                value: selectedLocation,
                onChange: async (value: any) => {
                  console.log("onchange", value);
                  geocodeByPlaceId(get(value, "value.place_id"))
                    .then((results) => {
                      console.log("onchange", results);
                      getGeoMetry(value, results);
                    })
                    .catch((error) => console.log("Something went wrong"));
                },
              }}
            />
          </div>
          <ButtonPrimary title="Book Now" onClick={onSearch} />
        </div>
      </div>
    </>
  );
};
export default BookAppointement;
