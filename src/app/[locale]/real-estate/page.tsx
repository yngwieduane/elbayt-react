
import type { Metadata } from 'next'
import Breadcrumb from '../_components/tools/Breadcrumb';
import RealEstateCard from './_components/RealEstateCard';
import PopularCommunity from '../_components/PopularCommunity';
import InquiryForm from '../_components/InquiryForm';

type Props = {
  params: Promise<{ city:string;community:string;subcommunity:string;project:string }>
} 

export async function generateMetadata(
    { params }: Props,
    ): Promise<Metadata> {
    // read route params
    const {city, community, subcommunity, project} = await params;

    const metatitle = "Egypt Real Estate Projects | Egypt Real Estate" ;
    const metadesc = "Real estate in Egypt. Properties for sale in Egypt.";
    return {
        title: metatitle,
        description: metadesc,
    }
}

export default async function RealEstatePage({
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

    return (
        <>
            <div>
                <Breadcrumb/>
            </div>
            <div className="mx-auto container px-6 lg:px-8 mt-5 grid grid-cols-1 gap-4 ">
                <h1 className='text-3xl px-6 lg:px-8'>Real Estate</h1>
                <div className="mx-auto container px-6 lg:px-8 mt-5">
                    <div className="grid grid-cols-4 gap-4 mainuppper">
                        <div className="col-span-4 md:col-span-3">
                            <RealEstateCard page={currentPage}/>
                        </div>
                        <div className="hidden md:flex md:flex-col  mainsidebar border border-gray-300 rounded-lg">
                            <h3 className="text-xl px-5 pt-5">Inquire now</h3>
                            <InquiryForm hideFeedbackButton={true}/>
                        </div>
                    </div>
                </div>
                <PopularCommunity className="overflow-x-auto"/>
            </div>
        </>
    );
}