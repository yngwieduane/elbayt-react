import {useTranslations} from 'next-intl';
import DeveloperCard from '../_components/DeveloperCard';
import PopularCommunity from '../_components/PopularCommunity';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ city:string;community:string;subcommunity:string;project:string }>
} 
export async function generateMetadata(
    { params }: Props,
    ): Promise<Metadata> {
    // read route params
    const {city, community, subcommunity, project} = await params;

    const metatitle = "Real Estate Developers in Egypt | Egypt Real Estate" ;
    const metadesc = "Real Estate Developers in Egypt. Properties for sale in Egypt.";
    return {
        title: metatitle,
        description: metadesc,
    }
}

export default function DevelopersPage() {
    const t = useTranslations('DevelopersPage');

    return (
        <div className="mx-auto container px-6 lg:px-8 mt-5 grid grid-cols-1 gap-4 ">
            <h1 className='text-3xl my-5'>Real Estate Developers in Egypt</h1>
            <DeveloperCard/>
            <div className="flex flex-wrap gap-5 text-sm mb-5">
                <p>Top Real Estate Developers in Egypt.</p>
                <p>Egypt&apos;s real estate market has undergone remarkable growth and transformation, largely attributed to the visionary efforts of its leading developers. These developers have not only reshaped the nation&apos;s skyline but have also significantly contributed to its economic development and urbanization.</p>
                <p>As Egypt&apos;s real estate market continues to thrive, these developers remain at the forefront, shaping the future of the country&apos;s cities and communities. From Emaar Misr&apos;s luxurious Marassi to Palm Hills Developments&apos; sustainable communities, these developers are setting new standards for excellence in architecture, design, and community living. SODIC&apos;s award-winning projects like Westown reflect meticulous planning and superior amenities, while Orascom Development Egypt&apos;s luxury resorts epitomize comfort and sustainability. Mountain View&apos;s dedication to quality and inclusivity shines through in projects like Mountain View Hyde Park and other leading developers.</p>
                <p>Investing in real estate projects by Egypt&apos;s top developers offers high returns and stability for investors, with diverse portfolios and professional management ensuring efficiency and quality. For buyers, properties promise superior living spaces with world-class amenities in prime locations, providing both comfort and potential for long-term value appreciation. Trusted developers&apos; proven track records ensure peace of mind, making these projects ideal for securing investments and enjoying quality living experiences.</p>
                <p>These developers are not merely constructing buildings but are actively shaping the future of Egypt&apos;s cities and communities. Through their vision, innovation, and commitment to excellence, they are driving economic growth, urban development, and social progress in the country. As the real estate market continues to evolve, these developers will undoubtedly remain at the forefront, shaping Egypt&apos;s built environment for years to come.</p>
            </div>
            <PopularCommunity className="overflow-x-auto"/>
        </div>
    );
}