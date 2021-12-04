import * as api from "../../api";

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUser();

    dispatch({ type: "FETCH_ALL_USER", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
