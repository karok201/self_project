import React from "react";
import BurgerBtn from "@/Components/BurgerBtn";
import {ArrowLeftOnRectangleIcon} from "@heroicons/react/20/solid";
import {Link, useForm} from "@inertiajs/inertia-react";

const Nav = ({ menuActive, setActive, authMenuActive, setAuthMenuActive, user }) => {
    const {get} = useForm();
    return (
        <nav className="px-6 h-[4.3rem] flex items-center justify-between text-white sticky top-0 z-50 border-b-[1px] border-zinc-600">
            <div className='cursor-pointer' onClick={() => {
                setActive(!menuActive);
            }}>
                <BurgerBtn isActive={menuActive} />
            </div>
            <Link href={route('welcome')}>
                <img src="https://assets.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e3a57bdb3c59ebf9ceb_Product_Light.svg" className="w-32" alt=""/>
            </Link>
            <div className="flex">
                {user
                    ? <Link href={route('logout')} method="post" as="button">
                        <ArrowLeftOnRectangleIcon className="h-7 pr-3 text"/>
                    </Link>
                    : null
                }
                <div className={`cursor-pointer ${user ? 'text-lime-500' : ''}`} onClick={() => {
                    if (user) {
                        get(route('profile.edit'));
                    } else {
                        setAuthMenuActive(!authMenuActive)
                    }
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"/>
                    </svg>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
