import axios from 'axios'

const url = 'https://smartwastemanagement-api.herokuapp.com'

export const fetchApis = () => axios.get(url)
