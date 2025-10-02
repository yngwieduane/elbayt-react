'use client'
import { Link } from "@/i18n/navigation";
import { Compass, FileText, GalleryThumbnails, HomeIcon, Info, MapIcon, MapPin, PaperclipIcon, PencilIcon, RectangleGoggles, RectangleGogglesIcon, Scan, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import useFancybox from "./tools/useFancybox";
import Modal from "./tools/Modal";
import slugify from "react-slugify";
export default function ProjectsButtons(props:any) {
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
    let typeTitle, locationPlan, floorplans, youtubevid, masterPlan, galleryExt, galleryInt, galleryFac, maintype;
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

    {project.floorplans === 0
        ? floorplans = ''
        : floorplans = project.floorplans;
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

    {project.media?.images.exterior === 0
        ? galleryExt = ''
        : galleryExt = project.media?.images.exterior;
    }

    {project.media?.images.interior === 0
        ? galleryInt = ''
        : galleryInt = project.media?.images.interior;
    }

    {project.media?.images.facilities === 0
        ? galleryFac = ''
        : galleryFac = project.media?.images.facilities;
    }
    const storedItem = project.property_type;
    if (storedItem) {
        maintype = JSON.parse(storedItem);
    } else {
        maintype = '';
    }
    const mainprojecturl =  '/projects/' + slugify(project.main?.city_name) + "/" + slugify(project.main?.community_name) + "/" + slugify(project.main?.subcommunity_name) + "/" + project.main?.project_slug;

    return (
        <>
            <div className="grid grid-cols-1 items-center gap-5 my-5">
                <div className="relative">
                    <div className="w-full items-center my-5">
                        <div aria-hidden="true" className="w-full border-t border-gray-300 dark:border-white/15" />
                        <div ref={fancyboxRef1}>
                            <div className="relative flex justify-center">
                                <span className="isolate inline-flex -space-x-px rounded-md shadow-xs dark:shadow-none">
                                <Link
                                    href={mainprojecturl}
                                    className="relative cursor-pointer inline-flex items-center bg-white/90 px-3 py-2 text-gray-400 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-10"
                                >
                                    <span className="sr-only">Home</span>
                                    <HomeIcon color="#06bbab" />
                                </Link>
                                <a 
                                    data-fancybox="gallery" href={featuredImg}
                                    type="button"
                                    className="relative cursor-pointer inline-flex items-center bg-white/90 px-3 py-2 text-gray-400 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-10"
                                >
                                    <span className="sr-only">Gallery</span>
                                    <GalleryThumbnails color="#06bbab" />
                                </a>
                                {galleryInt !== '' ? (
                                    <>
                                        {galleryInt?.map((post:any,index:any) => { 
                                            const title = post.name;
                                            const href = `https://admin.elbayt.com/files/image/id/${post.id}/checksum/${post.checksum}/${post.name}`;
                                            return (
                                                <a key={index} className="hidden" data-fancybox="gallery"href={href}>{title}</a>
                                            )
                                        })}
                                    </>
                                ) : ("")}
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
                                {JSON.stringify(floorplans) !== '[]' ? (
                                <a
                                    data-fancybox="floorplans" href={`https://admin.elbayt.com/${floorplans?.[0].media?.[0].path}`}
                                    type="button"
                                    className="relative cursor-pointer inline-flex items-center bg-white/90 px-3 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-10"
                                >
                                    <span className="sr-only">Floor Plans</span>
                                    <Scan color="#06bbab" />
                                </a>
                                ) : ("")}
                                {JSON.stringify(floorplans) !== '[]' ? (
                                    <>
                                        {floorplans?.map((post:any,index:any) => { 
                                            const title = post.name;
                                            const href = `https://admin.elbayt.com/${post.media[0].path}`;
                                            return (
                                                <a key={index} className="hidden" data-fancybox="floorplans" href={href}>{title}</a>
                                            )
                                        })}
                                    </>
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
                                    className="relative cursor-pointer inline-flex items-center bg-white/90 px-3 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-10"
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
                    <button onClick={modalHandler('contactform', project?.name)} className="bg-ebGreen w-full text-white text-xl rounded px-5 py-2 cursor-pointer border border-bg-ebGreen hover:text-ebGreen hover:bg-ebLightGreen">Register Interest</button>
                </div>
            </div>
            <Modal modalState={setModal} onModalUpdate={modalUpdate} content={popContent} data={popData}/>
        </>
    );
}