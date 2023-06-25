import React from 'react'
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin
} from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-black3 py-12 px-0 w-full text-white">
            <div className="flex flex-col items-center">
                <ul className="list-none flex items-center justify-center gap-3.5 md:mb-7 mb-5 gap-4">
                    <li className="transition ease-out duration-300 cursor-pointer md:text-base text-xs hover:text-pink">Terms Of Use</li>
                    <li className="transition ease-out duration-300 cursor-pointer md:text-base text-xs hover:text-pink">Privacy-Policy</li>
                    <li className="transition ease-out duration-300 cursor-pointer md:text-base text-xs hover:text-pink">About</li>
                    <li className="transition ease-out duration-300 cursor-pointer md:text-base text-xs hover:text-pink">Blog</li>
                    <li className="transition ease-out duration-300 cursor-pointer md:text-base text-xs hover:text-pink">FAQ</li>
                </ul>
                <div className="text-xs leading-5 opacity-50 text-center max-w-[800px] mb-5 md:text-sm md:mb-7">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                </div>
                <div className="flex items-center justify-center gap-3">
                    <span className="w-12 h-12 rounded-full bg-black1 flex items-center justify-center cursor-pointer transition ease-out duration-300 hover:shadow-pink">
                        <FaFacebookF className="transition ease-out duration-300 hover:text-pink" />
                    </span>
                    <span className="w-12 h-12 rounded-full bg-black1 flex items-center justify-center cursor-pointer transition ease-out duration-300 hover:shadow-pink">
                        <FaInstagram className="transition ease-out duration-300 hover:text-pink" />
                    </span>
                    <span className="w-12 h-12 rounded-full bg-black1 flex items-center justify-center cursor-pointer transition ease-out duration-300 hover:shadow-pink">
                        <FaTwitter className="transition ease-out duration-300 hover:text-pink" />
                    </span>
                    <span className="w-12 h-12 rounded-full bg-black1 flex items-center justify-center cursor-pointer transition ease-out duration-300 hover:shadow-pink">
                        <FaLinkedin className="transition ease-out duration-300 hover:text-pink" />
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
