"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type DataType = {
  firstName: string;
};

interface ContextProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
  queryObject: any;
  setQueryObject: Dispatch<SetStateAction<any>>;
  selectedCity: any;
  setSelectedCity: Dispatch<SetStateAction<any>>;
  selectedLocation: any;
  setSelectedLocation: Dispatch<SetStateAction<any>>;
}

const GlobalContext = createContext<ContextProps>({
  userId: "",
  setUserId: (): string => "",
  data: [],
  setData: (): DataType[] => [],
  queryObject: null,
  setQueryObject: (): any => null,
  selectedCity: null,
  setSelectedCity: (): any => null,
  selectedLocation: null,
  setSelectedLocation: (): any => null,
});

export const GlobalContextProvider = ({ children }: any) => {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState<[] | DataType[]>([]);
  const [queryObject, setQueryObject] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedLocation, setSelectedLocation] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        userId,
        setUserId,
        data,
        setData,
        queryObject,
        setQueryObject,
        selectedCity,
        setSelectedCity,
        selectedLocation,
        setSelectedLocation,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
