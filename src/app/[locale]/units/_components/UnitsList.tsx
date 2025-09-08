'use client'
import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "../../_components/tools/Skeleton";
import { UnitListing } from "@/types/maintypes";
import UnitListBox from "./UnitListBox";
import { generateSeoData } from "../../_components/functions/generateSeoData";

export default function UnitsList(props:any) {

    // const data = await fetch('http://localhost:3000/api/external/units/project?unitid='+unitid+'&propertyId='+propertyId+'&beds='+beds+'&category='+category)
    // const posts = await data.json() ;

    const router = useRouter();
    const searchParams = useSearchParams();
    const unitid = searchParams.get('unitid') || '';
    const categories = searchParams.get('categories') || '';
    const propertyId = searchParams.get('propertyId') || '';
    const beds = searchParams.get('beds') || '';
    const baths = searchParams.get('baths') || '';
    const propertyType = searchParams.get('propertyType') || '';
    const currentPage = searchParams.get('currentPage') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<UnitListing[]>([]);
    const [results1, setResults1] = useState<UnitListing[]>([]);
    const [allData, setAllData] = useState<UnitListing[]>([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/getunits?propertyType=${propertyType}&category=${categories}&beds=${beds}`);
            const result = await res.json();
            setResults(result);

        } catch (error) {
            console.error("API fetch failed", error);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [categories,propertyId,currentPage,beds,baths,propertyType,maxPrice,minPrice]);

    return (
        <>
            {loading ? (
                <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </>
            ) : (
                <>
                {results.length > 0 && (
                    <>
                        {results.slice(0, 11).map((post:any,index:any) => { 
                            let maincategory;
                            {post.sellprice !== null
                                ? maincategory = "Sale"
                                : maincategory = "Rent";
                            }
                            const propertyData = {
                                bedrooms: post.rooms,
                                propertyType: post.type,
                                adType: maincategory,
                                name: post.project,
                                community: post.area,
                                emirate: post.city,
                                refNo: post.id,
                                code: post.id,
                                seoStart: "",
                            };
                            const seoData = generateSeoData(propertyData);
                            return <UnitListBox key={index} data={post} seoUrl={seoData.seoUrl}/>
                        })}
                    </>
                )}
                </>
            )}
            
        </>
    );
}
