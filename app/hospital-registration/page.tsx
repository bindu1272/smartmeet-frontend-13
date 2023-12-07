"use client";
import { useRouter } from "next/navigation";
import { message } from "antd";
import React, { useState } from "react";
import Validator from "validatorjs";
import { get } from "lodash";
import { axiosInstance } from "@/remote/axios";
import ButtonDefault from "@/components/buttons/buttonDefault";
import { putTimeHelper } from "@/utilities/putTimeHelper";
import { isValidPhoneNumber } from "react-phone-number-input";
import HospitalRegistrationPage from "@/components/auth/hospital-register";

const REGISTRATION_STEPS = {
  PERSONAL_DETAILS: 0,
  OTP: 1,
  ABOUT_HOSPITAL: 2,
  PERSONALISATION: 3,
  CONTACT_HOURS: 4,
};

const getFormInitialState = () => [
  {
    step: 1,
    title: "Mr",
    name: undefined,
    email: undefined,
    contact_number: undefined,
    contact_code: "61",
    password: undefined,
    confirm_password: undefined,
  },
  {
    step: 2,
    otp_uuid: undefined,
    otp: undefined,
  },
  {
    step: 3,
    name: undefined,
    specialisations: [],
    description: undefined,
    address_1: undefined,
    address_2: undefined,

    suburb: "Area",
    state: undefined,
    pin_code: undefined,
    country: "Australia",
    doctor_count: 1,
    contact_code: "61",
    contact_number: undefined,
    fax_number: undefined,
    appointment_booking_duration: 7,
    sponsership_required: false,
    billing_method: 1,
    working_hours: [{ days: [1], from_time: "10:00", to_time: "12:00" }],
    city_uuid: undefined,
  },
  {
    slug: undefined,
    logo: null,
    brand_color: {
      primary: undefined,
      secondary: undefined,
    },
  },
  {
    contact_hours: [{ days: [1], from_time: "10:00", to_time: "12:00" }],
  },
];

const validationRules: any = [
  {
    name: "required",
    email: "required|email",
    contact_number: "required",
    contact_code: "required",
    password: "required",
    confirm_password: "required|same:password",
  },
  {
    otp: "required|digits:4",
  },
  {
    name: "required",
    specialisations: "required",
    description: "required",
    address_1: "required",
    // address_2: 'required',
    suburb: "required",
    state: "required",
    country: "required",
    doctor_count: "required|numeric",
    contact_code: "required",
    contact_number: "required",
    fax_number: "required",
    sponsership_required: "boolean",
    pin_code: "required",
    billing_method: "required",
    working_hours: "required",
    city_uuid: "required",
  },
  {
    slug: "required",
    logo: "required",
    "brand_color.primary": "required",
    "brand_color.secondary": "required",
  },
  {
    contact_hours: "required",
  },
];

