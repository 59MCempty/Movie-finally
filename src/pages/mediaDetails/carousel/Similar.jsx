import React from 'react'
import useFetch from '../../../hooks/useFetch.jsx'
import Row from '../../../components/row/Row.jsx'

const Similar = ({ mediaType, id }) => {
    const { data, loading } = useFetch(`${mediaType}/${id}/similar`)

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movie"

    return (
        <Row title={title} data={data?.results} loading={loading} mediaType={mediaType} />
    )
}

export default Similar
