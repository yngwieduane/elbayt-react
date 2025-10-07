import {useTranslations} from 'next-intl';
import { Metadata } from 'next';
import { unslugify } from '@/utils/utls';
import FaqsMain from './_components/FaqsMain';

type Props = {
  params: Promise<{ city:string;community:string;subcommunity:string;project:string;faqs:string }>
} 

export async function generateMetadata(
    { params }: Props,
    ): Promise<Metadata> {
    // read route params
    const {city, community, subcommunity, project, faqs} = await params;

    const metatitle = unslugify(faqs) + " Egypt Real Estate Projects | Egypt Real Estate" ;
    const metadesc = unslugify(faqs) + " Real estate in Egypt. Properties for sale in Egypt.";
    return {
        title: metatitle,
        description: metadesc,
    }
}

export default async function FaqsProjectPage({
    params,
}:{
    params: Promise<{city:string;community:string;subcommunity:string;project:string;faqs:string}>
}) {
    //const t = useTranslations('ProjectPage');
    const {city, community, subcommunity, project, faqs} = await params;
    return (
        <FaqsMain project={project} faqs={faqs}/>
    );
}