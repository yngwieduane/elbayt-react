'use client'
import { useState, useEffect } from "react";
import { ProjectDetails } from "@/types/maintypes";
import { Skeleton } from "@/app/[locale]/_components/tools/Skeleton";
import ProjectsButtons from "./ProjectsButtons";
export default function ProjectButtonWrap(props:any) {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<ProjectDetails[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/getprojectbyid?id=${props.propertyid}`);
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
                {loading ? (
                    <Skeleton />
                ) : (
                    <>
                        <ProjectsButtons data={results}/>
                    </>
                )}
            </div>
        </>
    );
}