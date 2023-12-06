"use client";
import { useState, useEffect, useCallback } from "react";
import { Row, Col, Select, Tag, Card, Spin, Empty, Input } from "antd";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import ButtonPrimary from "@/components/buttons/buttonPrimary";
import CheckList from "@/components/checkList";
import map from "lodash/map";
import DoctorsList from "@/components/doctorsList";
import assign from "lodash/assign";
import filter from "lodash/filter";
import filterArr from "lodash/filter";
import { getUrl } from "@/utilities/helpers";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const { Option } = Select;

const { Search } = Input;


// styles
import styles from "./styles.module.scss";
import primaryStyles from "@/components/primarySearch/styles.module.scss";
import { get, includes } from "lodash";

export default function BookAppointmentPage({
  selectedCity,
  cityOptions,
  specialisations,
  practiceOptions,
  selectedPractices,
  selectedSort,
  genderOptions,
  hospitals,
  doctors,
  selectedSpecialisation,
  selectedLocation,
  selectedGenders,
  sortOptions,
}: any) {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  function preventDefault(e: any) {
    e.preventDefault();
    console.log("Clicked! But prevent default.");
  }
  const router = useRouter();
  const [isOpened, setIsOpened] = useState(false);

  const goToHospital = (id: any) => {
    router.push("/hospital/" + id);
  };

  const [hospitalList, setHospitalList] = useState({
    hospitals: hospitals,
    filterHospitals: hospitals,
  });
  const [doctorsList, setDoctorsList] = useState({
    doctors: doctors,
    filterDoctors: doctors,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [inputAddress, setInputAddress] = useState<any>({
    label: "",
    value: "",
  });

  const [filter, setFilter]: any = useState({
    specialisations:
      selectedSpecialisation?.length > 0 ? [selectedSpecialisation] : null,
    gender: selectedGenders?.length > 0 ? [selectedGenders] : null,
    practice: selectedPractices?.length > 0 ? [selectedPractices] : null,
    city: selectedCity,
    sort: selectedSort,
    location: selectedLocation,
  });

  useEffect(() => {
    setFilter({
      specialisations: selectedSpecialisation,
      gender: selectedGenders,
      practice: selectedPractices,
      city: selectedCity,
      sort: selectedSort,
      location: selectedLocation,
    });
    setDoctorsList({ doctors: doctors, filterDoctors: doctors });
    setHospitalList({ hospitals: hospitals, filterHospitals: hospitals });
  }, [
    selectedSpecialisation,
    selectedGenders,
    selectedPractices,
    selectedCity,
    selectedLocation,
  ]);
  const [loading, setLoading] = useState(false);

  function toggle() {
    setIsOpened((isOpened: any) => !isOpened);
  }

  useEffect(() => {
    geocodeByPlaceId(get(selectedLocation, "place_id"))
      .then((results) => {
        setInputAddress({
          label: get(results[0], "formatted_address"),
          value: results[0],
        });
        console.log(results[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  // const removeQueryParam = (removeKey: any) => {
  //   let queryString = "";
  //   const params: any = new URLSearchParams(searchParams);
  //   for (const [key, value] of params) {
  //     if (key != removeKey) {
  //       queryString += key + "=" + value + "&";
  //     }
  //   }
  //   router.replace(pathName + "?" + queryString);
  // };

  const setNewRoute = (newFilterObj: any) => {
    console.log("file", newFilterObj);
    const specFilter = get(newFilterObj, "specialisations", "").join(",");
    const genderFilter = get(newFilterObj, "gender", "").join(",");
    const practiceFilter = get(newFilterObj, "practice", "").join(",");

    let queryObj: any = {};
    let pathname = "/bookAppointment";
    if (specFilter) {
      assign(queryObj, {
        specialisation_uuid: specFilter,
      });
      // assign(queryObj, {
      //   lat: get("specialisation_uuid", specFilter),
      // });
      // searchParams.set("specialisation_uuid",specFilter);
    }
    if (genderFilter) {
      assign(queryObj, {
        gender: genderFilter,
      });
    }

    if (practiceFilter) {
      assign(queryObj, {
        practice: practiceFilter,
      });
    }
    if (newFilterObj.location.lat && newFilterObj.location.lat != undefined) {
      assign(queryObj, {
        lat: get(newFilterObj, "location.lat"),
      });
      assign(queryObj, {
        lng: get(newFilterObj, "location.lng"),
      });
      assign(queryObj, {
        place_id: get(newFilterObj, "location.place_id"),
      });
    }

    if (newFilterObj.sort) {
      assign(queryObj, {
        sort: get(newFilterObj, "sort"),
      });
    }

    assign(queryObj, {
      city_uuid: get(newFilterObj, "city.id"),
    });

    // if (searchParams.has("place_id")) {
    //   removeQueryParam("place_id");
    // }

    const paramString = Object.keys(queryObj)
      .map((key: any) => `${key}=${decodeURIComponent(queryObj[key])}`)
      .join("&");

    router.push(`/bookAppointment?${paramString}`, { scroll: false });
  };

  const getData = (
    specialisations: any,
    gender: any,
    practice: any,
    city: any,
    sort: any,
    location: any
  ) => {
    setNewRoute({
      practice,
      specialisations: specialisations,
      gender,
      city,
      sort,
      location,
    });
  };

  const onSpecialisationChange = (values: any) => {
    getData(
      values,
      map(get(filter, "gender"), "id"),
      map(get(filter, "practice"), "id"),
      get(filter, "city"),
      get(filter, "sort"),
      get(filter, "location")
    );
  };

  const onGenderChange = (values: any) => {
    getData(
      map(get(filter, "specialisations"), "id"),
      values,
      map(get(filter, "practice"), "id"),
      get(filter, "city"),
      get(filter, "sort"),
      get(filter, "location")
    );
  };
  const onPracticeChange = (values: any) => {
    let newValues = values;

    if (values.length > 0) {
      newValues = filterArr(values, (value: any) => {
        return !includes(map(selectedPractices, "id"), value);
      });
    }

    getData(
      map(get(filter, "specialisations"), "id"),
      map(get(filter, "gender"), "id"),
      newValues,
      get(filter, "city"),
      get(filter, "sort"),
      get(filter, "location")
    );
  };

  const removeSpecialisation = (removeId: any) => {
    const newSpecialisations = get(filter, "specialisations").filter(
      (specialisation: any) => get(specialisation, "id") !== removeId
    );
    getData(
      map(newSpecialisations, (spec: any) => get(spec, "id")),
      map(get(filter, "gender"), "id"),
      map(get(filter, "practice"), "id"),
      get(filter, "city"),
      get(filter, "sort"),
      get(filter, "location")
    );
  };

  const removeGender = (removeId: any) => {
    const newGender = get(filter, "gender").filter(
      (gender: any) => get(gender, "id") !== removeId
    );
    getData(
      map(get(filter, "specialisations"), "id"),
      map(newGender, (gender: any) => get(gender, "id")),
      map(get(filter, "practice"), "id"),
      get(filter, "city"),
      get(filter, "sort"),
      get(filter, "location")
    );
  };

  const removePractice = (removeId: any) => {
    const newPractice = get(filter, "practice").filter(
      (p: any) => get(p, "id") !== removeId
    );
    getData(
      map(get(filter, "specialisations"), "id"),
      map(get(filter, "gender"), "id"),
      map(newPractice, "id"),
      get(filter, "city"),
      get(filter, "sort"),
      get(filter, "location")
    );
  };

  const handleBookNow = async () => {
    getData(
      map(get(filter, "specialisations"), "id"),
      map(get(filter, "gender"), "id"),
      map(get(filter, "practice"), "id"),
      get(filter, "city"),
      get(filter, "sort"),
      get(filter, "location")
    );
  };

  const getGeoMetry = (details: any, geometry: any) => {
    setInputAddress(details);

    const geo = geometry[0].geometry;
    const value = {
      lat: geo.location.lat(),
      lng: geo.location.lng(),
      place_id: details.value.place_id,
    };
    setFilter({ ...filter, location: value });
  };

  const onSearch = (value: any) => {
    let filterHospitals = filterArr(
      get(hospitalList, "hospitals"),
      (data: any) => {
        return includes(get(data, "name").toLowerCase(), value.toLowerCase());
      }
    );
    let filterDoctors = filterArr(get(doctorsList, "doctors"), (data: any) => {
      return includes(
        get(data, "doctor.name").toLowerCase(),
        value.toLowerCase()
      );
    });

    setDoctorsList({
      doctors: get(doctorsList, "doctors"),
      filterDoctors: filterDoctors,
    });
    setHospitalList({
      hospitals: get(hospitalList, "hospitals"),
      filterHospitals: filterHospitals,
    });
  };

  return (
    <div className={styles["book-appointment"]}>
      <div className={styles["serach-section"]}>
        <div className={primaryStyles["search-box-style"]}>
          <div className={primaryStyles["search-section"]}>
            <Select
              onChange={(value) =>
                getData(
                  map(get(filter, "specialisations"), "id"),
                  map(get(filter, "gender"), "id"),
                  map(get(filter, "practice"), "id"),
                  cityOptions[value],
                  get(filter, "sort"),
                  get(filter, "location")
                )
              }
              value={get(selectedCity, "name")}
            >
              {map(cityOptions, (city: any, i: any) => (
                <Option key={i} value={i}>
                  {get(city, "name")}
                </Option>
              ))}
            </Select>

            <Image
              src="../static/images/icons/target.svg"
              alt=""
              className={styles["search_icon"]}
              width={10}
              height={10}
            />
            <div className={styles["address-autocomplete-field"]}>
              <GooglePlacesAutocomplete
                // className={styles["search_input"]}
                apiKey="AIzaSyAh3h-q27PS0_U2_jInAcFhfL7wV890WQc"
                autocompletionRequest={{
                  location: {
                    lat: parseFloat(get(selectedCity, "lat")),
                    lng: parseFloat(get(selectedCity, "lng")),
                  },

                  radius: get(selectedCity, "radius"),
                }}
                selectProps={{
                  value: inputAddress,

                  onChange: (value: any) => {
                    console.log("VALUES>>>", value);
                    geocodeByPlaceId(get(value, "value.place_id"))
                      .then((results) => getGeoMetry(value, results))
                      .catch((error) => console.log("Something went wrong"));
                  },
                }}
              />
            </div>
            <ButtonPrimary title="Book Now" onClick={handleBookNow} />
          </div>
        </div>
      </div>

      <button
        className={styles["filter-toggle"]}
        type="button"
        onClick={toggle}
      >
        <Image src="/../../static/images/icons/filter.png" alt="" width={10}
              height={10}/>
      </button>

      <div
        className={
          styles["selection-section"] +
          " " +
          `${isOpened === true ? styles["filter-active"] : ""}`
        }
      >
        <Row>
          <Col xs={24} xl={5}>
            <div
              className={
                styles["border-right"] + " " + styles["filter-section"]
              }
            >
              <CheckList
                options={specialisations}
                title="Speciality"
                onChange={onSpecialisationChange}
                searchActive={false}
                value={map(
                  get(filter, "specialisations"),
                  (specialisation: any) => get(specialisation, "id")
                )}
              />
              <CheckList
                options={practiceOptions}
                title="Practice"
                searchActive={false}
                onChange={onPracticeChange}
                value={map(get(filter, "practice"), (prac: any) =>
                  get(prac, "id")
                )}
              />
              <CheckList
                options={genderOptions}
                onChange={onGenderChange}
                title="Gender"
                searchActive={false}
                value={map(get(filter, "gender"), (gen: any) => get(gen, "id"))}
              />

              <div className={styles["filter-btn-section"]}>
                <button className={styles["btn-close"]} onClick={toggle}>
                  Close
                </button>
                <button className={styles["btn-filter"]}>Apply Filter</button>
              </div>
            </div>
          </Col>

          <Col xs={24} xl={19}>
            <div className={styles["content-section"]}>
              <Row>
                <Col xs={24} xl={17}>
                  <div className={styles["tag-section"] + " " + "tag-section"}>
                    {map(
                      get(filter, "specialisations"),
                      (specialisation: any) => (
                        <Tag
                          closable
                          onClose={() =>
                            removeSpecialisation(get(specialisation, "id"))
                          }
                        >
                          {get(specialisation, "name")}
                        </Tag>
                      )
                    )}
                    {map(get(filter, "gender"), (gender: any) => (
                      <Tag
                        closable
                        onClose={() => removeGender(get(gender, "id"))}
                      >
                        {get(gender, "name")}
                      </Tag>
                    ))}
                    {map(get(filter, "practice"), (p: any) => (
                      <Tag
                        closable
                        onClose={() => removePractice(get(p, "id"))}
                      >
                        {get(p, "name")}
                      </Tag>
                    ))}
                  </div>
                </Col>

                <Col xs={24} xl={7}>
                  <div className={styles["search-style"]}>
                    <div className={styles["title"]}>Sort By:</div>
                    <Select
                      className={styles["sort-select"]}
                      onChange={(value) =>
                        getData(
                          map(get(filter, "specialisations"), "id"),
                          map(get(filter, "gender"), "id"),
                          map(get(filter, "practice"), "id"),
                          get(filter, "city"),
                          value,
                          get(filter, "location")
                        )
                      }
                      value={selectedSort}
                    >
                      {map(sortOptions, (sort: any, i: any) => (
                        <Option key={i} value={get(sort, "id")}>
                          {get(sort, "name")}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </Col>
              </Row>

              {(map(selectedPractices, "id").includes("h") ||
                selectedPractices?.length == 0) && (
                <div className={styles["hospital-section"]}>
                  <div className={styles["title2"]}>Hospitals</div>

                  {get(hospitalList, "filterHospitals").length > 0 ? (
                    <>
                      <Row className={styles["card-section"]} align="stretch">
                        {(selectedPractices?.length == 0
                          ? get(hospitalList, "filterHospitals").slice(0, 3)
                          : get(hospitalList, "filterHospitals")
                        ).map((hospital: any) => (
                          <Col
                            key={hospital.id}
                            className={styles["hospital-card-style"]}
                            span={8}
                          >
                            <div className={styles["tag-style"]}>
                              <Image src="../../static/images/icons/star.svg" alt="" width={12}
              height={11.4}/>
                              <div className={styles["rating"]}>
                                {hospital.rating}
                              </div>
                            </div>
                            <div className={styles["img-card"]}>
                              <Image
                                src={hospital?.logo_url?.url}
                                className={styles["sm"]}
                                alt=""
                                width={100}
              height={150}
                              />
                            </div>
                            <div className={styles["text-section"]}>
                              <h4
                                className={"title4"}
                                onClick={() =>
                                  goToHospital(get(hospital, "slug"))
                                }
                              >
                                {hospital.name}
                              </h4>
                              <div className={styles["description"]}>
                                {hospital.description}
                              </div>
                              <div className={styles["certified"]}>
                                <Image src="../../static/images/icons/speciality.svg" alt=""  width={16}
              height={24}/>
                                <span className="specs">
                                  {" "}
                                  {get(hospital, "specialisations", [])
                                    .map((s: any) => s.name)
                                    .join(", ")}
                                </span>
                              </div>
                            </div>

                            <div className={styles["card-footer"]}>
                              <div
                                className={
                                  styles["item"] + " " + styles["clickable"]
                                }
                                onClick={() =>
                                  goToHospital(get(hospital, "slug"))
                                }
                              >
                                <Image src="../../static/images/icons/info.svg" alt="" width={15}
              height={15}/>{" "}
                                More Info
                              </div>
                              <div className={styles["item"]}>
                                <a
                                  className={styles["theme-color"]}
                                  href={`tel:+${get(
                                    hospital,
                                    "contact_code"
                                  )}${get(hospital, "contact_number")}`}
                                >
                                  <Image src="../../static/images/icons/phone.svg" alt="" width={15}
              height={15}/>{" "}
                                  <span> Make a Call</span>
                                </a>
                              </div>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </>
                  ) : (
                    <Empty description="No hospitals found" />
                  )}
                </div>
              )}

              {(map(selectedPractices, "id").includes("d") ||
                selectedPractices?.length == 0) && (
                <DoctorsList
                  doctors={get(doctorsList, "filterDoctors")}
                  title="Doctors"
                  specialisations={specialisations}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

// Will be called on Server side data will be hydrated to the component.
