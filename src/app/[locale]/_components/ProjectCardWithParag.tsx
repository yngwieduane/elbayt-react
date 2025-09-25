'use client'

import slugify from "react-slugify";
import CardImageWithDetails from "./tools/CardImageWithDetails";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function ProjectCardWithParag(props:any){
    const main = props.results.main;
    const media = props.results.media;
    const title = main?.propertyName;
    const subcommunity_name = main?.subcommunity_name;
    const community_name = main?.community_name;
    const developer_name = main?.developer_name;
    const href =  '/projects/' + slugify(main?.city_name) + "/" + slugify(main?.community_name) + "/" + slugify(main?.subcommunity_name) + "/" + main?.project_slug;
    const image = `https://admin.elbayt.com/files/image/id/${media?.images.featuredimage[0].id}/checksum/${media?.images.featuredimage[0].checksum}/${media?.images.featuredimage[0].name}?width=500&height=800`;

    let typeTitle;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            <div className="col-span-2 gap-3 grid">
                <Link href={href}><h2 className="text-3xl">{title}, {community_name}</h2></Link>
                <h3 className="text-xl">About {title}, {community_name}</h3>
                <p>{title} is located in {subcommunity_name}, {community_name}. The developer of {title} is {developer_name}.</p>
                <p>The completion date for {title} is and the finishing for the properties are {props.finishing_type}.</p>
                <h3 className="text-xl">{title}, {community_name} prices</h3>
                <p>The starting price of properties in {title} is Ask for price with a price per sqm of Ask for price. The downpayment for a property in {title} is starting at Ask for price or Ask for price. The number of installments for a property in {title} is 36 installments and has a payment plan of 9 years. The monthly payment of a property in {title} Ask for price</p>
            </div>
            <div className="order-first md:order-last">
                <Link href={href}><Image src={image} alt={`Image of ${title}`} width={200} height={300} className="w-full h-50 object-cover rounded-xl" /></Link>
            </div>
        </div>
    );
};