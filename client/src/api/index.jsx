import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:5000" })
// const url = "https://smartwastemanagement-api.herokuapp.com"

// login
export const loginUser = (formData) => API.post("/admin/login", formData)


// data
export const fetchUser = () => API.get("/admin")
export const fetchTrash = () => API.get("/trashdata")
