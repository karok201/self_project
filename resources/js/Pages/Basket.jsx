import React, {useEffect, useState} from "react";
import Layout from "@/Layouts/Layout";
import {InertiaLink} from "@inertiajs/inertia-react";
import {MinusCircleIcon, PlusCircleIcon, XCircleIcon} from "@heroicons/react/24/outline";
import {ClockIcon, QuestionMarkCircleIcon, ShoppingCartIcon} from "@heroicons/react/20/solid";

export default function Basket({user}) {

    const [products, setProducts] = useState(localStorage.getItem('basket')
        ? JSON.parse(localStorage.getItem('basket'))
        : []
    );

    const [bid, setBid] = useState(() => {
        let bid = 0
        products.forEach(product => {
            bid += product.price * product.count
        });
        return bid;
    })

    console.log(bid)

    const minusCount = (product) => {
        setProducts(products.map(p => {
            if (p.id === product.id && p.count !== 1) {
                p.count -= 1;
            }
            return p;
        }))
    }

    const plusCount = (product) => {
        setProducts(products.map(p => {
            if (p.id === product.id) {
                p.count += 1;
            }
            return p;
        }))
    }

    return (
        <Layout user={user}>
            <>
                <div className="w-[100%] lg:w-[50%] mx-auto text-white items-center text-center">
                    <ul>
                        {products.map(product => (
                            <li className="w-full flex border-b-[1px] border-gray-700 p-4">
                                <div className="flex mx-auto space-x-6">
                                    <div>
                                        <img src={product.image}
                                             alt="image"
                                             className="h-20"
                                        />
                                    </div>
                                    <div className="w-32">
                                        <div>{product.title}</div>
                                        <div>
                                            {product.weight !== null
                                                ? product.weight + ' г '
                                                : '1 шт'
                                            }
                                            /
                                            <span className="font-bold"> {product.price} р</span>
                                        </div>
                                        <div className="flex items-center select-none">
                                            <MinusCircleIcon
                                                className="h-7 ml-auto cursor-pointer hover:text-lime-500 transition"
                                                onClick={() => minusCount(product)}
                                            />
                                            <span className="px-1">{product.count}</span>
                                            <PlusCircleIcon
                                                className="h-7 mr-auto cursor-pointer hover:text-lime-500 transition"
                                                onClick={() => plusCount(product)}
                                            />
                                        </div>
                                    </div>
                                    <InertiaLink className="flex items-center pl-12" href={route('product', product.id)}>
                                        <XCircleIcon className="h-10 cursor-pointer hover:text-lime-500 transition"/>
                                    </InertiaLink>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <span>Итог: {bid}</span>
                    </div>
                </div>
                <nav className="w-full px-6 h-[4.3rem] bg-[#16a34a] hover:bg-[#13843d] flex items-center justify-between fixed bottom-0 z-50 text-white cursor-pointer transition">
                    <div className="uppercase mx-auto">
                        Оформить
                    </div>
                </nav>
            </>
        </Layout>
    );
}
