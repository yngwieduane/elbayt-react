
'use client'
import { useState, useEffect } from "react";
import { getLookupId } from "@/utils/lookup";
import { City } from "@/types/maintypes";
import slugify from "react-slugify";
import Breadcrumb from "@/app/[locale]/_components/tools/Breadcrumb";
import Pagination from "@/app/[locale]/_components/tools/Pagination";
import { Skeleton } from "@/app/[locale]/_components/tools/Skeleton";
import CardImageWithDetails from "@/app/[locale]/_components/tools/CardImageWithDetails";


export default function ProjectsPage({
    page,
    city,
    community,
    subcommunity,
    project,
    propertyname,
    isFeaturedProjectOnWeb,
    category,
    dataid,
  }: {
    page: number;
    city: string;
    community: string;
    subcommunity: string;
    project: string;
    propertyname: string;
    isFeaturedProjectOnWeb: string;
    category: string;
    dataid: string;
  }) {
    const [allData, setAllData] = useState<City[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/getprojectslist?community=${dataid}&page=${page}`);
            const result = await res.json();
            setAllData(result.result);
            setTotalPage(Math.ceil(Number(result.total) / 12));
        } catch (error) {
            console.error("API fetch failed", error);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [category,city,community,subcommunity,page]);

    return (  
        <>
        <div>
            <Breadcrumb/>
        </div>
        <div className="mx-auto container px-6 lg:px-8 mt-5">
            <h1 className="text-3xl truncate mb-5">{community} {city} Egypt Real Estate</h1>
            <div className="flex justify-between mb-5">
                <div></div>
                <Pagination totalPages={totalPage} />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {loading ? (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                ) : (
                    <>
                        {allData.map((post:any,index:any) => { 
                            const main = post.main;
                            const media = post.media;
                            const title = main.propertyName;
                            const href =  '/projects/' + slugify(main.city_name) + "/" + slugify(main.community_name) + "/" + slugify(main.subcommunity_name) + "/" + main.project_slug;
                            const image = `https://admin.elbayt.com/files/image/id/${media?.images.featuredimage[0].id}/checksum/${media?.images.featuredimage[0].checksum}/${media?.images.featuredimage[0].name}`;

                            const unimultitype = main.property_type1;
                            let typeTitle;
                            
                            return <CardImageWithDetails key={index} name={title} image={image} href={href} typeTitle={typeTitle} community={main.community_name} developer={main.developer_name} />
                        })}
                    </>
                )}
            </div>
        </div>
        </>
    );
}