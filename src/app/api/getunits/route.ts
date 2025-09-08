import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const beds = searchParams.get('beds') || '';
    const propertyType = searchParams.get('propertyType') || '';
    const category = searchParams.get('category') || '';
    const community = searchParams.get('community') || '';
    const apiurl = `https://admin.elbayt.com/api/getunits.php?community=${community}&beds=${beds}&category=${category}&propertyType=${propertyType}`;
    console.log('Fetching getproperties data...'+beds);
    const response = await fetch(
        apiurl,
        {
            method: "GET",
            headers:{
                'accept':'*/*',
                'Content-Type':'application/json',
            }
        }
    );

    if (!response) {
        const error = new Error("An error occurred while fetching getproperties");
        throw error;
    }

    const getproperties = await response.json();

    return new Response(JSON.stringify(getproperties), {
        headers: { 'Content-Type': 'application/json' },
    });
}