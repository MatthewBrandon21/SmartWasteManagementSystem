import * as api from "../../api";

export const login = (formData) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(formData);

    dispatch({ type: "LOGIN", payload: data });

    window.location.reload(false);
  } catch (error) {
    console.log(error.message);
  }
};
