import React, { useState } from 'react'
import Image from '../../../LazyLoadImage/LazyloadImage'
import { FaRegPlayCircle } from 'react-icons/fa'
import { PlayIcon } from '../detailBanner/playBtn'
import VideoPopup from '../../../components/videoPopup/VideoPopup.jsx'

const VideoSection = ({ videos, loading }) => {
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const loadingSkeleton = () => {
        return (
            <div className="w-[150px] shrink-0 md:w-[25%]">
                <div className="skeleton w-full aspect-video rounded-[12px] mb-2.5"></div>
                <div className="skeleton h-[20px] w-full grounded-[10px] mb-2.5"></div>
                <div className="skeleton h-[20px] w-[75%] grounded-[10px]"></div>
            </div>
        )
    }

    return (
        <div className="relative mb-[50px]">
            <div className="contentWrapper">
                <div className="text-2xl text-white mb-[25px]">Official Video</div>
                {
                    !loading ? (
                            <div className="flex gap-2.5 overflow-x-auto scrollbar-hide overflow-y-hidden -mx-5 py-0 px-5 md:gap-5 md:p-0 md:m-0">
                                {
                                    videos?.results?.map((video) => {

                                        return (
                                            <div className="w-[150px] shrink-0 md:w-[25%] cursor-pointer" key={video.id}>
                                                <div className="videoThumbnail" key={video.id}>
                                                    <Image src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                                    <FaRegPlayCircle
                                                        onClick={() => {
                                                            setVideoId(video?.key)
                                                            setShow(true)
                                                        }}
                                                        size={40}
                                                        className="hover:text-pink duration-500 transition-all ease-in" />
                                                </div>
                                                <div className="text-white text-sm leading-5 md:text-base leading-6">{video.name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                        :
                        (
                            <div className="flex gap-2.5 overflow-x-auto -mx-5 py-0 px-5 md:gap-5 md:p-0 md:m-0">
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                            </div>
                        )
                }
            </div>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    )
}

export default VideoSection
