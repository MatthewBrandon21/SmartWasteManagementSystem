import axios from "axios"

const url = "http://localhost:5000/"
// const url = "https://smartwastemanagement-api.herokuapp.com"

export const fetchUser = () => axios.get(url+"admin")
// export const fetchTrash = () => axios.get(url+"trashdata")
