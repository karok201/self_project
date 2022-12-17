import React, {useState} from "react";
import Layout from "@/Layouts/Layout";
import {InertiaLink} from "@inertiajs/inertia-react";
import {XCircleIcon} from "@heroicons/react/24/outline";

export default function Basket({user}) {

    const [products, setProducts] = useState(localStorage.getItem('basket')
        ? JSON.parse(localStorage.getItem('basket'))
        : []
    );

    return (
        <Layout user={user}>
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
                                <InertiaLink className="flex items-center pl-12" href={route('product', product.id)}>
                                    <XCircleIcon className="h-10 cursor-pointer hover:text-lime-500 transition"/>
                                </InertiaLink>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}
