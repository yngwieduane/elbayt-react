import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || '';
    const slug = searchParams.get('slug') || '';
    const apiurl = `https://admin.elbayt.com/api/getmarketing.php?page=${page}&slug=${slug}`;
    console.log('Fetching getproperties data...'+page);
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