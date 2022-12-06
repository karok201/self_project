import React from "react";
import Layout from "@/Layouts/Layout";

export default function Welcome({user, categories}) {
    return (
        <Layout user={user}>
            <div className="grid grid-cols-7 min-h-screen">
                <div className="col-span-1 bg-gray-800">
                    <ul>
                        {categories.map(c =>
                            <li>{c.title}</li>
                        )}
                    </ul>
                </div>
                <div className="col-span-6 bg-gray-900">
                </div>
            </div>
        </Layout>
    )
}
