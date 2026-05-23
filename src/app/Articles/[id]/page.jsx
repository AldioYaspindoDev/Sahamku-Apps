"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useState } from "react"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import Image from "next/image"

export default function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        fetch(`${apiUrl}/news/${id}`).then((res) => res.json()).then((data) => {
            setArticle(data);
            setLoading(false);
        }).catch((err) => {
            console.error("Gagal Mengambil berita : ", err);
            setLoading(false);
        })
    }, [id]);

    if(loading) return <p className="text-center text-gray-600">Memuat Berita...</p>

    return (
        <>
        <Navbar/>
        <article className="py-24 bg-white">
            <div className="">
                <img src={article.image}
                    //  width={500}
                    //  height={100}
                     className="mx-auto w-2xl rounded-2xl mb-10"
                 />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        {article.headline}
                    </h2>
                    <p className="mt-4 text-xl mb-4 text-gray-500 font-light max-w-2xl mx-auto">
                        {article.summary}
                    </p>
                    <a href={article.url}
                className="text-gray-500 hover:text-blue-500 mx-auto"
                >Read More Here ...</a>
                </div>
            </div>

        </article>
        <Footer/>
        </>
    );
}