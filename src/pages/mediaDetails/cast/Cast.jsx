import React from 'react'
import Image from '../../../LazyLoadImage/LazyloadImage'
import { useSelector } from 'react-redux'
import Avatar from "/src/assets/avatar.png"

const Cast = ({ loading, cast }) => {
    const {url} = useSelector(state => state.home)
    const skeleton = () => {
        return (
            <div>
                <div className="skeleton w-[125px] h-[125px] rounded-[50%] mb-[15px] md:w-[175px] md:h-[175px] md:mb-[25px]"></div>
                <div className="skeleton w-full h-[20px] rounded-[10px] mb-[10px]"></div>
                <div className="skeleton w-[75%] h-[20px] rounded-[15px] my-0 mx-auto"></div>
            </div>
        )
    }

    return (
        <div className="relative mb-[50px]">
            <div className="contentWrapper">
                <div className="text-[24px] text-white mb-[25px]">Cast List</div>
                {
                    !loading ? (
                            <div className="flex gap-5 overflow-y-hidden overflow-x-scroll scroll-smooth scrollbar-hide -mx-5 py-0 px-5 md:p-0 md:m-0">
                                {
                                    cast?.map((item) => {
                                        let Url_img = item?.profile_path ? url.profilePath + item?.profile_path : Avatar
                                        return (
                                            <div key={item.id} className="text-center text-white">
                                                <div className="profileImg">
                                                    <Image src={Url_img} />
                                                </div>
                                                <div className="text-sm leading-5 md:text-lg md:leading-6">{item?.name}</div>
                                                <div className="text-sm leading-5 md:text-base opacity-50 md:leading-6">{item?.character}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                        :
                        (<div className="flex gap-[20px] overflow-hidden mx-[-20px] py-0 px-[20px] md:p-0 md:m-0">
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                        </div>)
                }

                {/* skeleton */}


            </div>
        </div>
    )
}

export default Cast
