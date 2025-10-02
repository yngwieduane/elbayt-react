'use client'
import { useState, useEffect } from "react";
import { Offers } from "@/types/maintypes";
import { Link } from "@/i18n/navigation";
import { useFormatter } from "next-intl";
import { Skeleton } from "@/app/[locale]/_components/tools/Skeleton";
import Image from "next/image";
import ProjectsButtons from "@/app/[locale]/_components/ProjectsButtons";
import ProjectButtonWrap from "@/app/[locale]/_components/ProjectButtonWrap";

export default function OfferSingle({
    slug
  }: {
    slug: string;
  }){
    const [data, setData] = useState<Offers[]>([]);
    const [isLoading, setLoading] = useState(true);
    const format = useFormatter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/getoffers/?page=1&slug=${slug}`
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
                            const description = post.description_en;
                            const youtube = post.youtube_url;
                            const image = `https://admin.elbayt.com/files/image/id/${post.document_id}/checksum/${post.checksum}/${post.docuname}`;

                            const properties = JSON.parse(post.property_id);
                            let HOdate;
                            if(post.create_dt){
                            HOdate = new Date(post.create_dt);
                            HOdate = format.dateTime(HOdate, {year: 'numeric',month: 'short',day: 'numeric'});
                            }else{
                            HOdate = false;
                            }
                            return (
                                <article  key={index}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center mb-5">
                                        <Image src={image} alt="test" width={700} height={500}/>
                                        <div>
                                            <p className="whitespace-break-spaces">{description}</p>
                                            <ProjectButtonWrap propertyid={properties[0]}/> 
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