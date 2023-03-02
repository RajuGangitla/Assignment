import { DISPLAY_SPINNER, CLEAR_SPINNER, SETUP_PATIENTS_DATA } from "./actions";

const reducer = (state, action) => {
  if (action.type === DISPLAY_SPINNER) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CLEAR_SPINNER) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === SETUP_PATIENTS_DATA) {
    return {
      ...state,
      patients: action.payload.patients,
    };
  }
};
export default reducer;
