import { useParams, useLoaderData } from "react-router";
import { getRepoById } from "./data/repos.ts";

export async function repoLoader({ params }) {
  const { repoId } = params;
  const repo = await getRepoById(repoId);
  return repo;
}

export default function RepoView() {
  const { repoId } = useParams();
  console.log(repoId);
  const repo = useLoaderData();
  console.log(repo)

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">
        {repo.name} (ID: {repoId})
      </h1>
      <h2 className="text-lg mb-2">Files:</h2>
      <ul className="list-disc pl-6">
        {repo.files.map((file) => (
          <li key={file.id}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}
