import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch.jsx'
import Banner from './detailBanner/Banner.jsx'
import Cast from './cast/Cast.jsx'
import VideoSection from './videoSection/VideoSection.jsx'
import Similar from './carousel/Similar.jsx'
import Recommendation from './carousel/Recommendation.jsx'

const Details = () => {
    const { mediaType, id } = useParams()
    const { data: videos, loading: videosLoading } = useFetch(`${mediaType}/${id}/videos`)
    const { data: credits, loading: creditsLoading } = useFetch(`${mediaType}/${id}/credits`)

    return (
        <div>
            <Banner video={videos?.results?.[0]} crew={credits?.crew} />
            <Cast cast={credits?.cast} loading={creditsLoading} />
            <VideoSection videos={videos} loading={videosLoading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    )
}

export default Details
