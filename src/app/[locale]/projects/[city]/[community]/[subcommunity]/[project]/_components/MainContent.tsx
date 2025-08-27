'use client'
import useFancybox from "@/app/[locale]/_components/tools/useFancybox";
import { Button } from "@headlessui/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useEffect } from "react";
export default function MainContent(props:any) {
    const project = props.data;
    const t = useTranslations('PropertyPage');

    const unimultitype = project?.property_type1;
    let typeTitle;
    if(unimultitype){
        const jsonObject = JSON.parse(unimultitype);
        console.log(jsonObject);
        typeTitle = jsonObject
            .map((type:any) => t(`${type}`))
            .join(', ');
    }

    const [fancyboxRef] = useFancybox({
        // Your custom options
    });
    
    const featuredImg = `https://admin.elbayt.com/files/image/id/${project.media?.images.Exterior[0].id}/checksum/${project.media?.images.Exterior[0].checksum}/${project.media?.images.Exterior[0].name}`;
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <h1 className="text-3xl">{project?.name}: {typeTitle} in {project.main?.community_name} Egypt</h1>
                <div className="text-end" id={project.main?.projectID}><Button className="bg-ebGreen text-white text-xl rounded px-5 py-2 cursor-pointer border border-bg-ebGreen data-hover:bg-ebLightGreen data-hover:data-active:bg-ebLightGreen data-hover:text-ebGreen data-hover:data-active:text-ebGreen">Ask For Price</Button></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">
                <div>
                    <div ref={fancyboxRef}>
                        <a data-fancybox="gallery" href={featuredImg}>
                            <div className="aspect-h-2 aspect-w-4 overflow-hidden bg-gray-100 relative rounded-lg">
                                {featuredImg !== '' ? (
                                    <Image
                                        src={featuredImg}
                                        alt={featuredImg}
                                        className="h-[500px] w-full"
                                        width={500}
                                        height={800}
                                    />
                                    ) : (
                                    <div className='w-full h-[500px] bg-light'></div>
                                )}
                            </div>
                        </a>
                    </div>
                </div>
                <div className="grid gap-5  p-10">
                    <div className="grid gap-5 p-10">
                        <div className="grid text-xl/6">
                            <p className="text-lg font-light">Area Range</p>
                            <p>{project.main?.area_range_min} sqm to {project.main?.area_range_max}sqm</p>
                        </div>
                        <div className="grid text-2xl">
                            <p className="text-lg font-light">Unit Types</p>
                            <p>{typeTitle}</p>
                        </div>
                        <div className="grid text-2xl">
                            <p className="text-lg font-light">Project Type</p>
                            <p>Area Range</p>
                        </div>
                        <div className="grid text-2xl">
                            <p className="text-lg font-light">Developer</p>
                            <p>{project.main?.developer_name}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <button className="bg-ebGreen text-white text-xl rounded px-5 py-2 cursor-pointer border border-bg-ebGreen data-hover:bg-ebLightGreen data-hover:data-active:bg-ebLightGreen data-hover:text-ebGreen data-hover:data-active:text-ebGreen">WhatsApp</button>
                        <button className="bg-ebGreen text-white text-xl rounded px-5 py-2 cursor-pointer border border-bg-ebGreen data-hover:bg-ebLightGreen data-hover:data-active:bg-ebLightGreen data-hover:text-ebGreen data-hover:data-active:text-ebGreen">Call</button>
                    </div>
                </div>
            </div>
        </>
    );
}