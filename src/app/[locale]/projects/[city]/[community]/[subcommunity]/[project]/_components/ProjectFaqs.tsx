'use client'

import AccordionTabs from "@/app/[locale]/_components/tools/AccordionTabs";
import { useTranslations } from "next-intl";
import slugify from "react-slugify";

export default function ProjectFaqs(props:any) {
    
    const project = props.data;

    let typeTitle,maintype,finishing_type;
    const mt = useTranslations('MainTranslation');

    const projectName = mt(slugify(project?.name, { delimiter: '_' }));
    const city_name = mt(slugify(project?.main?.city_name, { delimiter: '_' }));
    const community_name = mt(slugify(project?.main?.community_name, { delimiter: '_' }));
    const subcommunity_name = mt(slugify(project?.main?.subcommunity_name, { delimiter: '_' }));
    const developer_name = mt(slugify(project?.main?.developer_name, { delimiter: '_' }));

    const unimultitype = project?.property_type1;
    if(unimultitype){
        const jsonObject = JSON.parse(unimultitype);
        console.log(jsonObject);
        typeTitle = jsonObject
            .map((type:any) => mt(slugify(type, { delimiter: '_' })))
            .join(', ');
    }

    const storedItem = project.property_type;
    if (storedItem) {
        maintype = JSON.parse(storedItem);
    } else {
        maintype = '';
    }

    const storedItem1 = project?.finishing_type;
    if(storedItem1){
        const jsonObject = JSON.parse(storedItem1);
        console.log(jsonObject);
        finishing_type = jsonObject
            .map((type:any) => mt(`${slugify(type, { delimiter: '_' })}`))
            .join(', ');
    }

    const completion_year = project?.completion_year;
    const completion_month = project?.completion_month;
    const projhref =  '/projects/' + slugify(project?.main?.city_name) + "/" + slugify(project?.main?.community_name) + "/" + slugify(project?.main?.subcommunity_name) + "/" + project?.main?.project_slug + "/";
    const accordionData = [
    {
        title: mt('where_is') + ' ' + projectName + ' ' + mt('located') + ' ?',
        url: slugify('Where is ' + projectName + ' located'),
        projecturl: projhref,
        content: projectName + ' '+ mt('is_located_in') +' '+ community_name + ' ' + city_name,
    },
    {
        title: mt('who_is_the_developer_of') + ' ' + projectName + ' ' + community_name + '?',
        url: slugify('Who is the developer of ' + projectName + ' ' + community_name),
        projecturl: projhref,
        content: mt('the_developer_of')+ ' ' + projectName + ' ' + community_name + ' '+mt('is')+' '+ developer_name,
    },
    {
        title: mt('what_are_the_property_types_for')+' ' + projectName + ' ' + community_name + '?',
        url: slugify('What are the property types for ' + projectName + ' ' + community_name),
        projecturl: projhref,
        content: mt('the_property_types_for')+' ' + projectName + ' ' + community_name + ' '+mt('are')+' ' + typeTitle,
    },
    {
        title: mt('what_is_the_property_size_in')+' ' + projectName + ' ' + community_name + '?',
        url: slugify('What is the property size in ' + projectName + ' ' + community_name),
        projecturl: projhref,
        content: mt('the_property_size_in')+' ' + projectName + ' ' + community_name + ' '+mt('is')+' ' + project.area_range_min + ' ~ ' + project.area_range_max,
    },
    {
        title: mt('what_is_the_completion_date_for') + ' ' + projectName + ' ' + community_name + '?',
        url: slugify('What is the completion date for ' + projectName + ' ' + community_name),
        projecturl: projhref,
        content: mt('the_completion_date_for')+' ' + projectName + ' ' + community_name + ' '+mt('is')+' ' + completion_month + ' ' + completion_year ,
    },
    {
        title: mt('how_many_units_available_in')+' ' + projectName + ' ' + community_name + '?',
        url: slugify('How many units available in ' + projectName + ' ' + community_name),
        projecturl: projhref,
        content: mt('the_units_available_for')+' ' + projectName + ' ' + community_name + ' : ' ,
    },
    {
        title: mt('what_is_the_finishing_type_of')+' ' + projectName + ' ' + community_name + '?',
        url: slugify('What is the finishing type of ' + projectName + ' ' + community_name),
        projecturl: projhref,
        content: mt('the_finishing_type_of') + ' ' + projectName + ' ' + community_name + ' '+mt('is')+' ' + finishing_type,
    },
    {
        title: mt('what_is_the_price_per_sqm_of')+' ' + projectName + ' ' + community_name + '?',
        url: slugify('What is the price per sqm of ' + projectName + ' ' + community_name),
        projecturl: projhref,
        content: mt('the_price_per_sqm_of')+' ' + projectName + ' ' + community_name + ' is ' ,
    },
    {
        title: mt('in_which_district_is')+' ' + projectName + ' ' + community_name + '?',
        url: slugify('In which district is ' + projectName + ' ' + community_name),
        projecturl: projhref,
        content: mt('the')+' ' + projectName + ' ' + community_name + ' '+mt('is_located_in_district')+' ' + subcommunity_name ,
    },
    {
        title: mt('what_is_the_area_of')+' ' + projectName + '?',
        url: slugify('What is the area of ' + projectName),
        projecturl: projhref,
        content: mt('the')+' ' + projectName + ' ' + community_name + ' '+mt('is_located_in_area')+' ' + community_name ,
    },
    {
        title: mt('what_is_the_license_of')+' ' + projectName + '?',
        url: slugify('What is the license of ' + projectName),
        projecturl: projhref,
        content: mt('the_license_of')+' ' + projectName + ' ' + community_name + ' '+mt('is')+' ' + maintype ,
    },
    ];
    return (
        <>
            <AccordionTabs items={accordionData} />
        </>
    );
}