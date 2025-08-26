import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const sort = searchParams.get('sort') || '';
    let apiurl = `https://admin.elbayt.com/api/getdevelopers.php?sort=${sort}`;
    console.log('Fetching getdevelopers data...'+sort);
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
        const error = new Error("An error occurred while fetching getdevelopers");
        throw error;
    }

    const getdevelopers = await response.json();

    return new Response(JSON.stringify(getdevelopers), {
        headers: { 'Content-Type': 'application/json' },
    });
}