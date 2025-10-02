'use client'
import { useState, useEffect } from "react";
import { Skeleton } from "./tools/Skeleton";
import { ProjectDetails } from "@/types/maintypes";
import ProjectsTable from "./ProjectsTable";

export default function PropertyOverviewTable({
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
    if(loading){
        return (<Skeleton/>);
    }else{
        return <ProjectsTable results={results}/>
    }
};