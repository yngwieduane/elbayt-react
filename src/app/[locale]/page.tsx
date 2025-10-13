import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import CardImage from './_components/tools/CardImage';
import Image from 'next/image';
import CommunityCard from './_components/CommunityCard';
import DeveloperCard from './_components/DeveloperCard';
 
const communities = [
    { name: 'New Cairo', href: '#', image: '#' },
    { name: '6th October', href: '#', image: '#' },
    { name: 'North Coast', href: '#', image: '#' },
    { name: 'New Capital', href: '#', image: '#' },
    { name: 'New Cairo', href: '#', image: '#' },
    { name: '6th October', href: '#', image: '#' },
    { name: 'North Coast', href: '#', image: '#' },
    { name: 'New Capital', href: '#', image: '#' },
]

export default function Homepage() {
    const t = useTranslations('HomePage');
    const mt = useTranslations('MainTranslation');
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": "https://elbayt.com",
        "logo": "http://elbayt.com/_next/image?url=%2Felbayt-name-only.png&w=640&q=75"
    }
    const organizationSchema1 = {
        "@context": "https://schema.org",
        "@type" : "Organization",
        "name" : "Elbayt.com",
        "url" : "https://elbayt.com",
        "sameAs" : [ "https://www.instagram.com/elbaytegypt/","https://www.facebook.com/elbaytegypt","https://twitter.com/elbaytegypt","https://www.linkedin.com/company/elbayt-com","https://www.youtube.com/channel/UCreNuOhoN8OrFt8KqGf49LA"]
    }
    return (
        <div className="mx-auto container px-6 lg:px-8 mt-5 grid grid-cols-1 gap-4 ">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c'),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationSchema1).replace(/</g, '\\u003c'),
                }}
            />
            <Link className="hover:text-ebGreen mt-10" href="/projects/"><h1 className="text-3xl pb-4">{mt("real_estate_projects_in_egypt")}</h1></Link>
            <CommunityCard className="grid grid-cols-2 md:grid-cols-4 gap-4"/>
            {/* <Link className="hover:text-ebGreen mt-10" href="/projects/"><h1 className="text-3xl pb-4">{mt("residential")} {mt("properties_in_egypt")}</h1></Link>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            </div>
            <Link className="hover:text-ebGreen mt-10" href="/projects/"><h1 className="text-3xl pb-4">{mt("commercial")} {mt("properties_in_egypt")}</h1></Link>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            </div> */}
            <Link className="hover:text-ebGreen mt-10" href="/projects/"><h2 className="text-3xl pb-4">{mt("real_estate_developers_in_egypt")}</h2></Link>
            <DeveloperCard/>
            <Link className="hover:text-ebGreen text-center mt-10" href="/projects/"><h2 className="text-3xl pb-4">{mt("the_best_real_estate_website_in_egypt")}</h2></Link>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                <div className="col-span-3">{mt("aboutelbayt")}</div>
                <div><Image className="w-full'" width={200} height={200} alt="elbayt.com" src="/elbayt-name-only.png"/></div>
            </div>
        </div>
    );
}