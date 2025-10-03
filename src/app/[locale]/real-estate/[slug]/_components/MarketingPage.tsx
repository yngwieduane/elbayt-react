'use client'
import { useState, useEffect } from "react";
import { Developer } from "@/types/maintypes";
import { Link } from "@/i18n/navigation";
import { useFormatter, useLocale } from "next-intl";
import { Skeleton } from "@/app/[locale]/_components/tools/Skeleton";
import PropertyBox from "./PropertyBox";
import PropertyBoxWithParag from "./PropertyBoxWithParag";
import Image from "next/image";
import PropertyTable from "./PropertyTable";

export default function MarketingPage({
    slug
  }: {
    slug: string;
  }){
    const [data, setData] = useState<Developer[]>([]);
    const [isLoading, setLoading] = useState(true);
    const format = useFormatter();
    const locale = useLocale();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/getrealestate/?page=1&slug=${slug}`
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
    }, [slug]);
    return (
        <div className="grid grid-cols-1 gap-5">
            {isLoading ? (
                <>
                    <Skeleton/>
                </>
            ) : (
                <>
                {data.length > 0 && (
                    <>  
                        {data.map((post:any,index:any) => { 
                            let HOdate, description,title;
                            const youtube = post.youtube_url;
                            const image = `https://admin.elbayt.com/files/image/id/${post.document_id}/checksum/${post.checksum}/${post.docuname}`;

                            switch (locale) {
                                case 'en':
                                    description = post.description;
                                    title = post.name;
                                    break;
                                case 'ar':
                                    description = post.description_ar;
                                    title = post.name_ar;
                                    break;
                                case 'ru':
                                    description = post.description_ru;
                                    title = post.name_ru;
                                    break;
                            
                                default:
                                    description = post.description;
                                    title = post.name;
                                    break;
                            }

                            if(post.create_dt){
                            HOdate = new Date(post.create_dt);
                            HOdate = format.dateTime(HOdate, {year: 'numeric',month: 'short',day: 'numeric'});
                            }else{
                            HOdate = false;
                            }
                            return (
                                <article className="" key={index}>
                                    <h1 className='text-center text-3xl my-5'>{title}</h1>
                                    <Image src={image} alt={title} width={300} height={200} className="ltr:float-right rtl:float-left rounded-2xl bg-gray-50 object-cover" />
                                    <p className="whitespace-break-spaces">{description}</p>
                                    {youtube !== '' ? (
                                    <div className="my-5">
                                        <iframe src={youtube} className="w-full h-[200px] md:h-[700px]" />
                                    </div>
                                    ) : ("")}
                                    <div className="my-10 py-10">
                                        <PropertyBox property={post.property_id} />
                                    </div>
                                    <div className="my-10 py-10">
                                        <PropertyBoxWithParag property={post.property_id} />
                                    </div>
                                    <div className="my-10 py-10">
                                        <PropertyTable property={post.property_id} />
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