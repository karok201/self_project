import React from "react";
import {ClockIcon, QuestionMarkCircleIcon, ShoppingCartIcon} from "@heroicons/react/20/solid";

const Footer = () => {
    return (
        <nav className="w-full px-6 h-[4.3rem] flex items-center justify-between sticky bottom-0 z-40 text-white border-t-[1px] border-zinc-600">
            <div className="flex">
                <ShoppingCartIcon className="h-8" />
            </div>
            <div className="mx-auto">
                <ClockIcon className="h-8" />
            </div>
            <div className="text-right">
                <QuestionMarkCircleIcon className="h-8" />
            </div>
        </nav>
    )
}

export default Footer;
