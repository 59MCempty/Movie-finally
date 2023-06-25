import React from 'react'
import { useSelector } from 'react-redux'

const Genres = ({ data, custom, wrap }) => {
    const { genres } = useSelector(state => state.home)

    return (
        <div
            style={{ flexFlow: `${wrap || 'wrap'}`}}
            className={custom || `gap-1.5 hidden relative md:flex md:justify-end`}>
            {data?.map((g) => {
                if (!genres[g]?.name) return;
                return (
                    <div key={g} className="genre bg-pink py-0.5 px-1 text-sm rounded-[4px] text-white whitespace-nowrap">
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    )
}

export default Genres
