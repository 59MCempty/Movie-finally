import React, { useState } from 'react'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useFetch from '../../../hooks/useFetch.jsx'
import Image from '../../../LazyLoadImage/LazyloadImage.jsx'
import PosterFail from '/src/assets/no-poster.png'
import Genres from '../../../components/genres/Genres.jsx'
import CircleRating from '../../../components/circleRating/CircleRating.jsx'
import { FaRegPlayCircle } from 'react-icons/fa'
import { PlayIcon } from './playBtn'
import VideoPopup from '../../../components/videoPopup/VideoPopup.jsx'

const Banner = ({ video, crew }) => {
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)
    const { mediaType, id } = useParams()

    const { url } = useSelector(state => state.home)

    const { data, loading } = useFetch(`${mediaType}/${id}`)

    const genresId = data?.genres?.map(item => item.id)

    const director = crew?.filter((item) => item?.job === 'Director')
    const writer = crew?.filter((item) => item.job === 'Screenplay' || item.job === 'Story' || item.job === 'Writer')

    const runtime = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
    }
    return (
        <div className="w-full bg-black1 pt-[100px] mb-12 md:mb-10 md:pt-[120px] min-h-[700px]">
            {
                !loading ?
                    (!!data &&
                        <React.Fragment>
                            <div className="bannerImg">
                                <Image
                                    className="w-full block rounded-[12px] max-w-[350px]"
                                    src={url.backdropPath + data?.backdrop_path} />
                            </div>
                            <div className="opacity-layer-banner"></div>
                            <div className="contentWrapper">
                                <div className="flex flex-col md:gap-[50px] md:flex-row relative gap-[25px]">
                                    <div className="shrink-0">
                                        {data.poster_path ? (
                                            <Image
                                                className="posterImg"
                                                src={url.backdropPath + data.poster_path} />
                                        ) : (
                                            <Image
                                                className="posterImg"
                                                src={PosterFail} />
                                        )
                                        }
                                    </div>
                                    <div className="text-white">
                                        <div className="text-[28px] leading-[40px] md:text-[34px] leading-[44px]">
                                            {`${data.name || data.title} (${dayjs(data.release_date).format('YYYY')})`}
                                        </div>

                                        <div className="text-[16px] leading-[24px] mb-[15px] italic opacity-50 md:text-[20px] leading-[28px]">
                                            {data?.tagline}
                                        </div>
                                        <Genres data={genresId} wrap="row wrap" custom="mb-[25px] flex gap-x-7" />
                                        <div className="flex items-center gap-[25px] mb-[25px]">
                                            <CircleRating rating={data.vote_average.toFixed(1)} circle="bg-black1 bg-white h-[100px] w-[100px]" />
                                            <div
                                                onClick={() => {
                                                    setShow(true)
                                                    setVideoId(video.key)
                                                }}
                                                className="flex items-center gap-7 text-2xl transition delay-300 duration-500 ease-out">
                                                <FaRegPlayCircle size={110} className="text-gray-700/50 cursor-pointer hover:text-red-600 transition delay-300 duration-500 ease-out" />
                                                <span>Watch Trailer</span>
                                            </div>
                                        </div>
                                        <div className="mb-[25px]">
                                            <h1 className="text-[24px] mb-[10px]">Overview</h1>
                                            <p className="leading-[24px] md:pr-[100px]">{data?.overview}</p>
                                        </div>

                                        <div className="border-b border-white/20 px-0 py-[15px] flex">
                                            {data?.status && (
                                                <div
                                                    style={{ flexFlow: 'row wrap' }}
                                                    className="mr-[10px] flex">
                                                    <span className="mr-[10px] opacity-50 leading-[24px] font-medium opacity-100">
                                                        Status: {' '}
                                                    </span>
                                                    <span className="mr-[10px] leading-[24px]">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}

                                            {data?.release_date && (
                                                <div
                                                    style={{ flexFlow: 'row wrap' }}
                                                    className="mr-[10px] flex">
                                                    <span className="mr-[10px] opacity-50 leading-[24px] font-medium opacity-100">
                                                        Release Date: {' '}
                                                    </span>
                                                    <span className="mr-[10px] leading-[24px]">
                                                        {dayjs(data.release_date).format('MMM D,YYYY')}
                                                    </span>
                                                </div>
                                            )}

                                            {data?.runtime && (
                                                <div
                                                    style={{ flexFlow: 'row wrap' }}
                                                    className="mr-[10px] flex">
                                                    <span className="mr-[10px] opacity-50 leading-[24px] font-medium opacity-100">
                                                        Release Date: {' '}
                                                    </span>
                                                    <span className="mr-[10px] leading-[24px]">
                                                        {runtime(data?.runtime)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {director?.length > 0 && (
                                            <div className="border-b border-white/20 px-0 py-[15px] flex">
                                                <span className="mr-[10px] opacity-50 leading-[24px] font-medium opacity-100">
                                                    Director: {' '}
                                                </span>
                                                <span className="mr-[10px] leading-[24px]">
                                                    {director.map((d, i) =>
                                                        <span key={i}>
                                                            {d.name}
                                                            {director?.length - 1 !== i && ', '}
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className="border-b border-white/20 px-0 py-[15px] flex">
                                                <span className="mr-[10px] opacity-50 leading-[24px] font-medium opacity-100">
                                                    Director: {' '}
                                                </span>
                                                <span className="mr-[10px] leading-[24px]">
                                                    {writer?.map((w, i) =>
                                                        <span key={i}>
                                                            {w.name}
                                                            {writer?.length - 1 !== i && ', '}
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        )}

                                        {data?.created_by?.length > 0 && (
                                            <div className="border-b border-white/20 px-0 py-[15px] flex">
                                                <span className="mr-[10px] opacity-50 leading-[24px] font-medium opacity-100">
                                                    Creator: {' '}
                                                </span>
                                                <span className="mr-[10px] opacity-50 leading-[24px]">
                                                    {data?.created_by?.map((c, i) =>
                                                        <span key={i}>
                                                            {c.name}
                                                            {data?.created_by?.length - 1 !== i && ', '}
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <VideoPopup
                                show={show}
                                setShow={setShow}
                                videoId={videoId}
                                setVideoId={setVideoId}
                            />

                        </React.Fragment>
                    )

                    :
                    (<div className="flex relative flex-col gap-[25px] md:gap-[50] md:flex-col">
                        <div className="contentWrapper flex gap-[50px]">
                            <div className="skeleton shrink-0 w-full block rounded-[12px] aspect-[1/1.5] md:max-w-[350px]"></div>
                            <div className="w-full">
                                <div className="w-full h-[25px] mb-[20px] rounded-[50px] skeleton"></div>
                                <div className="w-full h-[25px] mb-[20px] rounded-[50px] w-[75%] mb-[50px] skeleton"></div>
                                <div className="w-full h-[25px] mb-[20px] rounded-[50px] skeleton"></div>
                                <div className="w-full h-[25px] mb-[20px] rounded-[50px] skeleton"></div>
                                <div className="w-full h-[25px] mb-[20px] rounded-[50px] w-[50%] mb-[50px] skeleton"></div>
                                <div className="w-full h-[25px] mb-[20px] rounded-[50px] skeleton"></div>
                                <div className="w-full h-[25px] mb-[20px] rounded-[50px] skeleton"></div>
                            </div>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default Banner
