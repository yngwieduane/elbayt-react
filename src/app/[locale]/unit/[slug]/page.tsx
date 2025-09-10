import { generateSeoData } from "../../_components/functions/generateSeoData";
import type { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import UnitPage from "./_components/UnitPage";

type Props = {
  params: Promise<{ slug: string }>
} 
export async function generateMetadata(
    { params }: Props,
    ): Promise<Metadata> {
    // read route params
    const { slug } = await params

    const slugString = Array.isArray(slug) ? slug[0] : slug || "";
    const lastString = slugString.split("-").pop() ?? "";

    const code = lastString.replace(/\D/g, ""); 
    let category = 'rent';

    if(slugString.split("-").includes('sale')){
        category = 'sale';
    }else{
        category = 'rent';
    }
    // fetch data
    const posts = await fetch(`https://elbayt-react.vercel.app/api/getunit?unit=${code}`).then((res) => res.json())

    if (!posts[0]) {
        redirect('/en/units')
    }
    let maincategory;
    {posts[0].main.sellprice !== null
        ? maincategory = "Sale"
        : maincategory = "Rent";
    }
    const propertyData = {
        bedrooms: posts[0].main.rooms,
        propertyType: posts[0].main.type,
        adType: maincategory,
        name: posts[0].main.project,
        community: posts[0].main.area,
        emirate: posts[0].main.city,
        refNo: posts[0].main.id,
        code: posts[0].main.id,
        seoStart: "",
    };

    const seoData = generateSeoData(propertyData);

    return {
        title: seoData.seoTitle,
    }
}

export default async function Page({ params }: Props){
    
    const {slug} = await params;

    // const classify = (slug: string) => slug.replace(/[a-z][a-z]*-?/g, ([f, ...rest]) => f.toUpperCase() + rest.join('').replace('-', ' '));
    // const projectId = classify(slug);
    //const lastString = slug === "string" ? slug.split("-").pop() : "";

    const slugString = Array.isArray(slug) ? slug[0] : slug || "";
    const lastString = slugString.split("-").pop() ?? "";
  
    // Extract only numeric part
    const code = lastString.replace(/\D/g, ""); 
    let category = 'rent';

    if(slugString.split("-").includes('sale')){
        category = 'sale';
    }else{
        category = 'rent';
    }

    const posts = await fetch(`http://localhost:3000/api/getunit?unit=${code}`).then((res) => res.json())
    
    const main = posts[0].main;
    const media = posts[0].media;
    return (
        <>
        <UnitPage main={main} media={media}/>
        </>
    );
}