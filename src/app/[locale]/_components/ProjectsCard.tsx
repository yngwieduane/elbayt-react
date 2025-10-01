'use client'
import { useState, useEffect } from "react";
import { Skeleton } from "./tools/Skeleton";
import { ProjectDetails } from "@/types/maintypes";
import slugify from "react-slugify";
import CardImageWithDetails from "./tools/CardImageWithDetails";
import { useTranslations } from "next-intl";
import Pagination from "./tools/Pagination";

export default function ProjectsCard({
    className,
    developerid,
    page
}:{
    className: string;
    developerid: string;
    page: number;
}){
    const [data, setData] = useState<ProjectDetails[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const t = useTranslations('PropertyPage');

    const devid = developerid || '';
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/getprojectslist/?developerid=${devid}&page=${page}`
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
        <>
            <div className="flex justify-between mb-5">
                <div>Search{totalPage}</div>
                <Pagination totalPages={totalPage} />
            </div>
            <div className={className}>
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
                                
                                const main = post.main;
                                const media = post.media;
                                const title = main.propertyName;
                                const href =  '/projects/' + slugify(main.city_name) + "/" + slugify(main.community_name) + "/" + slugify(main.subcommunity_name) + "/" + main.project_slug;
                                const image = `https://admin.elbayt.com/files/image/id/${media?.images.featuredimage[0].id}/checksum/${media?.images.featuredimage[0].checksum}/${media?.images.featuredimage[0].name}`;

                                const unimultitype = main.property_type1;
                                let typeTitle;
                                
                                if(unimultitype){
                                    const jsonObject = JSON.parse(unimultitype);
                                    console.log(jsonObject);
                                    typeTitle = jsonObject
                                        .map((type:any) => t(`${type}`))
                                        .join(', ');
                                }
                                return <CardImageWithDetails key={index} name={title} image={image} href={href} typeTitle={typeTitle} community={main.community_name} developer={main.developer_name} />
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
        </>
    );
};