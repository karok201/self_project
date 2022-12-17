import React, {useState} from "react";
import Layout from "@/Layouts/Layout";
import {
    PlusCircleIcon,
    MinusCircleIcon, ShoppingCartIcon
} from "@heroicons/react/24/outline";
import {Inertia} from "@inertiajs/inertia";

export default function Product({user, product}) {

    const [count, setCount] = useState(product.weight ?? 1);

    const addToBasket = (product) => {
        let products = localStorage.getItem('basket')
            ? JSON.parse(localStorage.getItem('basket'))
            : []
        ;
        product.count = count / (product.weight ?? 1);
        localStorage.setItem('basket', JSON.stringify([...products, product]))
        Inertia.get(route('welcome'))
    }

    return (
      <Layout user={user}>
          <div className="w-[90%] lg:w-[50%] mx-auto text-white items-center text-center">
              <div className="py-4">
                  <img
                      src={product.image}
                      alt=""
                      className="mx-auto h-60"
                  />
              </div>

              <div className="text-2xl font-bold">
                  {product.title}
              </div>

              <div>
                  {product.weight !== null
                      ? count + ' г '
                      : count + ' шт. '
                  }
                  /
                  <span className="font-bold"> {(count / (product.weight ?? 1)) * product.price} р</span>
              </div>

              <div className="px-4 pt-4 text-gray-300">
                  {product.description}
              </div>

              <div className="p-10 flex items-center select-none">
                  <MinusCircleIcon
                      className="h-10 ml-auto cursor-pointer hover:text-lime-500 transition"
                      onClick={() => {
                          if (count / (product.weight ?? 1) !== 1) {
                              setCount(count - (product.weight ?? 1))
                          }
                      }}
                  />
                  <span className="px-2 text-2xl">{count / (product.weight ?? 1)}</span>
                  <PlusCircleIcon
                      className="h-10 mr-auto cursor-pointer hover:text-lime-500 transition"
                      onClick={() => {
                          setCount(count + (product.weight ?? 1))
                      }}
                  />
              </div>

              <div>
                  <ShoppingCartIcon
                      className="h-20 p-2 mx-auto border-2 rounded-full border-lime-300 cursor-pointer"
                      onClick={() => {
                          addToBasket(product)
                      }}
                  />
              </div>
          </div>
      </Layout>
    );
}
