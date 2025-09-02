'use client'
import useFancybox from "@/app/[locale]/_components/tools/useFancybox";
import { Button } from "@headlessui/react";
import { Compass, FileText, GalleryThumbnails, Info, MapIcon, MapPin, PaperclipIcon, PencilIcon, RectangleGoggles, RectangleGogglesIcon, Scan, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useEffect } from "react";
import MainFacts from "./MainFacts";
import FloorPlans from "./FloorPlans";
import MapComponent from "@/app/[locale]/_components/functions/MapComponent";
export default function MainContent(props:any) {
    const project = props.data;
    const t = useTranslations('PropertyPage');

    const coordinates = project.coords_coords?.split(",")?? "";
    const youtubevid = project.youtube?? "";
    const featuredImg = `https://admin.elbayt.com/files/image/id/${project.media?.images.exterior[0].id}/checksum/${project.media?.images.exterior[0].checksum}/${project.media?.images.exterior[0].name}`;
    const masterPlan = `https://admin.elbayt.com/files/image/id/${project.media?.images.masterplan[0].id}/checksum/${project.media?.images.masterplan[0].checksum}/${project.media?.images.masterplan[0].name}`;
    const locationPlan = `https://admin.elbayt.com/files/image/id/${project.media?.images.locationmap[0].id}/checksum/${project.media?.images.locationmap[0].checksum}/${project.media?.images.locationmap[0].name}`;

    const [fancyboxRef] = useFancybox({
        // Your custom options
    });
    const [fancyboxRef1] = useFancybox({
        // Your custom options
    });
    return (
        <>  

            <div className="grid grid-cols-1 gap-5">
                <MainFacts data={project}/>
                <div className="my-5">
                    <h2 className="text-xl md:text-3xl mb-4">{project?.name} Floor Plan</h2>
                    <FloorPlans data={project.floorplans}/>
                </div>
                <div className="my-5">
                    <h2 className="text-xl md:text-3xl mb-4">{project?.name} Location Map</h2>
                    <MapComponent latitude={coordinates['1']} longitude={coordinates['0']} fallbackImage="" height="100%" />
                </div>
                <div className="my-5">
                    <h2 className="text-xl md:text-3xl mb-4">{project?.name} Video</h2>
                    <iframe src={youtubevid} className="w-full h-[200px] md:h-[700px]" />
                </div>
                <div className="my-5" ref={fancyboxRef}>
                    <h2 className="text-xl md:text-3xl mb-4">{project?.name} Master Plan</h2>
                    <a data-fancybox="masterplan" href={masterPlan}><Image src={masterPlan} alt="Master Plan" width={1000} height={500} className="w-full"/></a>
                </div>
                <div className="my-5" ref={fancyboxRef1}>
                    <h2 className="text-xl md:text-3xl mb-4">{project?.name} Map</h2>
                    <a data-fancybox="locationplan" href={locationPlan}><Image src={locationPlan} alt="Map" width={1000} height={500} className="w-full"/></a>
                </div>

            </div>

            {/* <h2 className="text-2xl">Similar Projects in {project?.main?.community_name}</h2>
            <h2 className="text-2xl">Projects by {project?.main?.developer_name}</h2>
            <h2 className="text-2xl">{project?.name} Faqs</h2> */}
        </>
    );
}