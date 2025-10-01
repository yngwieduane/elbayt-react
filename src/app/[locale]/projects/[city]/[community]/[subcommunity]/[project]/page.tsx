import {useTranslations} from 'next-intl';
import PropertyPage from './_components/PropertyPage';
import { Metadata } from 'next';
import { unslugify } from '@/utils/utls';

type Props = {
  params: Promise<{ city:string;community:string;subcommunity:string;project:string }>
} 

export async function generateMetadata(
    { params }: Props,
    ): Promise<Metadata> {
    // read route params
    const {city, community, subcommunity, project} = await params;

    const metatitle = unslugify(project) + " " + unslugify(community) + " Egypt Real Estate Projects | Egypt Real Estate" ;
    const metadesc = unslugify(project) + " " + unslugify(community) + " Real estate in Egypt. Properties for sale in Egypt.";
    return {
        title: metatitle,
        description: metadesc,
    }
}

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