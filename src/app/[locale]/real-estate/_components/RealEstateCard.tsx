'use client'
import { useState, useEffect } from "react";
import { Developer } from "@/types/maintypes";
import { Skeleton } from "../../_components/tools/Skeleton";
import CardImage from "../../_components/tools/CardImage";
import { Link } from "@/i18n/navigation";
import Pagination from "../../_components/tools/Pagination";
import { useFormatter } from "next-intl";

export default function RealEstateCard({
    page
  }: {
    page: number;
  }){
    const [data, setData] = useState<Developer[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const format = useFormatter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/getrealestate/?page=${page}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result.result);
                setTotalPage(Math.ceil(Number(result.total) / 10));
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page]);
    return (
        <div className="grid grid-cols-1 gap-5">
            <Pagination totalPages={totalPage} />
            {isLoading ? (
                <>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </>
            ) : (
                <>
                {data.length > 0 && (
                    <>
                        {data.map((post:any,index:any) => { 
                            const title = post.name;
                            const description = post.description;
                            const href = `/real-estate/${post.custom_url}`;
                            const image = `https://admin.elbayt.com/files/image/id/${post.document_id}/checksum/${post.checksum}/${post.docuname}`;

                            let HOdate;
                            if(post.create_dt){
                            HOdate = new Date(post.create_dt);
                            HOdate = format.dateTime(HOdate, {year: 'numeric',month: 'short',day: 'numeric'});
                            }else{
                            HOdate = false;
                            }
                            return (
                                <article key={index} className="relative isolate flex flex-col gap-5 lg:flex-row rounded-lg w-full border border-gray-300 p-2 items-center">
                                    <div className="relative w-full h-52 sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                                        <img
                                        alt=""
                                        src={image}
                                        className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                                        />
                                        <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                                        <div className="absolute left-5 md:hidden bottom-5 z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                            {title}
                                        </div>
                                        <div className="absolute right-5 md:hidden bottom-5 z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                            {title}
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="flex items-center gap-x-4 text-xs">
                                        </div>
                                        <div className="group relative max-w-xl">
                                            <h3 className="mt-0 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                                <Link href={`${href}`} >
                                                    <span className="absolute inset-0 " />
                                                    <p className="">{title}</p>
                                                </Link>
                                            </h3>
                                            <p className="mt-2 md:mt-5 text-normal/6 text-gray-600 truncate">{description}</p>
                                            <p className="hidden md:flex mt-2 md:mt-5 text-sm/6 text-gray-500">Elbayt Real Estate</p>
                                            <p className="hidden md:flex text-sm/6 text-gray-500">{HOdate}</p>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </>
                )}
                </>
            )}
            {!data ? (
                <p>No properties found.</p>
            ) : (
                <></>
            )}
        </div>
    );
};