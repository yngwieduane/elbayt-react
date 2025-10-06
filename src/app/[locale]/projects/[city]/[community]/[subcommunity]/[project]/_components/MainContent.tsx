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
import SimilarProjects from "@/app/[locale]/_components/SimilarProjects";
import slugify from "react-slugify";
import ProjectCardWithParag from "@/app/[locale]/_components/ProjectCardWithParag";
import ProjectCardWithDescription from "@/app/[locale]/_components/ProjectCardWithDescription";
import CommunityCardWithDescription from "@/app/[locale]/_components/CommunityCardWithDescription";
import DeveloperCardWithDescription from "@/app/[locale]/_components/DeveloperCardWithDescription";
export default function MainContent(props:any) {
    const project = props.data;
    const mt = useTranslations('MainTranslation');
    let locationPlan,masterPlan,floorplans;
    const coordinates = project.coords_coords?.split(",")?? "";
    const youtubevid = project.youtube?? "";
    const featuredImg = `https://admin.elbayt.com/files/image/id/${project.media?.images.exterior[0].id}/checksum/${project.media?.images.exterior[0].checksum}/${project.media?.images.exterior[0].name}`;

    const [fancyboxRef] = useFancybox({
        // Your custom options
    });
    const [fancyboxRef1] = useFancybox({
        // Your custom options
    });

    {project.media?.images.locationmap.length !== 0
        ? locationPlan = `https://admin.elbayt.com/files/image/id/${project.media?.images.locationmap[0].id}/checksum/${project.media?.images.locationmap[0].checksum}/${project.media?.images.locationmap[0].name}`
        : locationPlan = '';
    }

    {project.media?.images.masterplan.length !== 0
        ? masterPlan = `https://admin.elbayt.com/files/image/id/${project.media?.images.masterplan[0].id}/checksum/${project.media?.images.masterplan[0].checksum}/${project.media?.images.masterplan[0].name}`
        : masterPlan = '';
    }

    {project.floorplans === 0
        ? floorplans = ''
        : floorplans = project.floorplans;
    }
    const projectName = mt(slugify(project?.name, { delimiter: '_' }));
    return (
        <>  

            <div className="grid grid-cols-1 gap-5">
                <MainFacts data={project}/>
                {floorplans !== '' ? (
                <div className="my-5">
                    <h2 className="text-xl md:text-3xl mb-4">{projectName} {mt("floor_plan")}</h2>
                    <FloorPlans data={floorplans}/>
                </div>
                ) : ("")}
                <div className="my-5">
                    <h2 className="text-xl md:text-3xl mb-4">{projectName} {mt("location_map")}</h2>
                    <MapComponent latitude={coordinates['0']} longitude={coordinates['1']} fallbackImage="" height="100%" />
                </div>
                {youtubevid !== '' ? (
                <div className="my-5">
                    <h2 className="text-xl md:text-3xl mb-4">{projectName} {mt("video")}</h2>
                    <iframe src={youtubevid} className="w-full h-[200px] md:h-[700px]" />
                </div>
                ) : ("")}
                {masterPlan !== '' ? (
                <div className="my-5" ref={fancyboxRef}>
                    <h2 className="text-xl md:text-3xl mb-4">{projectName} {mt("master_plan")}</h2>
                    <a data-fancybox="masterplan" href={masterPlan}><Image src={masterPlan} alt="Master Plan" width={1000} height={500} className="w-full"/></a>
                </div>
                ) : ("")}
                {locationPlan !== '' ? (
                <div className="my-5" ref={fancyboxRef1}>
                    <h2 className="text-xl md:text-3xl mb-4">{projectName} {mt("map")}</h2>
                    <a data-fancybox="locationplan" href={locationPlan}><Image src={locationPlan} alt="Map" width={1000} height={500} className="w-full"/></a>
                </div>
                ) : ("")}
                <div className="my-5" ref={fancyboxRef1}>
                    <h2 className="text-2xl mb-5 text-center">{mt("similar_projects_in")} {mt(slugify(project?.main?.community_name, { delimiter: '_' }))} </h2>
                    <SimilarProjects developerid="" communityid={project?.main?.community_id} />
                </div>
                <div className="my-5" ref={fancyboxRef1}>
                    <h2 className="text-2xl mb-5 text-center">{mt("projects_by")} {mt("projects_by")} {mt(slugify(project?.main?.developer_name, { delimiter: '_' }))} </h2>
                    <SimilarProjects communityid="" developerid={project?.main?.developer_id} />
                </div>
                <div>
                    <ProjectCardWithDescription results={project}/>
                </div>
                <div>
                    <CommunityCardWithDescription id={project.main?.community_id}/>
                </div>
                <div>
                    <DeveloperCardWithDescription id={project?.main?.developer_id} />
                </div>

            </div>

            {/* 
            <h2 className="text-2xl">Projects by {project?.main?.developer_name}</h2>
            <h2 className="text-2xl">{project?.name} Faqs</h2> */}
        </>
    );
}