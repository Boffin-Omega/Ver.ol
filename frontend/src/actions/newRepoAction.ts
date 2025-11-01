import {redirect} from "react-router"
import type {ActionFunctionArgs} from 'react-router'
import {authFetch} from '../utils/authFetch'

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function newRepoAction({ request }: ActionFunctionArgs){
    const formData = await request.formData();
    console.log(formData);
    try{
        const res = await authFetch(`${BASE_URL}/app/repo/upload`,{
            method:'POST',
            body: formData,
        });
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const response = await res.json();
        console.log(response);
        console.log("Success");
        return redirect('/app');
        
    }
    catch(err){
        console.error('Error during fetch',err);
        return null;//ideally some new view it shud return but oh well xd
    }
}