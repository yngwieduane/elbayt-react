import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id') || '';
    const apiurl = `https://admin.elbayt.com/api/getproperties.php?id=${id}`;
    console.log('Fetching getproperties data...'+id);
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