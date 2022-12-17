import React, {useRef, useState} from "react";
import Layout from "@/Layouts/Layout";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {Inertia} from "@inertiajs/inertia";
import {InertiaLink} from "@inertiajs/inertia-react";

export default function Welcome({user, categories}) {

    const refs = categories.reduce((acc, value) => {
        acc[value.id] = React.createRef();
        return acc;
    }, {});

    const [elActive, setElActive] = useState(null);

    const handleClick = id => {
        setElActive({id: id})
        refs[id].current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    }

    const addToBasket = (product) => {
        let products = localStorage.getItem('basket')
            ? JSON.parse(localStorage.getItem('basket'))
            : []
        ;
        localStorage.setItem('basket', JSON.stringify([...products, product]))
        Inertia.get(route('welcome'))
    }

    return (
        <Layout user={user}>
            <div className="grid grid-cols-7 min-h-screen">
                <div className="bg-[#193073] fixed w-[14.3%] min-h-screen">
                    <ul>
                        {categories.map(item => (
                            <li key={item.id} className="py-2">
                                <button
                                    type="button"
                                    className={
                                        `font-bold border-[1px] border-gray-200 mx-auto text-gray-200 rounded-full flex items-center justify-center font-mono h-11 w-11 ${item.id === elActive?.id ? 'bg-lime-500' : ''}`
                                    }
                                    onClick={() => handleClick(item.id)}
                                >
                                    {item.title[0]}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-span-1" />
                <div className="col-span-6 bg-gray-900">
                    <ul>
                        {categories.map(item => (
                            <li
                                key={item.id}
                                ref={refs[item.id]}
                                className="text-white scroll-mt-16"
                            >
                                {item.products.map(product => (
                                    <div className="w-full flex border-b-[1px] border-gray-700 p-4 space-x-3">
                                        <div>
                                            <img src={product.image}
                                                 alt="image"
                                                 className="h-20"
                                            />
                                        </div>
                                        <div className="space-y-6 w-32">
                                            <div>{product.title}</div>
                                            <div>
                                                {product.weight !== null
                                                    ? product.weight + ' г '
                                                    : '1 шт'
                                                }
                                                /
                                                <span className="font-bold"> {product.price} р</span>
                                            </div>
                                        </div>
                                        <InertiaLink className="flex items-center" href={route('product', product.id)}>
                                            <PlusCircleIcon className="h-10 cursor-pointer hover:text-lime-500 transition"/>
                                        </InertiaLink>
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}
