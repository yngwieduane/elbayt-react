'use client'
import { useState } from "react";
import { useFormatter } from "next-intl";
import useFancybox from "@/app/[locale]/_components/tools/useFancybox";
import { Compass, GalleryThumbnails, Home, MapPin, RectangleGoggles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import slugify from "react-slugify";
import Modal from "@/app/[locale]/_components/tools/Modal";
import { generateSeoData } from "@/app/[locale]/_components/functions/generateSeoData";

export default function PopData(props: any) {
    const format = useFormatter();
    const [setModal, setSetModal] = useState(false);
    const [popContent, setPopContent] = useState('map');
    const [popData, setPopData] = useState('map');
    const modalHandler = (content:string,valuesarray:any) => (e:any) => {
        console.log("clicked = " + setModal);
        setPopContent(content);
        setPopData(valuesarray);
        setSetModal(true);
    };

    const main = props.data.main;
    const media = props.data.media;
    
    let title,maincategory,locationPlan,masterPlan,floorplans;
    {main.rooms !== null
        ? title = main.rooms + " Bedrooms"
        : title = main.bua;
    }
    {main.sellprice !== null
        ? maincategory = "Sale"
        : maincategory = "Rent";
    }

    const modalUpdate = (event:any) => {
        console.log(event);
        setSetModal(event);
    };

    const featuredImg = `https://admin.elbayt.com/files/image/id/${media.images.exterior[0].id}/checksum/${media.images.exterior[0].checksum}/${media.images.exterior[0].name}`;

    const [fancyboxRef] = useFancybox({
        // Your custom options
    });

    const projectURL = '/projects/' + slugify(main.city) + "/" + slugify(main.area) + "/" + slugify(main.district) + "/" + slugify(main.project);

    if(main.floorplans){
        floorplans = `https://admin.elbayt.com/${main.floorplans[0].media[0].path}`;
    }

    {media?.images.locationmap.length !== 0
        ? locationPlan = `https://admin.elbayt.com/files/image/id/${media?.images.locationmap[0].id}/checksum/${media?.images.locationmap[0].checksum}/${media?.images.locationmap[0].name}`
        : locationPlan = '';
    }

    {media?.images.masterplan.length !== 0
        ? masterPlan = `https://admin.elbayt.com/files/image/id/${media?.images.masterplan[0].id}/checksum/${media?.images.masterplan[0].checksum}/${media?.images.masterplan[0].name}`
        : masterPlan = '';
    }
    //https://wa.me/+201226531301?text=I%20am%20Interested%20.%0Ahttps://elbayt.com/en/unit/4-bedroom-penthouse-for-sale-in-playa-town-north-coast-27147%0A%0A


    const propertyData = {
        bedrooms: main.rooms,
        propertyType: main.type,
        adType: maincategory,
        name: main.project,
        community: main.area,
        emirate: main.city,
        refNo: main.id,
        code: main.id,
        seoStart: "",
    };

    const seoData = generateSeoData(propertyData);
    const wanumber = process.env.WAPPNUMBER as string;
    return (
        <>
            <div className="grid grid-cols-2 gap-5 mb-5 border border-gray-300 rounded p-5" id={main.project_id}>
                <button onClick={modalHandler('contactform', main.project)} className="col-span-2 cursor-pointer hover:text-ebGreen hover:text-ebGreen text-3xl">Ask For Price</button>
                <a href={`https://wa.me/${wanumber}?text=I%20am%20Interested%20.%0A${seoData.seoUrl}%0A%0A`} className="bg-ebGreen text-white text-xl rounded px-5 py-2 cursor-pointer border border-bg-ebGreen hover:text-ebGreen hover:bg-ebLightGreen">WhatsApp</a>
                <button onClick={modalHandler('contactform', main.project)}  className="bg-ebGreen text-white text-xl rounded px-5 py-2 cursor-pointer border border-bg-ebGreen hover:text-ebGreen hover:bg-ebLightGreen text-center">Call</button>

            </div>
            <div ref={fancyboxRef}>
                <div className="relative justify-center">
                    <span className="grid gap-4">
                    <a 
                        data-fancybox="gallery" href={featuredImg}
                        type="button"
                        className="bg-white flex items-center gap-5 text-md rounded px-5 py-2 cursor-pointer border border-ebGreen hover:bg-ebLightGreen"
                    >
                        <GalleryThumbnails color="#06bbab" />
                        <p>Gallery</p>
                    </a>
                    {/* <button
                        onClick={modalHandler('map', main.coords_coords)}
                        type="button"
                        className="bg-white flex items-center gap-5 text-md rounded px-5 py-2 cursor-pointer border border-ebGreen hover:bg-ebLightGreen"
                    >
                        <span className="sr-only">MapPin</span>
                        <MapPin color="#06bbab" />
                        <p>Map</p>
                    </button> */}
                    {masterPlan !== '' ? (
                    <a
                        data-fancybox="masterplan" href={masterPlan}
                        type="button"
                        className="bg-white flex items-center gap-5 text-md rounded px-5 py-2 cursor-pointer border border-ebGreen hover:bg-ebLightGreen"
                    >
                        <span className="sr-only">Master Plan</span>
                        <RectangleGoggles color="#06bbab" />
                        <p>Master Plan</p>
                    </a>
                    ) : ("")}
                    {locationPlan !== '' ? (
                    <a
                        data-fancybox="locationplan" href={locationPlan}
                        type="button"
                        className="bg-white flex items-center gap-5 text-md rounded px-5 py-2 cursor-pointer border border-ebGreen hover:bg-ebLightGreen"
                    >
                        <span className="sr-only">Location Map</span>
                        <Compass color="#06bbab" />
                        <p>Location Map</p>
                    </a>
                    ) : ("")}
                    <Link
                        href={projectURL}
                        className="bg-white flex items-center gap-5 text-md rounded px-5 py-2 cursor-pointer border border-ebGreen hover:bg-ebLightGreen"
                    >
                        <span className="sr-only">Projects</span>
                        <Home color="#06bbab" />
                        <p>Project</p>
                    </Link>
                    </span>
                </div>
            </div>
            <Modal modalState={setModal} onModalUpdate={modalUpdate} content={popContent} data={popData}/>
        </>
    );  
}