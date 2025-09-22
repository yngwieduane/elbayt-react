
import type { Metadata } from 'next'
import Breadcrumb from '../../_components/tools/Breadcrumb';
import { unslugify } from '@/utils/utls';
import MarketingPage from './_components/MarketingPage';

type Props = {
  params: Promise<{ slug:string }>
} 

export async function generateMetadata(
    { params }: Props,
    ): Promise<Metadata> {
    // read route params
    const {slug} = await params;

    const metatitle = unslugify(slug) + " | Egypt Real Estate" ;
    const metadesc = "Real estate in Egypt. Properties for sale in Egypt.";
    return {
        title: metatitle,
        description: metadesc,
    }
}

export default async function RealEstateSinglePage({
    params
}:{
    params: Promise<{slug:string;}>;
}){
    
    const {slug} = await params;

    return (
        <>
            <div>
                <Breadcrumb/>
            </div>
            <div className="mx-auto container px-6 lg:px-8 mt-5 grid grid-cols-1 gap-4 ">
                <h1 className='text-center text-3xl my-5'>{unslugify(slug)}</h1>
                <MarketingPage slug={slug} />
            </div>
        </>
    );
}