import * as api from "../../api";

export const getTrash = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTrash();

    dispatch({ type: "FETCH_ALL_TRASH", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
