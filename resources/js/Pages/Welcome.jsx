import React from "react";
import Layout from "@/Layouts/Layout";
import {toast} from "react-toastify";

export default function Welcome({user, categories}) {
    return (
        <Layout user={user}>
            <div className="grid grid-cols-7 min-h-screen">
                <div className="col-span-1 bg-gray-800">
                    <ul>
                        {categories.map((c, i) =>
                            <li key={i} className="py-2">
                                <div
                                    className="font-bold mx-auto text-gray-700 rounded-full bg-white flex items-center justify-center font-mono h-11 w-11"
                                    // style="height: 500px; width: 500px; font-size: 170px;"
                                >404
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="col-span-6 bg-gray-900">
                </div>
            </div>
        </Layout>
    )
}
