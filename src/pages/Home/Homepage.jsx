import React from 'react'
import Banner from './Banner/Banner.jsx'
import Trending from './trending/Trending.jsx'
import Popular from './popular/Popular.jsx'
import TopRated from './topRated/TopRated.jsx'

const Homepage = () => {
    return (
        <div>
            <Banner />
            <Trending />
            <Popular />
            <TopRated />
        </div>
    )
}

export default Homepage
