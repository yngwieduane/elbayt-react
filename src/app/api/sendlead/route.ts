import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const data = await request.json(); // Get JSON data from the request body
    console.log('Received data:', data);
    const firstName = data.firstName;
    const lastName = data.lastName;
    const phone = data.phone;
    const email = data.email;
    const message = data.message;
    const currentUrl = data.currentUrl;
    const apiurl = `https://admin.elbayt.com/api/sendemail.php`;
    const response = await fetch(
        apiurl,
        {
            method: "POST",
            headers:{
                'accept':'*/*',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                body: `
                <h2>New Lead Submission</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
                <p><strong>Form Submitted From:</strong> ${currentUrl}</p>
                `,
                receiver: "elbaytae@gmail.com,elbayteg@gmail.com",
                subject: `New Lead - ${firstName} ${lastName} - ${phone} `,
                filename: "",
                filedata: "",
            }),
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