import axios from 'axios'

const API = window.API
export const axiosInstance = axios.create({
    baseURL: API,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/x-www-form-urlencoded',
    }
})
