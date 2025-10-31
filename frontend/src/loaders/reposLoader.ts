import type { LoaderFunctionArgs } from 'react-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;
interface repo{
    id:string
    name:string,
    owner:string,
    commits: string[],
    createdAt: string; 
    updatedAt: string; 
    __v: number;
}
export async function reposLoader({ params }: LoaderFunctionArgs):Promise<repo[]> {
    const userId = params.userId;
    if (!userId) {
        console.error("Userid is missing")
        throw new Response("Missing userId parameter", { status: 400 });
    }
    try{
        console.log(userId)
        const res = await fetch(`${BASE_URL}/app/repo/api/${userId}/repos`);
        const repos = await res.json();
        return repos;
    }
    catch(error){
        console.error('Some error happened ',error);
        throw error;
    }

}