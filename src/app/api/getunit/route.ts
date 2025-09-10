import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const unit = searchParams.get('unit') || '';
    const apiurl = `https://admin.elbayt.com/api/getunit.php?unit=${unit}`;
    console.log('Fetching getproperties data...'+unit);
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