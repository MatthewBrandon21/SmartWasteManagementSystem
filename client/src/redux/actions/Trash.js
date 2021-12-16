import * as api from "../../api";

export const getTrash = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTrash();

    dispatch({ type: "FETCH_ALL_TRASH", payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const createTrash = (trash) => async (dispatch) => {
  try {
    const { data } = await api.createTrash(trash);

    dispatch({ type: "CREATE_TRASH", payload: data });

    window.location.reload(false);

  } catch (error) {
    console.log(error.message);
  }
}

export const updateTrash = (id, trash) => async (dispatch) => {
  try {
    const { data } = await api.updateTrash(id, trash);

    dispatch({ type: "UPDATE_TRASH", payload: data });

    window.location.reload(false);

  } catch (error) {
    console.log(error);
  }
}

export const deleteTrash = (id) => async (dispatch) => {
  try {
    await api.deleteTrash(id);

    dispatch({ type: "DELETE_TRASH", payload: id });
  } catch (error) {
    console.log(error);
  }
};
