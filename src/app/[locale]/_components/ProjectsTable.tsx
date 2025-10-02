'use client'

import slugify from "react-slugify";
import CardImageWithDetails from "./tools/CardImageWithDetails";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useFormatter, useTranslations } from "next-intl";

export default function ProjectsTable(props:any){
    const format = useFormatter();
    const main = props.results.main;
    const media = props.results.media;
    const title = main?.propertyName;
    const subcommunity_name = main?.subcommunity_name;
    const community_name = main?.community_name;
    const developer_name = main?.developer_name;
    const href =  '/projects/' + slugify(main?.city_name) + "/" + slugify(main?.community_name) + "/" + slugify(main?.subcommunity_name) + "/" + main?.project_slug;
    const image = `https://admin.elbayt.com/files/image/id/${media?.images.featuredimage[0].id}/checksum/${media?.images.featuredimage[0].checksum}/${media?.images.featuredimage[0].name}?width=500&height=800`;

    const mt = useTranslations('MainTranslation');

    const unimultitype = props.results.property_type1;
    let typeTitle, HOdate, maintype, bedrooms;
    if(unimultitype){
        const jsonObject = JSON.parse(unimultitype);
        console.log(jsonObject);
        typeTitle = jsonObject
            .map((type:any) => mt(`${slugify(type, { delimiter: '_' })}`))
            .join(', ');
    }

    const storedItem = props.results.finishing_type;
    if(storedItem){
        const jsonObject = JSON.parse(storedItem);
        console.log(jsonObject);
        maintype = jsonObject
            .map((type:any) => mt(`${slugify(type, { delimiter: '_' })}`))
            .join(', ');
    }
    const storedItemBed = props.results.available_bedrooms;
    if(storedItemBed){
        const jsonObject = JSON.parse(storedItemBed);
        console.log(jsonObject);
        bedrooms = jsonObject
            .map((type: string) => {
            // remove "bedroom"/"bedrooms" (case-insensitive)
            const cleaned = type.replace(/bedrooms?/i, '').trim();
            return cleaned;
            })
            .join(', ');
    }

    const completion_year = props.results.completion_year;
    const completion_month = props.results.completion_month;
   
    return (
        <tr className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0 hover:bg-ebLightGreen">
            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
            <a
                data-fancybox="floorplans" 
                data-caption={`${title}`} 
                href={href}
                className="text-indigo-600 hover:text-indigo-900 "
            >
                <Image src={image} className="object-fit h-20 w-30" width={300} height={200} alt={title}/>
            </a>
            </td>
            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 ">
            {mt(`${slugify(title, { delimiter: '_' })}`)}
            </td>
            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 ">
            {mt(`${slugify(community_name, { delimiter: '_' })}`)}
            </td>
            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 ">
            {mt(`${slugify(developer_name, { delimiter: '_' })}`)}
            </td>
            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 ">
            {typeTitle}
            </td>
            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 ">
            {mt(`${slugify(subcommunity_name, { delimiter: '_' })}`)}
            </td>
            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 ">
            {completion_month} {completion_year}
            </td>
            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 ">
            {maintype}
            </td>
            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 ">
            {bedrooms}
            </td>
        </tr>
    );
};