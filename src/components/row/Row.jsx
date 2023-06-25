import React, { useRef } from 'react'
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill
} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import Image from '../../LazyLoadImage/LazyloadImage.jsx'
import PosterFallback from '/src/assets/no-poster.png'
import CircleRating from '../circleRating/CircleRating.jsx'
import Genres from '../genres/Genres.jsx'


const Row = ({ data, loading, mediaType, title }) => {
    const navigate = useNavigate()
    const rowContainer = useRef()
    const { url } = useSelector(state => state.home)

    const slide = (dir) => {

        const container = rowContainer.current

        const scrollAmount =
            dir === 'left'
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20)

        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        })

    }
    const skItem = () => {
        return (
            <div className="skeletonItem w-[125px] md:w-[calc(25% - 15px)] lg:w-[calc(20% - 16px)] shrink-0">
                <div className="rounded-[12px] mb-[30px] aspect-[1/1.5] w-full skeleton"></div>
                <div className="textBlock flex flex-col">
                    <div className="w-full h-[20px] mb-[10px] skeleton"></div>
                    <div className="w-[75%] h-[20px] skeleton"></div>
                </div>
            </div>
        )
    }
    return (
        <div className="mb-12">
            <div className="contentWrapper relative">
                {title && <div className="text-2xl text-white mb-5 font-normal">{title}</div>}
                <BsFillArrowLeftCircleFill
                    onClick={() => slide('left')}
                    className="left-7 text-3xl translate-y-2/4 text-black absolute top-[35%] cursor-pointer opacity-50 z-10 hidden md:block hover:opacity-80"
                />
                <BsFillArrowRightCircleFill
                    onClick={() => slide('right')}
                    className="right-7 text-3xl translate-y-2/4 text-black absolute top-[35%] cursor-pointer opacity-50 z-10 hidden md:block hover:opacity-80"
                />
                {!loading ? (
                    <div
                        ref={rowContainer}
                        className="flex gap-2.5 overflow-y-hidden py-0 -mx-[20px] md:gap-5 md:overflow-hidden md:m-0 md:p-0 overflow-x-scroll scrollbar-hide">
                        {
                            data?.map(item => {
                                    const posterUrl = item?.poster_path ? url.posterPath + item?.poster_path : PosterFallback
                                    return (<div
                                        className="w-[125px] cursor-pointer md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] shrink-0"
                                        key={item.id}
                                        onClick={() => navigate(`/${item?.media_type || mediaType}/${item?.id}`)}
                                    >
                                        <div className="posterBlock">
                                            <Image src={posterUrl} />
                                            <CircleRating rating={item?.vote_average.toFixed(1)} circle="circle1"/>
                                            <Genres data={item?.genre_ids} wrap='wrap'/>
                                        </div>
                                        <div className="text-white flex flex-col">
                                            <span className="mb-2.5 text-base leading-6 md:text-xl">{(item?.title || item?.name).length > 10 ? (item?.title || item?.name).slice(0, 10) + '...' : (item?.title || item?.name)}</span>
                                            <span className="text-sm opacity-50">{dayjs(item?.release_Date).format('MMM D, YYYY')}</span>
                                        </div>
                                    </div>)

                                }
                            )
                        }
                    </div>
                ) : (
                    <div className="flex gap-2.5 md:gap-5 overflow-y-hidden -mx-[20px] py-0 px-[20px] md:overflow-hidden md:m-0 md:p-0 overflow-x-hidden">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Row
