'use client'
import { useState, useEffect } from "react";
import CardImage from "./tools/CardImage";
import { Skeleton } from "./tools/Skeleton";
import { Communities } from "@/types/maintypes";
import { useTranslations } from "next-intl";
import slugify from "react-slugify";

export default function PopularCommunity(props:any){
    const [data, setData] = useState<Communities[]>([]);
    const [isLoading, setLoading] = useState(true);
    const mt = useTranslations('MainTranslation');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/getcommunities/?sort=community`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <>
        <h1 className='text-2xl text-center my-5'>{mt('popular_communities')}</h1>
        <div className={props.className}>
            <ul className="flex flex-nowrap space-x-4 md:justify-center overflow-auto">
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
                            {data.slice(0, 8).map((post:any,index:any) => { 
                                const title = post.name;
                                const href = `/projects/${slugify(post.cityname)}/${slugify(post.name)}`;
                                const image = `https://admin.elbayt.com/files/image/id/${post.document_id}/checksum/${post.checksum}/${post.docuname}`;
                                return (<li key={index} className="flex-none w-40">
                                    <CardImage key={index} name={title} image={image} href={href}/>
                                    </li>)
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
            </ul>
        </div>
        </>
    );
};