import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import { DISPLAY_SPINNER, CLEAR_SPINNER, SETUP_PATIENTS_DATA } from "./actions";
import axios from "axios";
import { message } from "antd";

const initialState = {
  isLoading: false,
  patients: [],
};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displaySpinner = () => {
    dispatch({
      type: DISPLAY_SPINNER,
    });
  };

  const clearSpinner = () => {
    dispatch({
      type: CLEAR_SPINNER,
    });
  };

  const createPatient = async (values) => {
    try {
      displaySpinner();
      const res = await axios.post("/api/v1/patients/", values);
      clearSpinner();
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      clearSpinner();
      console.log(error);
      message.error("unable to create user");
    }
  };

  const getallPatients = async () => {
    try {
      const res = await axios.get("/api/v1/patients/");
      const { patients } = res.data;
      dispatch({
        type: SETUP_PATIENTS_DATA,
        payload: { patients },
      });
    } catch (error) {
      clearSpinner();
      console.log(error);
    }
  };

  const deletePatient = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/patients/delete/${id}`)
      if (res.data.success) {
        message.success(res.data.message);
      } 
    } catch (error) {
      clearSpinner();
      console.log(error);
      message.error("Unable to delete patient data");
    }
  };

  const updatePatient = async ({ values, id }) => {
    try {
      displaySpinner();
      const res = await axios.patch(
        `/api/v1/patients/update/${id}`,
        values,
      );
      clearSpinner();
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error("Unable to update the task");
      }
    } catch (error) {
      clearSpinner();
      console.log(error);
      message.error("Unable to update the task");
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displaySpinner,
        clearSpinner,
        createPatient,
        getallPatients,
        deletePatient,
        updatePatient
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider };
