import * as api from "../../api";

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUser();

    dispatch({ type: "FETCH_ALL_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.createUser(user);

    dispatch({ type: "CREATE_USER", payload: data });

    window.location.reload(false);

  } catch (error) {
    console.log(error);
  }
}

export const updateUser = (id, user) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, user);

    dispatch({ type: "UPDATE_USER", payload: data });

    window.location.reload(false);

  } catch (error) {
    console.log(error);
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    await api.deleteUser(id);

    dispatch({ type: "DELETE_USER", payload: id });
  } catch (error) {
    console.log(error);
  }
};
