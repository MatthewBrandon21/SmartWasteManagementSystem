import * as api from "../../api";

export const login = (formData) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(formData);

    dispatch({ type: "LOGIN", payload: data });

  } catch (error) {
    console.log(error.message);
  }
};
