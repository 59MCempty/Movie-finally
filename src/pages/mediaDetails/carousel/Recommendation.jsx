import React from 'react'
import useFetch from '../../../hooks/useFetch.jsx'
import Row from '../../../components/row/Row.jsx'

const Recommendation = ({mediaType, id}) => {
    const {data, loading, error} = useFetch(`${mediaType}/${id}/recommendations`)

    return (
        <Row data={data?.results} loading={loading} mediaType={mediaType} title="Recommendations" />

    )
}

export default Recommendation
