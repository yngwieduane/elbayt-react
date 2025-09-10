'use client'
import { useState } from "react";
import { useFormatter } from "next-intl";
import Sticky from 'react-sticky-el';
import BreadcrumbUnit from "@/app/[locale]/_components/tools/BreadcrumbUnit";
import useFancybox from "@/app/[locale]/_components/tools/useFancybox";
import Image from "next/image";
import slugify from "react-slugify";
import TableDetails from "./TableDetails";
import PopData from "./PopData";

export default function UnitPage(props: any) {
    const format = useFormatter();

    const main = props.main;
    const media = props.media;
    
    let title,maincategory,locationPlan,masterPlan,floorplans, gallery;
    {main.rooms !== null
        ? title = main.rooms + " Bedrooms"
        : title = main.bua;
    }
    {main.sellprice !== null
        ? maincategory = "Sale"
        : maincategory = "Rent";
    }

    const maintitle = title + " " + main.type + " For " + maincategory + " in " + main.project+ ", " + main.area;
    const featuredImg = `https://admin.elbayt.com/files/image/id/${media.images.exterior[0].id}/checksum/${media.images.exterior[0].checksum}/${media.images.exterior[0].name}`;

    const [fancyboxRef] = useFancybox({
        // Your custom options
    });
    const [fancyboxRef1] = useFancybox({
        // Your custom options
    });
    const [fancyboxRef3] = useFancybox({
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
    return (
        <>
            <div>
                <BreadcrumbUnit/>
            </div>
            <div className="container mx-auto my-5 px-5">
                <div className="mainuppper grid grid-cols-1 md:grid-cols-4 gap-x-5">
                    <div className="col-span-3">
                        <h1 className="text-2xl mb-5">{maintitle}</h1>
                        <Image
                            width={1200}
                            height={1000}
                            alt={maintitle}
                            src={featuredImg}
                            className="rounded-xl bg-gray-50"
                        />
                        <TableDetails data={main}/>
                        <div className="my-10" ref={fancyboxRef}>
                            <h2 className="text-xl md:text-3xl mb-4">{main.project} Master Plan</h2>
                            <a data-fancybox="masterplan" href={masterPlan}><Image src={masterPlan} alt="Master Plan" width={1000} height={500} className="w-full"/></a>
                        </div>
                        {locationPlan !== '' ? (
                            <div className="my-10" ref={fancyboxRef1}>
                                <h2 className="text-xl md:text-3xl mb-4">{main.project} Map</h2>
                                <a data-fancybox="locationplan" href={locationPlan}><Image src={locationPlan} alt="Map" width={1000} height={500} className="w-full"/></a>
                            </div>
                        ) : ("")}
                    </div>
                    <div>
                        <PopData data={props}/>
                    </div>
                </div>
            </div>
        </>
    );  
}