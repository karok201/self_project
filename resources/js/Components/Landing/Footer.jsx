import React, {useEffect, useState} from "react";
import {ClockIcon, QuestionMarkCircleIcon, ShoppingCartIcon} from "@heroicons/react/20/solid";
import {InertiaLink} from "@inertiajs/inertia-react";

const Footer = () => {

    const [bid, setBid] = useState(0)

    useEffect(() => {
        const products = localStorage.getItem('basket')
            ? JSON.parse(localStorage.getItem('basket'))
            : []
        ;
        let bid = 0
        products.forEach(product => {
            bid += product.price * product.count
        });
        setBid(bid)
    }, [])

    return (
        <nav className="w-full px-6 h-[4.3rem] flex items-center justify-between sticky bottom-0 z-40 text-white border-t-[1px] border-zinc-600">
            <InertiaLink className="w-[20%] flex items-center" href={route('basket')}>
                <ShoppingCartIcon className="h-8" />
                <span className="px-2">{bid} р</span>
            </InertiaLink>
            <div className="w-[10%] min-w-0"></div>
            <div className="w-[40%]">
                <ClockIcon className="h-8 mx-auto" />
            </div>
            <div className="w-[10%] min-w-0"></div>
            <div className="w-[20%] text-right">
                <QuestionMarkCircleIcon className="h-8 ml-auto" />
            </div>
        </nav>
    )
}

export default Footer;
