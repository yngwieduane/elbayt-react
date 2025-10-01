import { Metadata } from "next";
import UnitsContent from "./_components/UnitsContent";


type Props = {
  params: Promise<{ city:string;community:string;subcommunity:string;project:string }>
} 

export async function generateMetadata(
    { params }: Props,
    ): Promise<Metadata> {
    // read route params
    const {city, community, subcommunity, project} = await params;

    const metatitle = "Properties in Egypt Real Estate Projects | Egypt Real Estate" ;
    const metadesc = "Properties in Real estate in Egypt. Properties for sale in Egypt.";
    return {
        title: metatitle,
        description: metadesc,
    }
}

export default async function Units(props: {
  searchParams?: Promise<{
    unitid?: string;
    category?: string;
    propertyName?: string;
    propertyId?: string;
    beds?: string;
    page?: string;
  }>;
}){
  const searchParams = await props.searchParams;
  const unitid = searchParams?.unitid || '';
  const category = searchParams?.category || '';
  const currentPage = Number(searchParams?.page) || 1;
  const propertyId = searchParams?.propertyId || '';
  const beds = searchParams?.beds || '';
  console.log("mainPageUnits="+unitid);
  console.log("propertyId="+propertyId);


    return (
        <>
            <UnitsContent unitid={unitid} category={category} propertyId={propertyId} beds={beds} currentPage={currentPage}/>
        </>
    );
}