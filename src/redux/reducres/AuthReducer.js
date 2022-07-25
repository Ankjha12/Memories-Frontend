import { actionType } from "../../constants/ActionType";

export const AuthReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      console.log("coming from the Auth Reducer file", action?.payload);
      // set the profile in the local storage for letting bowser know that we are still logged in
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        authData: action?.data,
      };
    case actionType.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        authData: null,
      };
    default:
      return state;
  }
};
