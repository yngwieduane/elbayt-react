'use client'
import { useState, useEffect } from "react";
import Breadcrumb from "@/app/[locale]/_components/tools/Breadcrumb";
import { Project, ProjectDetails } from "@/types/maintypes";
import { Skeleton } from "@/app/[locale]/_components/tools/Skeleton";
import MainContent from "./MainContent";
export default function PropertyPage({
    city,community,subcommunity,project
}:{
    city:string;community:string;subcommunity:string;project:string;
}) {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<ProjectDetails[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/getproject?id=${project}`);
                const result = await res.json();
                setResults(result);
            } catch (error) {
                console.error("API fetch failed", error);
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
                <div className="mx-auto container px-6 lg:px-8 mt-5 grid grid-cols-1 gap-4 ">
                {loading ? (
                    <Skeleton />
                ) : (
                    <>
                        <MainContent data={results}/>
                    </>
                )}
                </div>
            </div>
        </>
    );
}