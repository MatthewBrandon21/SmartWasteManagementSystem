import * as api from "../../api";

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(formData);

    dispatch({ type: "LOGIN", payload: data });

    history.push("/");
  } catch (error) {
    console.log(error.message);
  }
};
