'use client'
import { useState, useEffect } from "react";
import { Skeleton } from "./tools/Skeleton";
import { Developer } from "@/types/maintypes";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import slugify from "react-slugify";

export default function DeveloperCardWithDescription(props:any){
    const [data, setData] = useState<Developer[]>([]);
    const [isLoading, setLoading] = useState(true);
    const mt = useTranslations('MainTranslation');
    const locale = useLocale();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/getdeveloperbyid/?id=${props.id}`
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
        {isLoading ? (
            <>
                <Skeleton/>
            </>
        ) : (
            <>
            {data.length > 0 && (
                <>
                    {data.map((post:any,index:any) => { 
                        let description;
                        const title = post.name;
                        const href = "";
                        const image = `https://admin.elbayt.com/files/image/id/${post.document_id}/checksum/${post.checksum}/${post.docuname}`;
                            switch (locale) {
                            case 'e`n':
                                description = post.description;
                                break;
                            case 'ar':
                                description = post.description_ar;
                                break;
                            case 'ru':
                                description = post.description_ru
                                break;
                        
                            default:
                                description = post.description;
                                break;
                        }
                        return (
                            <div key={index}>
                                <h2 className="text-3xl text-center mb-5">{mt(slugify(title, { delimiter: '_' }))} {mt("lifestyle")}: {mt("an_insider_s_guide_to_egypt_s_real_estate_developer")}</h2>
                                <Image src={image} alt={`Image of ${title}`} width={300} height={200} className="ltr:float-right rtl:float-left rounded-2xl bg-gray-50 object-cover h-50 w-92" />
                                <div dangerouslySetInnerHTML={{ __html: description }} />
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
        </>
    );
};