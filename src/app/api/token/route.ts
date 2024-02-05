import { cookies } from "next/headers";

export async function POST(req: Request){
    const data = await req.json();

    if(data.token){
        cookies().set('token',data.token)
    }else{
        cookies().delete('token')
    }
    return new Response(JSON.stringify(data), {
        headers: { "content-type": "application/json" },
        status: 200,
    });
}