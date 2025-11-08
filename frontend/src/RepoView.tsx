import { useMemo } from "react";
import { useLoaderData } from "react-router";
import FileTree from "./components/FileTree";
import Terminal from "./components/Terminal";
import { useRepoStore } from "./store/repoStore";

export default function RepoView() {
  const repoNodes = useLoaderData(); // keep typing minimal for now

  // subscribe once with a stable selector object (primitive values and arrays)
  const mode = useRepoStore((s) => s.mode);
  const nodes = useRepoStore((s) => s.nodes);
  const stagedNodes = useRepoStore((s) => s.stagedNodes);
  const repoName = useRepoStore((s) => s.repoName);
  const stagedChanges = useRepoStore((s)=>s.stagedChanges)
  const visibleNodes = useMemo(() => (mode === "staging" ? stagedNodes : nodes), [
    mode,
    nodes,
    stagedNodes,
  ]);

  if (!visibleNodes) return null;

  console.log("RepoView rendering:", visibleNodes.length);

  return (
    <div className="p-4">
      <div className="max-h-72 overflow-y-auto rounded-lg">
        <Terminal />
      </div>

    <div className="mb-4">
          {mode === "viewing" ? (
            <div className="font-bold text-xl">Mode: {mode}</div>
          ) : (
            <div>
              <div className="font-bold text-xl">Mode: {mode}</div>
              <div>Staged Changes</div>
              <ul className="list-disc pl-6">
                {stagedChanges.map((change, idx) => (
                  <li key={idx}>
                    {change.type === "rename" &&
                      `Rename node  ${change.payload.oldName} → ${change.payload.newName}`}
                    {change.type === "move" &&
                      `Move node ${change.payload.src} → ${change.payload.dest}`}
                    {change.type === "delete" &&
                      `Delete node ${change.payload.deletedNodeName}`}
                  </li>
                ))}
              </ul>
            </div>

          )}
        </div>

      <div className="mt-4 pt-4">
        <div className="text-4xl mb-4 font-bold">{repoName}</div>

        {/* fallback to loader nodes only if visibleNodes is empty */}
        <FileTree nodes={visibleNodes.length > 0 ? visibleNodes : repoNodes} />
      </div>
    </div>
  );
}
