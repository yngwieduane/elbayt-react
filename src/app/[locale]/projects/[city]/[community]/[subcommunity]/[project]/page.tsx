import {useTranslations} from 'next-intl';
import PropertyPage from './_components/PropertyPage';

export default async function ProjectPage({
    params,
}:{
    params: Promise<{city:string;community:string;subcommunity:string;project:string}>
}) {
    //const t = useTranslations('ProjectPage');
    const {city, community, subcommunity, project} = await params;
    return (
        <PropertyPage city={city} community={community} subcommunity={subcommunity} project={project}/>
    );
}