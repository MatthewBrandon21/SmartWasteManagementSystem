import axios from "axios"

const API = axios.create({ baseURL: "https://smartwastemanagement-api.herokuapp.com" })
// const url = "https://smartwastemanagement-api.herokuapp.com"

// login
export const loginUser = (formData) => API.post("/user/login", formData);


// user
export const fetchUser = () => API.get("/user");
export const createUser = (userFormdata) => API.post("/user/register", userFormdata);
export const updateUser = (id, userFormdata) => API.put(`/user/${id}`, userFormdata);
export const deleteUser = (id) => API.delete(`/user/${id}`);


// trash
export const fetchTrash = () => API.get("/trashdata");
export const createTrash = (trashFormdata) => API.post("/trashdata", trashFormdata);
export const updateTrash = (id, trashFormdata) => API.put(`/trashdata/${id}`, trashFormdata);
export const deleteTrash = (id) => API.delete(`/trashdata/${id}`);
