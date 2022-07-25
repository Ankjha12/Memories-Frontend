import { actionType } from "../../constants/ActionType";
import * as api from "../../api/index";

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    // login the user here
    const { data } = await api.signIn(formData);

    dispatch({
      type: actionType.AUTH,
      payload: data,
    });

    navigate("/");
  } catch (error) {
    console.log("Error in Dispatching the action", error);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({
      type: actionType.AUTH,
      payload: data,
    });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
