import {useTranslations} from 'next-intl';
import PopularCommunity from '../_components/PopularCommunity';
import { Metadata } from 'next';
import Image from 'next/image';
import ListYourPropertyForm from '../_components/ListYourPropertyForm';
import Breadcrumb from '../_components/tools/Breadcrumb';

type Props = {
  params: Promise<{ city:string;community:string;subcommunity:string;project:string }>
} 
export async function generateMetadata(
    { params }: Props,
    ): Promise<Metadata> {
    // read route params
    const {city, community, subcommunity, project} = await params;

    const metatitle = "List Your Property | Egypt Real Estate" ;
    const metadesc = "List Your Property. Properties for sale in Egypt.";
    return {
        title: metatitle,
        description: metadesc,
    }
}

export default function ListYourProperty() {
    const t = useTranslations('DevelopersPage');

    return (
        <>
        <Breadcrumb/>
        <div className="mx-auto container px-6 lg:px-8 mt-5 grid grid-cols-1 gap-4 ">
            <h1 className='text-3xl my-5'>List Your Property</h1>
            <div className="flex flex-wrap gap-5 text-sm mb-5">
                <p>Sell Smarter in Egypt&apos;s Real Estate Market with Elbayt</p>
                <p>If you are an investor, homeowner, or seller wishing to sell property in Egypt, finding the right exposure is critical. At Elbayt.com, we make it easy and assist you in linking with serious buyers promptly and effectively. With a reliable platform that deals only with developers and qualified leads, listing your property on Elbayt provides you with the competitive advantage you need in Egypt&apos;s expanding real estate market.</p>
                <Image className="aspect-3/2 w-full h-[300px] rounded-lg object-cover outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10" src="/list-your-property-elbayt.jpg" alt="List Your Property" width="800" height="300"/>
                <h2 className='text-3xl my-5'>Why List Your Property with Elbayt?</h2>
                <p>Whether you are selling a villa in New Cairo or an apartment in North Coast, Elbayt provides a hassle-free and professional listing experience designed to meet the needs of today's market.</p>
                <p>Benefits of Listing with Elbayt:</p>
                <ul className="flex flex-wrap ms-5 list-disc">
                    <li>Expose Your Property to Thousands of Actively Searching Buyers:  Your property will be showcased in front of a high-intent audience that is already searching for homes in Egypt.</li>
                    <li>Zero Commission on Listings:  Listing your property is 100% free. No hidden fees. Just real exposure.</li>
                    <li>Optimized Property Ads for Search Engines:  We make sure your listing is SEO-friendly so it ranks well on Google and gets seen by the right people.</li>
                    <li>Professional Marketing Support:  With our in-house content and media team, your property gets high-quality photos, descriptions, and digital visibility.</li>
                    <li>Egypt&apos;s Most Trusted Real Estate Name:  Elbayt is one of the leading platforms trusted by buyers, developers, and agents in Egypt.</li>
                </ul>
            </div>
            <ListYourPropertyForm />
            <PopularCommunity className="overflow-x-auto"/>
        </div>
        </>
    );
}