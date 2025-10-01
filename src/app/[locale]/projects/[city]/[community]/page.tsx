
import { getLookupId } from '@/utils/lookup';
import type { Metadata } from 'next'
import ProjectsPage from './_components/ProjectsPage';
import { unslugify } from '@/utils/utls';

type Props = {
  params: Promise<{ city:string;community:string;subcommunity:string;project:string }>
} 

export async function generateMetadata(
    { params }: Props,
    ): Promise<Metadata> {
    // read route params
    const {city, community, subcommunity, project} = await params;

    const metatitle = unslugify(community) + " " + unslugify(city) + " Egypt Real Estate Projects | Egypt Real Estate" ;
    const metadesc = unslugify(community) + " " + unslugify(city) + " Real estate in Egypt. Properties for sale in Egypt.";
    return {
        title: metatitle,
        description: metadesc,
    }
}

export default async function CommunityPage({
    params,
    searchParams
}:{
    params: Promise<{city:string;community:string;subcommunity:string;project:string;}>;
    searchParams: Promise<{page?:number;propertyname?:string;isFeaturedProjectOnWeb?:string;}>;
}){
    
    const {city, community, subcommunity, project} = await params;
    const {page = 1,propertyname,isFeaturedProjectOnWeb} = await searchParams;
    const propertynamefinal = (await searchParams)?.propertyname || '';
    const isFeaturedProjectOnWebfinal = (await searchParams)?.isFeaturedProjectOnWeb || '';
    const currentPage = Number(page) || 1;
    console.log("propertyname="+propertyname);

    const data = await getLookupId(unslugify(community), 'community');
    
    return (
        <>
            <ProjectsPage category="community" page={currentPage} dataid={data} city={unslugify(city)} community={unslugify(community)} subcommunity={subcommunity} project={project} propertyname={propertynamefinal} isFeaturedProjectOnWeb={isFeaturedProjectOnWebfinal}/>
        </>
    );
}