import { generateSeoData } from "../../_components/functions/generateSeoData";
import type { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import DeveloperPage from "./_components/DeveloperPage";

type Props = {
  params: Promise<{ slug: string }>
} 
export async function generateMetadata(
    { params }: Props,
    ): Promise<Metadata> {
    // read route params
    const { slug } = await params

    const slugString = Array.isArray(slug) ? slug[0] : slug || "";

    const metatitle = slugString + " | Egypt Real Estate" ;
    const metadesc = slugString + " | Real Estate Developers in Egypt. Properties for sale in Egypt.";
    return {
        title: metatitle,
        description: metadesc,
    }
}

export default async function Page({
    params,
    searchParams
}:{
    params: Promise<{slug:string;}>;
    searchParams: Promise<{page?:number;propertyname?:string;}>;
}){
    const { slug } = await params
    const {page = 1,propertyname} = await searchParams;
    
    const slugString = Array.isArray(slug) ? slug[0] : slug || "";
    return (
        <>
            <DeveloperPage slug={slugString} page={page}/>
        </>
    );
}