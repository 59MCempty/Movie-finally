import React, { useEffect, useState } from 'react'
import fetchApi from '../../utils/axiosInstance.js'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner.jsx'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieCard from '../../components/movieCard/MovieCard.jsx'

const SearchPage = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [pageNum, setPageNum] = useState(1)
    const {searchInput} = useParams()

    const fetchSearchData = async () => {
        setLoading(true)
        try {
            const response = await fetchApi(`search/multi?query=${searchInput}&page=${pageNum}`)
            setData(response)
            setPageNum(pageNum + 1)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    const fetchNextPageData = async () => {
        const response = await fetchApi(`search/multi?query=${searchInput}&page=${pageNum}`)
        if (data?.results) {
            setData({
                ...data, results: [...data?.results, ...response?.results]
            })
        }
        else {
            setData(response)
        }
        setPageNum(prevState => prevState + 1)
    }
    useEffect(() => {
        fetchSearchData()
    }, [searchInput])


    return (
        <div className="min-h-[700px] pt-[100px]">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <div className="contentWrapper">
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="text-[24px] leading-[34px] text-white mb-[25px]">{
                                `Search ${data?.total_results?.length > 1 ? "Results" : "Result"} of "${searchInput}"`
                            }</div>
                            <InfiniteScroll
                                style={{ flexFlow: 'row wrap' }}
                                className='grid grid-cols-2 gap-x-5 md:flex items-start md:gap-[20px] mb-[50px]'
                                next={fetchNextPageData} hasMore={pageNum <= data?.total_pages} loader={<Spinner />} dataLength={data?.results?.length || []}>
                                {data?.results?.map((item, index ) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard key={index} data={item} mediaType={item?.media_type} fromSearch={true} />
                                    )
                                })}
                            </InfiniteScroll>
                        </>
                    ) :
                        (
                            <span className="text-2xl text-blackLight">
                                Oops, Results Not Found, Please Try again !
                            </span>
                        )
                    }
                </div>
            )}
        </div>
    )
}

export default SearchPage
