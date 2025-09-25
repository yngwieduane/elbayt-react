'use client'

import slugify from "react-slugify";
import CardImageWithDetails from "./tools/CardImageWithDetails";

export default function ProjectCard(props:any){
    const main = props.results.main;
    const media = props.results.media;
    const title = main?.propertyName;
    const href =  '/projects/' + slugify(main?.city_name) + "/" + slugify(main?.community_name) + "/" + slugify(main?.subcommunity_name) + "/" + main?.project_slug;
    const image = `https://admin.elbayt.com/files/image/id/${media?.images.featuredimage[0].id}/checksum/${media?.images.featuredimage[0].checksum}/${media?.images.featuredimage[0].name}?width=500&height=800`;

    let typeTitle;
    return (
        <>
            <CardImageWithDetails name={title} image={image} href={href} typeTitle={typeTitle} community={main?.community_name} developer={main?.developer_name} />
        </>
    );
};