import {Select, Input } from "antd";
import assign from "lodash/assign";
import filter from "lodash/filter";
import { getUrl } from "@/utilities/helpers";

const { Option } = Select;

const { Search } = Input;

import { axiosInstance } from "@/remote/axios";

// styles
import { get, includes } from "lodash";
import BookAppointmentPage from "@/components/homepage/bookAppointementPage";

export default async function BookAppointment(props:any) {
  console.log("props",props);

  let hospitals: any = [];
  let doctors: any = [];
  let selectedSpecialisation: any = null;
  let selectedGenders: any = null;
  let selectedPractices: any = null;
  let selectedCity: any = null;
  let selectedSort: any = null;
  let selectedLocation: any = null;

  const contextQuery = props?.searchParams;
  console.log("contextQuery",contextQuery);

  const queryObj = {};
  if ("city_uuid" in contextQuery) {
    assign(queryObj, {
      city_uuid: get(contextQuery, "city_uuid"),
    });
  }

  if ("specialisation_uuid" in contextQuery) {
    assign(queryObj, {
      specialisation_uuid: get(contextQuery, "specialisation_uuid"),
    });
  }
  if ("gender" in contextQuery) {
    assign(queryObj, {
      gender: get(contextQuery, "gender"),
    });
  }
  if ("sort" in contextQuery) {
    assign(queryObj, {
      sort: get(contextQuery, "sort"),
    });
  }
  if ("lat" in contextQuery && "lng" in contextQuery) {
    assign(queryObj, {
      lat: get(contextQuery, "lat"),
    });
    assign(queryObj, {
      lng: get(contextQuery, "lng"),
    });
    assign(queryObj, {
      place_id: get(contextQuery, "place_id"),
    });
  }

  const res = await axiosInstance.get(getUrl("test", queryObj));

  doctors = get(res, "data.data.doctors");
  hospitals = get(res, "data.data.hospitals", []);

  const res2 = await axiosInstance.get(`specialisations`);
  let specialisations = get(res2, "data.data");

  const res3 = await axiosInstance.get("cities");
  let cityOptions = get(res3, "data.data");

  let genderOptions = [
    { id: "M", name: "Male" },
    { id: "F", name: "Female" },
  ];
  let practiceOptions = [
    { id: "d", name: "Doctors" },
    { id: "h", name: "Hospitals" },
  ];
  let sortOptions = [
    { id: "distance", name: "Distance" },
    { id: "ratings", name: "Ratings" },
  ];

  let specsUuidArr = get(contextQuery, "specialisation_uuid", "").split(",");
  let genderArr = get(contextQuery, "gender", "").split(",");
  let practiceArr = get(contextQuery, "practice", "").split(",");

  selectedSpecialisation = filter(specialisations, (spec: any) => {
    return includes(specsUuidArr, get(spec, "id"));
  });

  selectedGenders = filter(genderOptions, (gender: any) => {
    return includes(genderArr, get(gender, "id"));
  });

  selectedPractices = filter(practiceOptions, (practice: any) => {
    return includes(practiceArr, get(practice, "id"));
  });

  selectedCity = cityOptions.find(
    (city: any) => city.id === get(contextQuery, "city_uuid")
  );

  selectedSort = get(contextQuery, "sort", null);
  selectedLocation = {
    lat: get(contextQuery, "lat", null),
    lng: get(contextQuery, "lng", null),
    place_id: get(contextQuery, "place_id", null),
  };


  console.log(
    "specialisations",
    specialisations,
    doctors,
    practiceOptions,
    genderOptions
  );

  return (
    <BookAppointmentPage
    selectedCity = {selectedCity}
    cityOptions = {cityOptions}
    specialisations = {specialisations}
    practiceOptions = {practiceOptions}
    selectedPractices = {selectedPractices}
    selectedSort = {selectedSort}
    genderOptions = {genderOptions}
    hospitals = {hospitals}
    doctors = {doctors}
    selectedSpecialisation = {selectedSpecialisation}
    selectedLocation = {selectedLocation}
    selectedGenders = {selectedGenders}
    sortOptions = {sortOptions}
    />
  )
}

