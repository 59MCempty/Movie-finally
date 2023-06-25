import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import Image from '../../LazyLoadImage/LazyloadImage'

const MovieCard = ({ data, fromSearch, mediaType,pixel }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data?.poster_path
        ? url.posterPath + data?.poster_path
        : PosterFallback;
    return (
        <div
            className="w-[calc(50%-5px] mb-[25px] cursor-pointer shrink-0 lg:w-[calc(20%-16px)] md:w-[calc(25%-15px)]"
            onClick={() =>
                navigate(`/${data?.media_type || mediaType}/${data?.id}`)
            }
        >
            <div className={`posterBlockCard rounded-[12px] hover:opacity-50 mb-[${pixel || "20"}px]`}>
                <Image className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating
                            circle="w-[40px] h-[40px] relative top-[30px] bg-white shrink-0"
                            rating={data?.vote_average.toFixed(1)} />
                        <Genres
                            custom="hidden relative md:flex justify-end"
                            data={data?.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlockCard text-white flex flex-col ">
                <span className="titleCard text-base mb-2.5 leading-6 md:text-xl">{data?.title || data?.name}</span>
                <span className="dateCard text-sm opacity-50">
                    {dayjs(data?.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;
