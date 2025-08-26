import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const sort = searchParams.get('sort') || '';
    let apiurl = `https://admin.elbayt.com/api/getcommunities.php?sort=${sort}`;
    console.log('Fetching communities data...'+sort);
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
        const error = new Error("An error occurred while fetching communities");
        throw error;
    }

    const communities = await response.json();

    return new Response(JSON.stringify(communities), {
        headers: { 'Content-Type': 'application/json' },
    });
}