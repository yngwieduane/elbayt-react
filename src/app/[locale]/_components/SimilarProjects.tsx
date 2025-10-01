'use client'
import { useState, useEffect } from "react";
import CardImage from "./tools/CardImage";
import { Skeleton } from "./tools/Skeleton";
import { ProjectDetails } from "@/types/maintypes";
import slugify from "react-slugify";

export default function SimilarProjects(props:any){
    const [data, setData] = useState<ProjectDetails[]>([]);
    const [isLoading, setLoading] = useState(true);

    const communityid = props.communityid || '';
    const developerid = props.developerid || '';
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/getprojectslist?community=${communityid}&community=${developerid}&page=1`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result.result);
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
                                const main = post.main;
                                const media = post.media.images.featuredimage[0];
                                const title = main.propertyName;
                                const href =  '/projects/' + slugify(main.city_name) + "/" + slugify(main.community_name) + "/" + slugify(main.subcommunity_name) + "/" + main.project_slug;
                                const image = `https://admin.elbayt.com/files/image/id/${media.id}/checksum/${media.checksum}/${media.name}`;
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