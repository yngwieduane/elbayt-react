'use client'
import Modal from "@/app/[locale]/_components/tools/Modal";
import useFancybox from "@/app/[locale]/_components/tools/useFancybox";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@headlessui/react";
import { Compass, FileText, GalleryThumbnails, Info, MapIcon, MapPin, PaperclipIcon, PencilIcon, RectangleGoggles, RectangleGogglesIcon, Scan, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import slugify from "react-slugify";
export default function MainFacts(props:any) {
    const pathname = usePathname();
    const [fullUrl, setFullUrl] = useState('');
    useEffect(() => {
        if (typeof window !== 'undefined') {
        setFullUrl(`${window.location.origin}${pathname}`);
        }
    }, [pathname]);
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
    const mt = useTranslations('MainTranslation');

    const unimultitype = project?.property_type1;
    let typeTitle, locationPlan, floorplans, youtubevid, masterPlan, galleryExt, galleryInt, galleryFac, maintype;
    if(unimultitype){
        const jsonObject = JSON.parse(unimultitype);
        console.log(jsonObject);
        typeTitle = jsonObject
            .map((type:any) => mt(slugify(type, { delimiter: '_' })))
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

    const projectName = mt(slugify(project?.name, { delimiter: '_' }));
    const phoneNumber = process.env.NEXT_PUBLIC_CALLNUMBER;
    const wappNumber = process.env.NEXT_PUBLIC_WAPPNUMBER;
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <h1 className="text-lg md:text-3xl">{projectName}: {typeTitle} {mt("in")} {mt(slugify(project?.main?.community_name, { delimiter: '_' }))} {mt("egypt")}</h1>
                <div className="text-end" id={project.main?.projectID}><button onClick={modalHandler('contactform', project?.name)} className="bg-ebGreen text-white text-xl rounded px-5 py-2 cursor-pointer border border-bg-ebGreen hover:text-ebGreen hover:bg-ebLightGreen">{mt("ask_for_price")}</button></div>
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
                    </div>
                    <div className="absolute w-full flex items-center bottom-0">
                        <div aria-hidden="true" className="w-full border-t border-gray-300 dark:border-white/15" />
                        <div ref={fancyboxRef1}>
                            <div className="relative flex justify-center">
                                <span className="isolate inline-flex -space-x-px rounded-md shadow-xs dark:shadow-none">
                                <a 
                                    data-fancybox="gallery" href={featuredImg}
                                    type="button"
                                    className="relative cursor-pointer inline-flex items-center bg-white/90 px-3 py-2 text-gray-400 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-10"
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
                </div>
                <div className="grid gap-5 p-5 md:p-10">
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-5 p-5 md:p-10">
                        {project.area_range_min !== '' ? (
                            <div className="grid text-md md:text-xl/6">
                                <p className="text-lg font-light">{mt("area_range")}</p>
                                <p>{project.area_range_min} {mt("sqm")} ~ {project.area_range_max} {mt("sqm")}</p>
                            </div>
                        ) : ("")}
                        <div className="grid text-md md:text-2xl">
                            <p className="text-lg font-light">{mt("unit_types")}</p>
                            <p>{typeTitle}</p>
                        </div>
                        <div className="grid text-md md:text-2xl">
                            <p className="text-lg font-light">{mt("project_type")}</p>
                            <p>{maintype}</p>
                        </div>
                        <div className="grid text-md md:text-2xl">
                            <p className="text-lg font-light">{mt("developer")}</p>
                            <Link href={`/developer/${slugify(project.main?.developer_name)}`}>{mt(slugify(project?.main?.developer_name, { delimiter: '_' }))}</Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <Link target='_blank' href={`https://wa.me/${wappNumber}?text=I%20am%20Interested%20.${fullUrl}`} className="bg-ebGreen text-center text-white text-xl rounded px-5 py-2 cursor-pointer border border-bg-ebGreen hover:text-ebGreen hover:bg-ebLightGreen">{mt("whatsapp")}</Link>
                        <Link href={`tel:${phoneNumber}`} type="button" className="bg-ebGreen text-center text-white text-xl rounded px-5 py-2 cursor-pointer border border-bg-ebGreen hover:text-ebGreen hover:bg-ebLightGreen">{mt("call")}</Link>
                    </div>
                </div>
            </div>
            <Modal modalState={setModal} onModalUpdate={modalUpdate} content={popContent} data={popData}/>
        </>
    );
}