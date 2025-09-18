export async function getLookupId(lookupItemName: string, lookupTypeName: string): Promise<string | ''> {
  try {
    const apiurl = `https://admin.elbayt.com/api/getlookupid.php?lookupItemName=${encodeURIComponent(lookupItemName)}&lookupTypeName=${encodeURIComponent(lookupTypeName)}`;

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

    const data = await response.json();
    return data[0].id;
  } catch (error) {
    console.error('External API fetch failed:', error);
    return '';
  }
}