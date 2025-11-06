import Folder from "./Folder";
import File from "./File";
import type { UINode } from "../types";

export default function FileTree({ nodes }: { nodes: UINode[] }) {
  if (!nodes || nodes.length === 0) return <div>No files</div>;
  
  // Find the root node
  const rootNode = nodes.find((n: UINode) => n.type === 'folder' && n.parentNodeId === null);
  
  if (!rootNode) return <div>No root folder found</div>;
  
  console.log('FileTree rendering root:', rootNode.name, 'children:', rootNode.children?.map(c => c.name));
  
  return (
    <div className="font-mono text-sm">
      {rootNode.children?.map((node) => {
        if (node.type === "folder") {
          return <Folder key={node._id} nodeId={node._id} level={0} />;
        } else {
          return <File key={node._id} node={node} level={0} />;
        }
      })}
    </div>
  );
}