
import type { Metadata } from 'next'
import { unslugify } from '@/utils/utls';
import MarketingPage from './_components/MarketingPage';
import { getTranslations } from 'next-intl/server';

type Props = {
    params: Promise<{ locale: string;slug:string }>
} 

export async function generateMetadata(
    { params }: Props,
    ): Promise<Metadata> {

    const {locale,slug} = await params;

    const mt = await getTranslations({ locale, namespace: 'MainTranslation' });

    return {
        title: unslugify(slug),
        description: unslugify(slug),
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
            <div className="">
                <MarketingPage slug={slug} />
            </div>
        </>
    );
}