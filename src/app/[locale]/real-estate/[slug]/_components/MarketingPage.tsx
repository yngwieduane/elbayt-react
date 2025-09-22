'use client'
import { useState, useEffect } from "react";
import { Developer } from "@/types/maintypes";
import { Link } from "@/i18n/navigation";
import { useFormatter } from "next-intl";
import { Skeleton } from "@/app/[locale]/_components/tools/Skeleton";

export default function MarketingPage({
    slug
  }: {
    slug: string;
  }){
    const [data, setData] = useState<Developer[]>([]);
    const [isLoading, setLoading] = useState(true);
    const format = useFormatter();

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
                            const title = post.name;
                            const description = post.description;
                            const href = `/real-estate/${post.custom_url}`;
                            const youtube = post.youtube_url;
                            const image = `https://admin.elbayt.com/files/image/id/${post.document_id}/checksum/${post.checksum}/${post.docuname}`;

                            let HOdate;
                            if(post.create_dt){
                            HOdate = new Date(post.create_dt);
                            HOdate = format.dateTime(HOdate, {year: 'numeric',month: 'short',day: 'numeric'});
                            }else{
                            HOdate = false;
                            }
                            return (
                                <article className="" key={index}>
                                    <p className="whitespace-break-spaces">{description}</p>
                                    {youtube !== '' ? (
                                    <div className="my-5">
                                        <iframe src={youtube} className="w-full h-[200px] md:h-[700px]" />
                                    </div>
                                    ) : ("")}
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