export default function HospitalRegistration() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(
    REGISTRATION_STEPS.PERSONAL_DETAILS
  );

  const [formData, setFormData] = useState(getFormInitialState());
  const [errors, setErrors] = useState([{}, {}, {}, {}]);
  const [successModal, setSuccessModal] = useState(false);

  const handleHome = () => {
    router.push("/home");
  };

  const handleDashboard = () => {
    router.replace("https://staging-admin.smartmeet.au/");
  };

  const handleClick = (e: any) => {
    e.preventDefault();

    console.log("currentStep", currentStep);

    if (!validateStep(currentStep)) {
      return;
    }

    onNavigationToNextStep(currentStep)
      .then((status) => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
      })
      .catch((e) => {});

    // router.push('/home');
  };

  const onNavigationToNextStep = async (step: any) => {
    switch (step) {
      case REGISTRATION_STEPS.PERSONAL_DETAILS:
        return validateFromServer(formData[step]).then((res) => {
          let otpData = {
            ...formData[REGISTRATION_STEPS.OTP],
            otp_uuid: res.id,
          };
          onChangeFormData(otpData, REGISTRATION_STEPS.OTP);
        });
        break;
      case REGISTRATION_STEPS.OTP:
        return validateFromServer(formData[step])
          .then((res) => {})
          .catch((e) => {
            let errs: any = [...errors];
            errs[step].otp = [
              "Failed to validate OTP. Please enter the right otp",
            ];
            setErrors(errs);
            throw e;
          });
        break;
      case REGISTRATION_STEPS.ABOUT_HOSPITAL:
        const bool = isValidPhoneNumber(
          `+${formData[step]?.contact_code}${formData[step]?.contact_number}`
        );
        if (!bool) {
          let err = ["Contact_number is not valid"];
          setErrors(err);
          message.error("Contact_number is not valid");
          throw new Error("");
        }
        break;
      case REGISTRATION_STEPS.PERSONALISATION:
        return validateFromServer({ ...formData[step], ...formData[step - 1] })
          .then((res) => {})
          .catch((e) => {
            throw e;
          });
        break;
      case REGISTRATION_STEPS.CONTACT_HOURS:
        return registerHospital();
        break;

        return true;
    }
  };

  const validateFromServer = async (data: any) => {
    return await axiosInstance.post("/hospitals/validate", data).then((res) => {
      console.log(res);
      return get(res, "data.data");
    });
  };

  const registerHospital = async () => {
    let hospital_data = {
      ...formData[REGISTRATION_STEPS.PERSONALISATION],
      ...formData[REGISTRATION_STEPS.ABOUT_HOSPITAL],
      ...formData[REGISTRATION_STEPS.CONTACT_HOURS],
    };
    let modifyHoursData = {
      ...hospital_data,
      // logo_url:`https://res.cloudinary.com/dd2sdadrl/image/upload/v1669621246/${hospital_data?.logo}`,
      working_hours: putTimeHelper(hospital_data.working_hours),
      contact_hours: putTimeHelper(hospital_data.contact_hours),
    };

    let data = {
      admin: formData[REGISTRATION_STEPS.PERSONAL_DETAILS],
      hospital: modifyHoursData,
    };
    console.log("data>>>", data);
    return await axiosInstance.post("/hospitals", data).then((res) => {
      setSuccessModal(true);

      return get(res, "data.data");
    });
  };

  const validateStep = (step: any) => {
    let v = new Validator(formData[currentStep], validationRules[currentStep]);
    let errs = get(v, "errors.errors", {});
    let newErrors = [...errors];
    newErrors[step] = errs;

    setErrors(newErrors);
    console.log("validation error >>", errs);
    return v.passes();
  };

  const onPressBack = (e: any) => {
    e.preventDefault();
    console.log("currentStep", currentStep);
    if (currentStep === 2) setCurrentStep(0);
    else if (currentStep > 0) setCurrentStep(currentStep - 1);
    else {
    }

    router.push("/home");
  };

  React.useEffect(() => {
    const validateStepIntial = (step: any) => {
      let v = new Validator(formData[currentStep], validationRules[currentStep]);
      let errs = get(v, "errors.errors", {});
      let newErrors = [...errors];
      newErrors[step] = errs;
  
      setErrors(newErrors);
      console.log("validation error >>", errs);
      return v.passes();
    };
  
    const onPressBack = (e: any) => {
      e.preventDefault();
      console.log("currentStep", currentStep);
      if (currentStep === 2) setCurrentStep(0);
      else if (currentStep > 0) setCurrentStep(currentStep - 1);
      else {
      }
  
      router.push("/home");
    };
    if (errors[currentStep] && Object.keys(errors[currentStep]).length) {
      validateStepIntial(currentStep);
    }
  }, [formData]);

  const onChangeFormData = (data: any, type: any) => {
    console.log("On change fomr data>>>", data, type);

    let updatedFormData = [...formData];
    updatedFormData[type] = { ...updatedFormData[type], ...data };
    setFormData([...updatedFormData]);
  };

  return (
    <HospitalRegistrationPage
      currentStep={currentStep}
      formData={formData}
      onPressBack={onPressBack}
      handleClick={handleClick}
      onChangeFormData={onChangeFormData}
      errors={errors}
      setSuccessModal={setSuccessModal}
      successModal={successModal}
      handleHome={handleHome}
      handleDashboard={handleDashboard}
      REGISTRATION_STEPS={REGISTRATION_STEPS}
    />
  );
}
