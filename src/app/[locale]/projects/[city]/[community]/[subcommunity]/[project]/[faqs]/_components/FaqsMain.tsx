'use client'
import { useState, useEffect } from "react";
import { ProjectDetails } from "@/types/maintypes";
import { Skeleton } from "@/app/[locale]/_components/tools/Skeleton";
import FaqsContent from "./FaqsContent";
import BreadcrumbCustom from "@/app/[locale]/_components/tools/BreadcrumbCustom";
export default function FaqsMain({
    project,faqs
}:{
    project:string;faqs:string;
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
            {loading ? (
                <Skeleton />
            ) : (
                <>
                <FaqsContent data={results} faqs={faqs} />
                </>
            )}
        </>
    );
}