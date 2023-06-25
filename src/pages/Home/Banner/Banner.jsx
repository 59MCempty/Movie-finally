import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch.jsx'
import { useSelector } from 'react-redux'
import Image from '../../../LazyLoadImage/LazyloadImage.jsx'
import ContentWrapper from '../../../contentWrapper/ContentWrapper.jsx'

const Banner = () => {
    const [background, setBackground] = useState()
    const [input, setInput] = useState('')
    const { data, loading } = useFetch('movie/upcoming')
    const navigate = useNavigate()
    const { url } = useSelector(state => state.home)

    const getInput = (e) => {
        setInput(e.target.value)
    }
    const SubmitAction = (e) => {
        if (e.key === 'Enter' && input.length > 0) {
            navigate(`/search/${input}`)
        }
    }

    useEffect(() => {
        const bg_movie = url.backdropPath + data?.results?.[Math.floor(Math.random() * data?.results?.length)]?.backdrop_path
        setBackground(bg_movie)
    }, [data])


    return (
        <div className="h-[450px] md:h-[700px] bg-black1 w-full relative flex items-center">
            <div className="w-full h-full opacity-50 overflow-hidden absolute top-0 left-0">
                {background?.length > 0 && <Image src={background} />}
            </div>
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="flex flex-col items-center justify-center text-center text-white relative max-w-[800px] my-0 mx-auto">
                    <span className="text-5xl font-bold mb-10 md:mb-0 md:text-[90px]">Welcome</span>
                    <span className="text-lg md:text-2xl font-medium mb-10">Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="flex items-center w-full">
                        <input
                            className="w-[calc(100%-100px)] h-12 text-black bg-white outline-0 border-0 rounded-l-[30px] py-0 px-4 md:w-[calc(100%-150px)] md:h-14 md:text-xl py-0 px-7"
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => getInput(e)}
                            onKeyUp={SubmitAction}
                        />
                        <button className="md:w-[150px] md:h-[60px] text-lg w-[100px] h-12 text-white outline-0 border-0 text-base rounded-r-[30px] cursor-pointer bg-gradient-to-r from-[#f89e00] to-[#da2f68]">Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default Banner
