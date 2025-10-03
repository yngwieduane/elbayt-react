
import type { Metadata } from 'next'
import Breadcrumb from '../../_components/tools/Breadcrumb';
import { unslugify } from '@/utils/utls';
import MarketingPage from './_components/MarketingPage';
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';
import slugify from 'react-slugify';

type Props = {
    params: Promise<{ locale: string;slug:string }>
} 

export async function generateMetadata(
    { params }: Props,
    ): Promise<Metadata> {

    const {locale,slug} = await params;

    const mt = await getTranslations({ locale, namespace: 'MainTranslation' });

    return {
        title: mt(slugify(slug, { delimiter: '_' })),
        description: mt(slugify(slug, { delimiter: '_' })),
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
                <MarketingPage slug={slug} />
            </div>
        </>
    );
}