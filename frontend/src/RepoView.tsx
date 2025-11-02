import {useLoaderData } from "react-router";
import FileTree from './components/FileTree'
import {useRepoStore} from './store/repoStore'

export default function RepoView() {
  const repoNodes = useLoaderData();
  console.log(repoNodes)

  return (
    <>
      <div className="text-4xl font-bold">{useRepoStore.getState().repoName}</div>
      <FileTree nodes={repoNodes}/>
    </>
  )

}
