import { useState, useEffect } from "react";
import assign from "lodash/assign";
import get from "lodash/get";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  CloseCircleFilled,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
// styles
import { axiosInstance } from "../../../remote/axios";
import BookConsultationPage from "./bookConsultationPage";
// const { publicRuntimeConfig } = getConfig();
const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export default function BookConsultation(props) {
  const { hospital, doctor, slot, onAppointmentCreated, initialValues } = props;
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  const session = data;
  const OPTION_TYPES = {
    RADIO: "RADIO",
    INPUT: "INPUT",
    FILE: "FILE",
    DROPDOWN: "DROPDOWN",
    CHECKBOX: "CHECKBOX",
    IMAGE: "IMAGE",
  };
  const QUESTION_TYPES = {
    RADIO: [
      { label: "option1", value: "" },
      { label: "option2", value: "" },
    ],
    DROPDOWN: [
      { label: "option1", value: "" },
      { label: "option2", value: "" },
    ],
    CHECKBOX: [
      { label: "option1", value: "" },
      { label: "option2", value: "" },
    ],
  };
  const [options, setOptions] = useState([]);
  const [questionType, setQuestionType] = useState();
  const QUESTION_ANSWERS = {
    RADIO: [],
    DROPDOWN: [],
    INPUT: [],
    CHECKBOX: [],
    FILE: [],
    IMAGE: [],
  };
  const [allQuestionAnswers, setAllQuestionAnswers] = useState({
    ...QUESTION_ANSWERS,
  });
  const onFinish = async (payload) => {
    if (imageUser?.key) {
      let all = { ...allQuestionAnswers };
      all["Image"] = { imageQuestionId: imageUser?.key };
    }
    setLoading(true);
    payload["questionData"] = JSON.stringify(allQuestionAnswers);
    assign(payload, {
      date: get(slot, "date"),
      slot_id: get(slot, "slot_id"),
      doctor_uuid: get(doctor, "id"),
      hospital_uuid: get(hospital, "id"),
      consultation_mode: 1,
    });

    if (get(payload, "consultation_type") === 2) {
      onAppointmentCreated({}, payload, 2);
    } else {
      try {
        let res = await axiosInstance.post(`appointments`, payload);
        onAppointmentCreated(get(res, "data.data"), payload, 1);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
  };

  const onFinishFailed = () => {};

  const router = useRouter();
  const goToLogin = () => {
    router.push("/login");
  };
  const handleQuestionType = () => {};
  const [hospitalQuestions, setHospitalQuestions] = useState();
  const [imageUrl, setImageUrl] = useState({});
  const [imageUser, setImageUser] = useState();
  const [fileUser, setFileUser] = useState();
  const [deleteUrl, setDeleteUrl] = useState("");

  useEffect(() => {
    if (get(doctor, "id")) {
      const getDoctorIncludedQuestions = async () => {
        setLoading(true);
        const hospitalId = get(hospital, "id");
        const doctorId = get(doctor, "id");
        var result;
        result = await axiosInstance.get(
          `doctors/${doctorId}/doctor-includedquestions`
        );
        setLoading(false);
        setHospitalQuestions(get(result, "data.data"));
      };
    
      getDoctorIncludedQuestions();
    }
  }, []);

  const selectOnchange = (questionId, value, questionType) => {
    if (questionType === OPTION_TYPES.DROPDOWN) {
      value = value?.value;
    }
    if (questionType === OPTION_TYPES.INPUT) {
      value = value?.target?.value;
    }
    let arr = [...allQuestionAnswers?.[questionType]];
    if (allQuestionAnswers[questionType]?.length > 0) {
      const sample = allQuestionAnswers[questionType]?.reduce(
        (acc, questionAnswer) => {
          if (questionType === OPTION_TYPES.CHECKBOX) {
            if (questionAnswer[questionId]) {
              let answers = [...questionAnswer[questionId]];
              if (answers.includes(value)) {
                answers.splice(answers.indexOf(value), 1);
              } else {
                answers.push(value);
              }
              questionAnswer[questionId] = answers;
              acc = [...acc, questionAnswer];
            } else {
              let singleValue = [value];
              acc = [...acc, { ...questionAnswer, [questionId]: singleValue }];
            }
          } else {
            if (Object?.keys(questionAnswer)?.includes(questionId)) {
              questionAnswer[questionId] = value;
              acc = [...acc, questionAnswer];
            } else {
              acc = [...acc, { ...questionAnswer, [questionId]: value }];
            }
          }
          return acc;
        },
        []
      );
      setAllQuestionAnswers({ ...allQuestionAnswers, [questionType]: sample });
    } else {
      if (questionType === OPTION_TYPES.CHECKBOX) {
        let checkBoxArray = [];
        checkBoxArray.push(value);
        let obj = { [questionId]: checkBoxArray };
        arr.push(obj);
        setAllQuestionAnswers({ ...allQuestionAnswers, [questionType]: arr });
      } else {
        let obj = { [questionId]: value };
        arr.push(obj);
        setAllQuestionAnswers({ ...allQuestionAnswers, [questionType]: arr });
      }
    }
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const [fileUrl, setFileUrl] = useState("");
  const [deleteFileUrl, setDeleteFileUrl] = useState("");
  const handleChangeFile = (info, questionId) => {
    if (info?.file?.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info?.file?.status === "done") {
      // Get this url from response in real world.
      getBase64(info?.file?.originFileObj, (url) => {
        setLoading(false);
        setFileUrl(url);
        setDeleteFileUrl(info?.file?.response?.data?.result?.public_id);
        let arr = [{ [questionId]: info?.file?.response?.data?.url }];
        allQuestionAnswers[OPTION_TYPES.FILE] = arr;
      });
    }
  };
  const handleChangeImage = (info, questionId) => {
    if (info?.file?.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info?.file?.status === "done") {
      // Get this url from response in real world.
      getBase64(info?.file?.originFileObj, (url) => {
        setLoading(false);
        let obj = { ...imageUrl, [questionId]: url };
        setImageUrl(obj);
        setDeleteFileUrl(info?.file?.response?.data?.result?.public_id);
        let arr = [];
        let obj1 = { [questionId]: info?.file?.response?.data?.url };
        arr.push(obj1);
        if (allQuestionAnswers[OPTION_TYPES.IMAGE]?.length > 0) {
          let arr1 = [...allQuestionAnswers[OPTION_TYPES.IMAGE]];
          arr1.push(obj1);
          allQuestionAnswers[OPTION_TYPES.IMAGE] = arr1;
        } else {
          allQuestionAnswers[OPTION_TYPES.IMAGE] = arr;
        }
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <PlusOutlined style={{ fontSize: "16px", color: "#9c6dff" }} />
      )}
    </div>
  );
  // const deleteImage= async()=>{
  //   const url = `${publicRuntimeConfig.backendUrl}/media/${deleteUrl}`;
  //     setLoading(true);
  //     await axios
  //       .delete(url)
  //       .then((res) => {
  //         setLoading(false);
  //         if(res?.data?.data?.result === "ok" ||res?.data?.data?.result === "OK" ){
  //           setImageUrl(null);
  //         }
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         console.log("Err", err);
  //       });
  // }
  // const deleteFile= async()=>{
  //   const url = `${publicRuntimeConfig.backendUrl}/deletefile`;
  //     setLoading(true);
  //     await axios
  //       .post(url,fileUser?.key)
  //       .then((res) => {
  //         setLoading(false);
  //         if(res?.data?.data?.result === "ok" ||res?.data?.data?.result === "OK" ){
  //           setFileUrl(null);
  //         }
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         console.log("Err", err);
  //       });
  // }
  const onUploadLogoDone = (imageResponse) => {
    setImageUser(imageResponse);
  };
  const onUploadFileDone = (fileResponse) => {
    setFileUser(fileResponse);
  };
  const handleRemove = () => {
    setImageUrl(null);
  };
  return (
    <BookConsultationPage
      loading={loading}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      session={session}
      selectOnchange={selectOnchange}
      handleChangeFile={handleChangeFile}
      fileUrl={fileUrl}
      // fileOnchange={fileOnchange}
      imageUrl={imageUrl}
      handleChangeImage={handleChangeImage}
      // handleOptions={handleOptions}
      // removeOption={removeOption}
      handleRemove={handleRemove}
      // addOption={addOption}
      options={options}
      uploadButton={uploadButton}
      questionType={questionType}
      OPTION_TYPES={OPTION_TYPES}
      hospitalQuestions={hospitalQuestions}
      handleQuestionType={handleQuestionType}
      hospital={hospital}
      doctor={doctor}
      slot={slot}
      onAppointmentCreated={onAppointmentCreated}
      initialValues={initialValues}
    />
  );
}
