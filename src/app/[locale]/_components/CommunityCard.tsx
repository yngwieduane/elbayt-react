'use client'
import { useState, useEffect } from "react";
import CardImage from "./tools/CardImage";
import { Skeleton } from "./tools/Skeleton";
import { Communities } from "@/types/maintypes";

export default function CommunityCard(props:any){
    const [data, setData] = useState<Communities[]>([]);
    const [isLoading, setLoading] = useState(true);

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
                        {data.slice(0, 8).map((post:any,index:any) => { 
                            const title = post.name;
                            const href = "";
                            const image = `https://admin.elbayt.com/files/image/id/${post.document_id}/checksum/${post.checksum}/${post.docuname}`;
                            return <CardImage key={index} name={title} image={image} href={href}/>
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