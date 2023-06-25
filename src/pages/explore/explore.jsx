import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Select from 'react-select'

import useFetch from '../../hooks/useFetch'
import fetchApi from '../../utils/axiosInstance.js'
import MovieCard from '../../components/movieCard/MovieCard'
import Spinner from '../../components/spinner/Spinner'

let filters = {}

const sortbyData = [
    { value: 'popularity.desc', label: 'Popularity Descending' },
    { value: 'popularity.asc', label: 'Popularity Ascending' },
    { value: 'vote_average.desc', label: 'Rating Descending' },
    { value: 'vote_average.asc', label: 'Rating Ascending' },
    {
        value: 'primary_release_date.desc',
        label: 'Release Date Descending'
    },
    { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
    { value: 'original_title.asc', label: 'Title (A-Z)' }
]

const Explore = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [genre, setGenre] = useState(null)
    const [sortby, setSortby] = useState(null)
    const { mediaType } = useParams()

    const { data: genresList } = useFetch(`genre/${mediaType}/list`)

    const fetchDataFromMediaType = async () => {
        setLoading(true)
        try {
            const response = await fetchApi(`discover/${mediaType}`, filters)
            if (response) {
                setData(response)
                setPageNum(pageNum + 1)
                setLoading(false)
            }
        } catch (err) {
            console.log(err.response)
        }
    }

    const fetchNextPageData = async () => {
        const response = await fetchApi(`discover/${mediaType}?page=${pageNum}`, filters)
        if (data?.results) {
            setData({
                ...data, results: [...data?.results, ...response?.results]
            })

        } else {
            setData(response)
        }
        setPageNum(prevState => prevState + 1)
    }

    useEffect(() => {
        filters = {}
        setData(null)
        setPageNum(1)
        fetchDataFromMediaType()
        fetchNextPageData()
    }, [mediaType])

    const onChangeEve = (selectItem, action) => {
        if (action.name === 'genres') {
            setGenre(selectItem)
            if (action.action !== 'clear') {
                let genreId = selectItem.map((item) => item.id)
                genreId = JSON.stringify(genreId).slice(1, -1)
                filters.with_genres = genreId
            } else {
                delete filters.with_genres
            }
        }

        if (action.name === 'sortby') {
            setSortby(selectItem)
            if (action.action !== 'clear') {
                filters.sort_by = selectItem.value
            } else {
                delete filters.sort_by
            }
        }

        setPageNum(1)
        fetchDataFromMediaType()
    }

    return (
        <div className="min-h-[700px] pt-[100px]">
            <div className="contentWrapper">
                <div className="flex justify-between mb-[25px] flex-col md:flex-row">
                    <div className="text-2xl leading-[34px] text-white mb-5 md:mb-0">
                        {mediaType === 'tv'
                            ? 'Explore TV Shows'
                            : 'Explore Movies'}</div>
                    <div className="filters">
                        <Select
                            closeMenuOnSelect={false}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            isMulti
                            name="genres"
                            value={genre}
                            options={genresList?.genres}
                            onChange={onChangeEve}
                            className="react-select-container genresDD"
                            placeholder="Select genres"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChangeEve}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>

                {loading && <Spinner initial={loading} />}
                {
                    !loading && (
                        <>
                            {data?.results?.length > 0 ? (
                                <InfiniteScroll
                                    style={{ flexFlow: 'row wrap' }}
                                    className="grid grid-cols-2 gap-x-5 md:flex items-start md:gap-[20px] mb-[50px]"
                                    next={fetchNextPageData}
                                    hasMore={pageNum <= data?.total_pages} l
                                    oader={<Spinner />}
                                    dataLength={data?.results?.length || []}>

                                    {data?.results?.map((item, index) => {
                                        if (item?.media_type === 'person') return
                                        return (
                                            <MovieCard
                                                key={index}
                                                data={item}
                                                mediaType={item?.media_type} />
                                        )
                                    })}
                                </InfiniteScroll>
                            ) : (
                                <span className="text-[24px] text-blackLight">
                                    Sorry, Results not Found !!!
                                </span>
                            )}
                        </>
                    )
                }
            </div>


        </div>
    )
}

export default Explore
