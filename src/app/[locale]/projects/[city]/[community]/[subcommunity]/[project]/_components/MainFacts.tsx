'use client'
import Modal from "@/app/[locale]/_components/tools/Modal";
import useFancybox from "@/app/[locale]/_components/tools/useFancybox";
import { Button } from "@headlessui/react";
import { Compass, FileText, GalleryThumbnails, Info, MapIcon, MapPin, PaperclipIcon, PencilIcon, RectangleGoggles, RectangleGogglesIcon, Scan, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
export default function MainFacts(props:any) {
    const project = props.data;
    const [setModal, setSetModal] = useState(false);
    const [popContent, setPopContent] = useState('map');
    const [popData, setPopData] = useState('map');
    const modalHandler = (content:string,valuesarray:any) => (e:any) => {
        console.log("clicked = " + setModal);
        setPopContent(content);
        setPopData(valuesarray);
        setSetModal(true);
    };

    const modalUpdate = (event:any) => {
        console.log(event);
        setSetModal(event);
    };
    const t = useTranslations('PropertyPage');

    const unimultitype = project?.property_type1;
    let typeTitle, locationPlan, floorplans, youtubevid, masterPlan;
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
    const [fancyboxRef1] = useFancybox({
        // Your custom options
    });
    
    const featuredImg = `https://admin.elbayt.com/files/image/id/${project.media?.images.exterior[0].id}/checksum/${project.media?.images.exterior[0].checksum}/${project.media?.images.exterior[0].name}`;

    {project.floorplans !== null
        ? floorplans = `https://admin.elbayt.com/${project.floorplans}`
        : floorplans = '';
    }

    {project.youtube !== null
        ? youtubevid = project.youtube
        : youtubevid = '';
    }

    {project.media?.images.locationmap.length !== 0
        ? locationPlan = `https://admin.elbayt.com/files/image/id/${project.media?.images.locationmap[0].id}/checksum/${project.media?.images.locationmap[0].checksum}/${project.media?.images.locationmap[0].name}`
        : locationPlan = '';
    }

    {project.media?.images.masterplan.length !== 0
        ? masterPlan = `https://admin.elbayt.com/files/image/id/${project.media?.images.masterplan[0].id}/checksum/${project.media?.images.masterplan[0].checksum}/${project.media?.images.masterplan[0].name}`
        : masterPlan = '';
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <h1 className="text-lg md:text-3xl">{project?.name}: {typeTitle} in {project.main?.community_name} Egypt</h1>
                <div className="text-end" id={project.main?.projectID}><button onClick={modalHandler('contactform', project?.name)} className="bg-ebGreen text-white text-xl rounded px-5 py-2 cursor-pointer border border-bg-ebGreen hover:text-ebGreen hover:bg-ebLightGreen">Ask For Price</button></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">
                <div className="relative">
                    <div ref={fancyboxRef}>
                        <a data-fancybox="gallery" href={featuredImg}>
                            <div className="aspect-h-2 aspect-w-4 overflow-hidden bg-gray-100 relative rounded-lg">
                                {featuredImg !== '' ? (
                                    <Image
                                        src={featuredImg}
                                        alt={featuredImg}
                                        className="h-[200px] md:h-[500px] w-full"
                                        width={500}
                                        height={800}
                                    />
                                    ) : (
                                    <div className='w-full h-[200px] md:h-[500px] bg-light'></div>
                                )}
                            </div>
                        </a>
                    </div>
                    <div className="absolute w-full flex items-center bottom-0">
                        <div aria-hidden="true" className="w-full border-t border-gray-300 dark:border-white/15" />
                        <div ref={fancyboxRef1}>
                            <div className="relative flex justify-center">
                                <span className="isolate inline-flex -space-x-px rounded-md shadow-xs dark:shadow-none">
                                <a 
                                    data-fancybox="gallery" href={featuredImg}
                                    type="button"
                                    className="relative cursor-pointer inline-flex items-center rounded-l-md bg-white/90 px-3 py-2 text-gray-400 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-10"
                                >
                                    <span className="sr-only">Gallery</span>
                                    <GalleryThumbnails color="#06bbab" />
                                </a>
                                {youtubevid !== '' ? (
                                <a
                                    data-fancybox="video" href={youtubevid}
                                    type="button"
                                    className="relative cursor-pointer inline-flex items-center bg-white/90 px-3 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-10"
                                >
                                    <span className="sr-only">Video</span>
                                    <Video color="#06bbab" />
                                </a>
                                ) : ("")}
                                <button
                                    onClick={modalHandler('map', project.coords_coords)}
                                    type="button"
                                    className="relative cursor-pointer inline-flex items-center bg-white/90 px-3 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-10"
                                >
                                    <span className="sr-only">MapPin</span>
                                    <MapPin color="#06bbab" />
                                </button>
                                {masterPlan !== '' ? (
                                <a
                                    data-fancybox="masterplan" href={masterPlan}
                                    type="button"
                                    className="relative cursor-pointer inline-flex items-center bg-white/90 px-3 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-10"
                                >
                                    <span className="sr-only">Master Plan</span>
                                    <RectangleGoggles color="#06bbab" />
                                </a>
                                ) : ("")}
                                {locationPlan !== '' ? (
                                <a
                                    data-fancybox="locationplan" href={locationPlan}
                                    type="button"
                                    className="relative cursor-pointer inline-flex items-center bg-white/90 px-3 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-10"
                                >
                                    <span className="sr-only">Location Map</span>
                                    <Compass color="#06bbab" />
                                </a>
                                ) : ("")}
                                {floorplans !== '' ? (
                                <a
                                    data-fancybox="floorplans" href={floorplans}
                                    type="button"
                                    className="relative cursor-pointer inline-flex items-center bg-white/90 px-3 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-10"
                                >
                                    <span className="sr-only">Floor Plans</span>
                                    <Scan color="#06bbab" />
                                </a>
                                ) : ("")}
                                {project.brochure_url !== '' ? (
                                <button
                                    onClick={modalHandler('brochure', project.brochure_url)}
                                    type="button"
                                    className="relative cursor-pointer inline-flex items-center bg-white/90 px-3 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-10"
                                >
                                    <span className="sr-only">Brochure</span>
                                    <FileText color="#06bbab" />
                                </button>
                                ) : ("")}
                                {project.marketadditionaltext !== '' ? (
                                <button
                                    onClick={modalHandler('marketingtext', {marketText:project.marketadditionaltext,marketDate:project.featured_date})}
                                    type="button"
                                    className="relative cursor-pointer inline-flex items-center rounded-r-md bg-white/90 px-3 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-10"
                                >
                                    <span className="sr-only">Information</span>
                                    <Info color="#06bbab" />
                                </button>
                                ) : ("")}
                                </span>
                            </div>
                        </div>
                        <div aria-hidden="true" className="w-full border-t border-gray-300 dark:border-white/15" />
                    </div>
                </div>
                <div className="grid gap-5 p-5 md:p-10">
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-5 p-5 md:p-10">
                        <div className="grid text-md md:text-xl/6">
                            <p className="text-lg font-light">Area Range</p>
                            <p>{project.area_range_min} sqm to {project.area_range_max} sqm</p>
                        </div>
                        <div className="grid text-md md:text-2xl">
                            <p className="text-lg font-light">Unit Types</p>
                            <p>{typeTitle}</p>
                        </div>
                        <div className="grid text-md md:text-2xl">
                            <p className="text-lg font-light">Project Type</p>
                            <p>Area Range</p>
                        </div>
                        <div className="grid text-md md:text-2xl">
                            <p className="text-lg font-light">Developer</p>
                            <p>{project.main?.developer_name}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <button className="bg-ebGreen text-white text-xl rounded px-5 py-2 cursor-pointer border border-bg-ebGreen hover:text-ebGreen hover:bg-ebLightGreen">WhatsApp</button>
                        <button className="bg-ebGreen text-white text-xl rounded px-5 py-2 cursor-pointer border border-bg-ebGreen hover:text-ebGreen hover:bg-ebLightGreen">Call</button>
                    </div>
                </div>
            </div>
            <Modal modalState={setModal} onModalUpdate={modalUpdate} content={popContent} data={popData}/>
        </>
    );
}