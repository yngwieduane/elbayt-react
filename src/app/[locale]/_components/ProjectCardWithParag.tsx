'use client'

import slugify from "react-slugify";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import Modal from "./tools/Modal";
import { useTranslations } from "next-intl";

export default function ProjectCardWithParag(props:any){
    const mt = useTranslations('MainTranslation');

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

    let typeTitle,maintype;
    const main = props.results.main;
    const media = props.results.media;
    const title = mt(`${slugify(main?.propertyName, { delimiter: '_' })}`);
    const subcommunity_name = mt(`${slugify(main?.subcommunity_name, { delimiter: '_' })}`);
    const community_name = mt(`${slugify(main?.community_name, { delimiter: '_' })}`);
    const developer_name =  mt(`${slugify(main?.developer_name, { delimiter: '_' })}`);
    const href =  '/projects/' + slugify(main?.city_name) + "/" + slugify(main?.community_name) + "/" + slugify(main?.subcommunity_name) + "/" + main?.project_slug;
    const image = `https://admin.elbayt.com/files/image/id/${media?.images.featuredimage[0].id}/checksum/${media?.images.featuredimage[0].checksum}/${media?.images.featuredimage[0].name}?width=500&height=800`;

    const completion_year = props.results.completion_year;
    const completion_month = props.results.completion_month;
    const storedItem = props.results.finishing_type;
    if(storedItem){
        const jsonObject = JSON.parse(storedItem);
        console.log(jsonObject);
        maintype = jsonObject
            .map((type:any) => mt(`${slugify(type, { delimiter: '_' })}`))
            .join(', ');
    }
    return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            <div className="col-span-2 gap-3 grid">
                <Link href={href}><h2 className="text-3xl">{title}, {community_name}</h2></Link>
                <h3 className="text-xl">{mt('about')} {title}, {community_name}</h3>
                <p>{title} {mt('is_located_in')} {subcommunity_name}, {community_name}. {mt('the_developer_of')} {title} {mt('is')} {developer_name}.</p>
                <p>{mt('the_completion_date_for')} {title} {mt('is')} {completion_month} {completion_year} {mt('and_the_finishing_for_the_properties_are')} {maintype}.</p>
                <h3 className="text-xl">{title}, {community_name} {mt('prices')}</h3>
                <p>{mt('the_starting_price_of_properties_in')} {title} {mt('is')} <button onClick={modalHandler('contactform', title)} className="cursor-pointer underline">{mt('ask_for_price')}</button> {mt('with_a_price_per_sqm_of')} <button onClick={modalHandler('contactform', title)} className="cursor-pointer underline">{mt('ask_for_price')}</button>. {mt('the_downpayment_for_a_property_in')} {title} {mt('is_starting_at')} <button onClick={modalHandler('contactform', title)} className="cursor-pointer underline">{mt('ask_for_price')}</button> {mt('or')} <button onClick={modalHandler('contactform', title)} className="cursor-pointer underline">{mt('ask_for_price')}</button>. {mt('the_number_of_installments_for_a_property_in')} {title} {mt('is')}. {mt('the_monthly_payment_of_a_property_in')} {title} <button onClick={modalHandler('contactform', title)} className="cursor-pointer underline">{mt('ask_for_price')}</button></p>
            </div>
            <div className="order-first md:order-last">
                <Link href={href}><Image src={image} alt={`Image of ${title}`} width={200} height={300} className="w-full h-50 object-cover rounded-xl" /></Link>
            </div>
        </div>
        <Modal modalState={setModal} onModalUpdate={modalUpdate} content={popContent} data={popData}/>
    </>
    );
};