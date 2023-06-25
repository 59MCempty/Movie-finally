import React, { useState} from 'react'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs.jsx'
import useFetch from '../../../hooks/useFetch.jsx'
import Row from '../../../components/row/Row.jsx'

const Trending = () => {
    const [timeWindow, setTimeWindow] = useState('day')
    const { data, loading } = useFetch(`trending/all/${timeWindow}`)
    const onCurrentTab = (tab) => {
        setTimeWindow(tab === 'Day' ? 'day' : 'week')
    }

    return (
        <div className="relative mb-[70px]">
            <div className="contentWrapper flex items-center justify-between mb-5">
                <span
                    className=" text-2xl text-white font-normal">
                    Trending
                </span>
                <SwitchTabs data={['Day', 'Week']} onCurrentTab={onCurrentTab} />
            </div>
            <Row data={data?.results} loading={loading} />
        </div>
    )
}

export default Trending
