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

    return (
        <div className="mx-auto container px-6 lg:px-8 mt-5 grid grid-cols-1 gap-4 ">
            <Link className="hover:text-ebGreen mt-10" href="/projects/"><h1 className="text-3xl pb-4">Real Estate Projects in Egypt</h1></Link>
            <CommunityCard/>
            <Link className="hover:text-ebGreen mt-10" href="/projects/"><h1 className="text-3xl pb-4">Residential Properties in Egypt</h1></Link>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            </div>
            <Link className="hover:text-ebGreen mt-10" href="/projects/"><h1 className="text-3xl pb-4">Commercial Properties in Egypt</h1></Link>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            </div>
            <Link className="hover:text-ebGreen mt-10" href="/projects/"><h1 className="text-3xl pb-4">Real Estate Developers in Egypt</h1></Link>
            <DeveloperCard/>
            <Link className="hover:text-ebGreen text-center mt-10" href="/projects/"><h1 className="text-3xl pb-4">The Best Real Estate Website in Egypt</h1></Link>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-3">elbayt Real Estate is transforming Egypt's real estate market by empowering prospective homeowners, investors, and sellers with a comprehensive online marketplace. As Egypt's leading property portal, elbayt Real Estate in Egypt offers a plethora of resources, including data-driven insights and thousands of verified listings for flats, mansions, and commercial spaces across coveted locations like New Cairo, Sheikh Zayed, the North Coast, and beyond. Whether you seek luxurious mansions or practical flats, our platform connects you with your dream property effortlessly, unlocking the potential of Egypt's vibrant real estate sector.</div>
                <div><Image className="w-full'" width={200} height={200} alt="elbayt.com" src="/elbayt-name-only.png"/></div>
            </div>
        </div>
    );
}