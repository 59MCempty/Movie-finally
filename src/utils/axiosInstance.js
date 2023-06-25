import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3/'
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN

const headers = {
    Authorization: 'Bearer ' + TMDB_TOKEN,
    accept: 'application/json'
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: headers
})

const fetchApi = async (url, params) => {
    try {
        const response = await axiosInstance.get(url, { params })

        if (response.status === 200 && response.data) {
            return response.data
        }
        return response
    } catch (err) {
        throw err
    }
}


export default fetchApi
