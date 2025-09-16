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

    return {
        title: slugString,
    }
}

export default async function Page({ params }: Props){
    const { slug } = await params
    
    const slugString = Array.isArray(slug) ? slug[0] : slug || "";
    return (
        <>
            <DeveloperPage slug={slugString}/>
        </>
    );
}