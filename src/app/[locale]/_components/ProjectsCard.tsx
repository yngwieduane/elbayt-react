'use client'
import { useState, useEffect } from "react";
import { Skeleton } from "./tools/Skeleton";
import { ProjectDetails } from "@/types/maintypes";
import slugify from "react-slugify";
import CardImageWithDetails from "./tools/CardImageWithDetails";
import { useTranslations } from "next-intl";
import Pagination from "./tools/Pagination";

export default function ProjectsCard(props:any){
    const [data, setData] = useState<ProjectDetails[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const developerid = props.developerid;
    const t = useTranslations('PropertyPage');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/getprojectslist/?developerid=${developerid}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result.result);
                setTotalPage(result.total);
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
            <Pagination totalPages={totalPage}/>
            <div className={props.className}>
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