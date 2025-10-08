import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const developerid = searchParams.get('developerid') || '';
    const city = searchParams.get('city') || '';
    const community = searchParams.get('community') || '';
    const subcommunity = searchParams.get('subcommunity') || '';
    const page = searchParams.get('page') || '';
    const apiurl = `https://admin.elbayt.com/api/getprojectslist.php?developerid=${developerid}&city=${city}&community=${community}&subcommunity=${subcommunity}&page=${page}`;
    console.log('Fetching getproperties data...'+developerid);
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