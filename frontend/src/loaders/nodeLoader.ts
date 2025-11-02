import {authFetch} from '../utils/authFetch'
const BASE_URL = import.meta.env.VITE_BASE_URL;
import type {LoaderFunctionArgs} from 'react-router'
import {useRepoStore} from '../store/repoStore'

export async function repoNodesLoader({ params }: LoaderFunctionArgs){
    const {repoId, repoName} = params;

    if(repoId!= useRepoStore.getState().repoId){
        //navigating to different/initial repository
        useRepoStore.getState().clearStore()
        useRepoStore.setState({repoId:repoId, repoName:repoName})
        console.log('Navigating to new repo',repoName,repoId)
    }
    console.log('repository id:',repoId)

    const nodes = useRepoStore.getState().nodes
    if(nodes && nodes.length > 0){
        return nodes.filter(node=>node.parentNodeId===repoId)
    }
    try{
        const res = await authFetch(`${BASE_URL}/app/repo/api/${repoId}`,{
            method: 'GET'
        });
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const repoNodes = await res.json();
        console.log(repoNodes)
        useRepoStore.getState().setNodes(repoNodes)
        return useRepoStore.getState().nodes;//newly modified nodes
        
    }
    catch(error){
        console.error('Some error happened in the loader!',error);
        throw error;
    }
}