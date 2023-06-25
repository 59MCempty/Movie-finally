import React, { useState, useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { SlMenu } from 'react-icons/sl'
import { VscChromeClose } from 'react-icons/vsc'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../../assets/movix-logo.svg'
import ContentWrapper from '../../contentWrapper/ContentWrapper.jsx'

const Header = () => {
    const navigate = useNavigate()
    const [isScroll, setIsScroll] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)
    const [showSearch, setShowSearch] = useState('')
    const [search, setSearch] = useState('')
    const location = useLocation()
    const openSearch = () => {
        setMobileMenu(false)
        setShowSearch(true)
    }

    const openMobileMenu = () => {
        setMobileMenu(true)
        setShowSearch(false)
    }


    const SubmitAction = (e) => {
        if (e.key === 'Enter' && search.length > 0) {
            navigate(`/search/${search}`)
            setTimeout(() => {
                setShowSearch(false)
            }, 1000)
        }
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 75) {
            setIsScroll(true)
        }
        else {
            setIsScroll(false)
        }
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <header className={`header ${mobileMenu ? 'mobileView' : ''} ${isScroll === true ? 'bg-black3' : "bg-transparent backdrop-blur-sm" }`}>
            <div className="wrapper">
                <div>
                    <img
                        onClick={() => navigate('/')}
                        className="w-32 h-10 cursor-pointer"
                        src={logo}
                        alt="logo"
                        sizes={32} />
                </div>

                <ul className={`menuItems ${mobileMenu ? 'menuItemsMobile' : ''} `}>
                    <li
                        onClick={() => navigate(`/explore/movie`)}
                        className={`menuItem ${mobileMenu ? 'ItemMobile' : ''}`}>Movie</li>
                    <li
                        onClick={() => navigate(`/explore/tv`)}
                        className={`menuItem ${mobileMenu ? 'ItemMobile' : ''}`}>TV Shows</li>
                    <li className={`menuItem ${mobileMenu ? 'ItemMobile' : ''}`}><HiOutlineSearch
                        className="cursor-pointer" onClick={openSearch}
                    /></li>
                </ul>

                <div className={`flex items-center gap-5 md:hidden block`}>
                    <HiOutlineSearch className="cursor-pointer" onClick={openSearch} />
                    {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} />}
                </div>
            </div>

            {showSearch && (
                <div className={`w-full absolute h-14 left-0 top-14 bg-white`}>
                    <ContentWrapper>
                        <div className="flex items-center h-12 mt-1.5 w-full">
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyUp={SubmitAction}
                                className="w-full h-10 bg-white outline-0 border-0 py-0 px-3.5 text-xl"
                                type="text"
                                placeholder="please type something ..." />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                                className="text-black text-xl shrink-0 ml-2.5 cursor-pointer" />
                        </div>
                    </ContentWrapper>
                </div>
            )}


        </header>
    )
}

export default Header
