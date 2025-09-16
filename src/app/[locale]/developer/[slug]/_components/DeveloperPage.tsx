'use client'
import { useEffect, useState } from "react";
import { useFormatter } from "next-intl";
import Breadcrumb from "../../../_components/tools/Breadcrumb";
import { Developer } from "@/types/maintypes";
import { Skeleton } from "@/app/[locale]/_components/tools/Skeleton";
import ProjectsCard from "@/app/[locale]/_components/ProjectsCard";

export default function DeveloperPage(props: any) {
    const format = useFormatter();

    const [data, setData] = useState<Developer[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/getdeveloper/?id=${props.slug}`
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
            <div>
                <Breadcrumb/>
            </div>
            <div className="container mx-auto my-5 px-5">
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
                                const id = post.id;
                                const href = `/developer/${post.slug}`;
                                const image = `https://admin.elbayt.com/files/image/id/${post.document_id}/checksum/${post.checksum}/${post.docuname}`;
                                return (
                                    <div key={index}>
                                        <h1 className="text-3xl mb-2 text-center mb-5">{title}</h1>
                                        <ProjectsCard className="grid grid-cols-2 md:grid-cols-4 gap-4" developerid={id}/>
                                    </div>
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
        </>
    );  
}