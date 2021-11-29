import * as api from "../../api";

// actions
export const getPost = () => async (dispatch) => {
  try {
    const { data } = await api.fetchApis();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
