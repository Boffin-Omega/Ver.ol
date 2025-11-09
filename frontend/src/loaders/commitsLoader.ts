import {authFetch} from '../utils/authFetch'
import type {LoaderFunctionArgs} from 'react-router'
const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function commitsLoader({ params }: LoaderFunctionArgs){
    const {repoId} = params;
    if(!repoId) throw Error('no repoId given!');

    console.log('repoId');

    try{
        const res = await authFetch(`${BASE_URL}/app/repo/api/getCommits/${repoId}`);
        if (!res.ok) throw new Error(`Error with status code: ${res.status}`);
        return res.json()
    }
    catch(error){
        console.error("Error occurred in the file loader!", error);
        throw error;
    }

}