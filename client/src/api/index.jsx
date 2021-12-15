import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:5000" })
// const url = "https://smartwastemanagement-api.herokuapp.com"

// login
export const loginUser = (formData) => API.post("/user/login", formData);


// user
export const fetchUser = () => API.get("/user");
export const createUser = (userFormdata) => API.post("/user/register", userFormdata);
export const updateUser = (id, userFormdata) => API.put(`/user/${id}`, userFormdata);
export const deleteUser = (id) => API.delete(`/user/${id}`);

// export const createUser = (userFormdata) => axios.post("http://localhost:5000/user/register", userFormdata);
// export const updateUser = (id, userFormdata) => axios.put(`http://localhost:5000/user/${id}`, userFormdata);
// export const deleteUser = (id) => axios.delete(`http://localhost:5000/user/${id}`);


// trash
export const fetchTrash = () => API.get("/trashdata");
export const createTrash = (userFormdata) => API.post("/trashdata", userFormdata);
export const updateTrash = (id, userFormdata) => API.put(`/trashdata/${id}`, userFormdata);
export const deleteTrash = (id) => API.delete(`/trashdata/${id}`);

// export const createTrash = (userFormdata) => axios.post("http://localhost:5000/trashdata", userFormdata);
// export const updateTrash = (id, userFormdata) => axios.put(`http://localhost:5000/trashdata/${id}`, userFormdata);
// export const deleteTrash = (id) => axios.delete(`http://localhost:5000/trashdata/${id}`);
