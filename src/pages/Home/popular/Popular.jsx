import React, { useState} from 'react'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs.jsx'
import useFetch from '../../../hooks/useFetch.jsx'
import Row from '../../../components/row/Row.jsx'

const Popular = () => {
    const [mediaType, setMediaType] = useState('movie')
    const { data, loading } = useFetch(`${mediaType}/popular`)
    const onCurrentTab = (tab) => {
        setMediaType(tab === 'Movies' ? 'movie' : 'tv')
    }

    return (
        <div className="relative mb-[70px]">
            <div className="contentWrapper flex items-center justify-between mb-5">
                <span
                    className=" text-2xl text-white font-normal">
                    Popular
                </span>
                <SwitchTabs data={['Movies', 'TV Shows']} onCurrentTab={onCurrentTab} />
            </div>
            <Row data={data?.results} loading={loading} mediaType={mediaType} />
        </div>
    )
}

export default Popular
