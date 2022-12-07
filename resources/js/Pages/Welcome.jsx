import React, {useRef} from "react";
import Layout from "@/Layouts/Layout";

export default function Welcome({user, categories}) {
    const refs = categories.reduce((acc, value) => {
        acc[value.id] = React.createRef();
        return acc;
    }, {});

    console.log(categories);

    const handleClick = id =>
        refs[id].current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });

    return (
        <Layout user={user}>
            <div className="grid grid-cols-7 min-h-screen">
                <div className="bg-[#272727] fixed w-[14.3%] min-h-screen">
                    <ul>
                        {categories.map(item => (
                            <li key={item.id} className="py-2">
                                <button
                                    type="button"
                                    className="font-bold border-[1px] border-gray-200 mx-auto text-gray-200 rounded-full flex items-center justify-center font-mono h-11 w-11"
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
                                        <div className="space-y-6">
                                            <div>{product.title}</div>
                                            <div>
                                                {product.weight !== null
                                                    ? product.weight + ' г'
                                                    : '1 шт'
                                                }
                                                /
                                                <span className="font-bold">{product.price} р</span>
                                            </div>
                                        </div>
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
