import axios from "axios"

const url = "http://localhost:5000/admin"

export const fetchApis = () => axios.get(url)
