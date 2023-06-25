import { useEffect, useState } from 'react'
import fetchApi from '../utils/axiosInstance.js'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    const fetchDatafromApi = async (url, param) => {
        
        setLoading(true)
        setData(null)
        setError(null)
        try {
            const response = await fetchApi(url, param)
            if (response) {

                setLoading(false)
                setData(response)
            }
        } catch (err) {
            setError('Something went wrong !!!')
        }
    }

    useEffect(() => {

        fetchDatafromApi(url)


    }, [url])

    return { data, loading, error }
}

export default useFetch
