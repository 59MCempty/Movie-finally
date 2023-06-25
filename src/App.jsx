import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration, getGenres } from './redux/homeSlice'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Home/Homepage.jsx'
import SearchPage from './pages/SearchPage/SearchPage.jsx'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import useFetch from './hooks/useFetch.jsx'
import fetchApi from './utils/axiosInstance.js'
import axios from 'axios'
import Details from './pages/mediaDetails/Details'
import Explore from './pages/explore/explore.jsx'

function App() {
    const dispatch = useDispatch()
    const { data, loading } = useFetch('configuration')

    const fetchApiConfig = async () => {
        fetchApi('configuration').then((res) => {

            const url = {
                backdropPath: res?.images?.secure_base_url + 'original',
                profilePath: res?.images?.secure_base_url + 'original',
                posterPath: res?.images?.secure_base_url + 'original'
            }
            dispatch(getApiConfiguration(url))
        })
    }

    const fetchApiGenres = async () => {
        const urls = []
        const mediaType = ['tv', 'movie']
        const listGenre = {}

        mediaType.forEach((type) => {
            urls.push(fetchApi(`genre/${type}/list`))
        })

        const data = await axios.all(urls)
        data.map(({ genres }) => {
            return genres.map((genre) => (listGenre[genre.id] = genre))
        })

        dispatch(getGenres(listGenre))
    }

    useEffect(() => {
        fetchApiConfig()
        fetchApiGenres()
    }, [])

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/search/:searchInput" element={<SearchPage />}></Route>
                <Route path="/explore/:mediaType" element={<Explore />}></Route>
                <Route path="/:mediaType/:id" element={<Details />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
