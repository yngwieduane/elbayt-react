'use client'
import { useState, useEffect } from "react";
import CardImage from "./tools/CardImage";
import { Skeleton } from "./tools/Skeleton";
import { ProjectDetails } from "@/types/maintypes";
import slugify from "react-slugify";
import ProjectsCard from "./ProjectsCard";
import ProjectCard from "./ProjectCard";

export default function PropertyOverview({
    propertyId
  }: {
    propertyId: string;
  }){
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<ProjectDetails[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/getprojectbyid?id=${propertyId}`);
                const result = await res.json();
                setResults(result);
            } catch (error) {
                console.error("API fetch failed", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [propertyId]);
    return (
        <div className="">
            {loading ? (
                <>
                    <Skeleton/>
                </>
            ) : (
                <>
                    <ProjectCard results={results}/>
                </>
            )}
        </div>
    );
};