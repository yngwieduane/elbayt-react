
import { getLookupId } from '@/utils/lookup';
import type { Metadata } from 'next'
import { unslugify } from '@/utils/utls';
import ProjectsPage from './_components/ProjectsPage';

type Props = {
  params: Promise<{ city:string;community:string;subcommunity:string;project:string }>
} 

export async function generateMetadata(
    { params }: Props,
    ): Promise<Metadata> {
    // read route params
    const {city, community, subcommunity, project} = await params;

    const metatitle = unslugify(subcommunity) + " " + unslugify(community) + " Egypt Real Estate Projects | Egypt Real Estate" ;
    const metadesc = unslugify(subcommunity) + " " + unslugify(community) + " Real estate in Egypt. Properties for sale in Egypt.";
    return {
        title: metatitle,
        description: metadesc,
    }
}

export default async function SubCommunityPage({
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

    const data = await getLookupId(unslugify(subcommunity), 'subcommunity');
    
    return (
        <>
            <ProjectsPage category="subcommunity" page={currentPage} dataid={data} city={unslugify(city)} community={unslugify(community)} subcommunity={unslugify(subcommunity)} project={project} propertyname={propertynamefinal} isFeaturedProjectOnWeb={isFeaturedProjectOnWebfinal}/>
        </>
    );
}