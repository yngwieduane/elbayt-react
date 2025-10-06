'use client'
import slugify from "react-slugify";
import Image from "next/image";
import { useFormatter, useLocale, useTranslations } from "next-intl";

export default function CommunityCardWithDescription(props:any){
    const mt = useTranslations('MainTranslation');
    let description;
    const format = useFormatter();
    const locale = useLocale();
    const main = props.results.main;
    const media = props.results.media;
    const title = mt(`${slugify(main?.propertyName, { delimiter: '_' })}`);
    const community_name = mt(`${slugify(main?.community_name, { delimiter: '_' })}`);
    const href =  '/projects/' + slugify(main?.city_name) + "/" + slugify(main?.community_name) + "/" + slugify(main?.subcommunity_name) + "/" + main?.project_slug;
    const image = `https://admin.elbayt.com/files/image/id/${media?.images.featuredimage[0].id}/checksum/${media?.images.featuredimage[0].checksum}/${media?.images.featuredimage[0].name}?width=500&height=800`;

    switch (locale) {
        case 'en':
            description = props.results.project_description;
            break;
        case 'ar':
            description = props.results.ar_project_description;
            break;
        case 'ru':
            description = props.results.ru_project_description
            break;
    
        default:
            description = props.results.project_description;
            break;
    }
    return (
    <>
        <h2 className="text-3xl text-center mb-5">{mt("discovering")} {title}, {community_name} : {mt("facilities_amenities_and_more")}</h2>
        <Image src={image} alt={`Image of ${title}`} width={300} height={200} className="ltr:float-right rtl:float-left rounded-2xl bg-gray-50 object-cover h-50 w-92" />
        <p className="whitespace-break-spaces">{description}</p>
    </>
    );
};