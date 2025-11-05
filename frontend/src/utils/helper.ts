import type {UINode, Change} from '../types'
import {authFetch} from './authFetch'
import { useRepoStore } from "../store/repoStore";
import {useTerminalStore} from '../store/terminalStore';

const BASE_URL = import.meta.env.VITE_BASE_URL

//to fix folders not expanding in staging mode
export function findNode(id: string, mode: 'staging' | 'viewing') {
  const { nodes, stagedNodes } = useRepoStore.getState();
  const targetNodes = mode === 'staging' ? stagedNodes : nodes;
  return findNodeHelper(targetNodes, id);
}

function findNodeHelper(nodes:UINode[],id: string): UINode | null {
  for (const node of nodes) {
    if (node._id === id) return node;
    if (node.children) {
      const found = findNodeHelper(node.children,id);
      if (found) return found;
    }
  }
  return null;
}
export async function appendChildrenNodes(node: UINode) {
  const { appendChildren } = useRepoStore.getState();

  // Don’t refetch if already populated
  if (node.children && node.children.length > 0) return;

  const res = await authFetch(`${BASE_URL}/app/repo/api/${node.commitId}/${node._id}`);
  const children = await res.json();

  console.log(`Children of ${node.name}`, children);
  appendChildren(node._id, children);
}


export function findcwdNode(pwd: string): UINode | null {
  const { mode, nodes, stagedNodes} = useRepoStore.getState();

  // compute visible nodes reactively
  const visibleNodes = mode === "staging" ? stagedNodes : nodes;
  console.log('visibleNodes', visibleNodes)

  // handle root
  const pathParts = pwd.split('/').filter(Boolean);
  console.log(pathParts)
  if(pathParts.length === 0) return null;
  // split and remove empty parts (caused by leading "/")

  // start at root folder
  let cwdNode = visibleNodes.find((n:UINode)=>n.type==='folder' && n.parentNodeId===null);
  if (!cwdNode) return null;//should never happen

  // walk down the path
  for (let i = 1; i < pathParts.length; i++) {
    cwdNode =
      cwdNode.children?.find(
        n => n.type === 'folder' && n.name === pathParts[i]
      );

    if (!cwdNode) return null;
  }

  return cwdNode;
}
export function listAll(pwd:string){
    const cwdNode = findcwdNode(pwd);
    if (!cwdNode) return 'Invalid pwd path';
    if (!cwdNode.children || cwdNode.children.length === 0) return '(empty folder)';

    return cwdNode.children
        .map(child => child.type==='folder' ? child.name.concat('/'):child.name)
        .join('\n');
}
export async function cwd(pwd: string, directory: string){
    if(directory === '..'){
      const pathParts =  pwd.split('/').filter(Boolean);
      const parentPath = pathParts.slice(0,-1).join('/');
      console.log('switched back to',parentPath);
      useTerminalStore.setState({pwd:parentPath});
      return `Switched back to ${parentPath}`
    }
    const cwdNode = findcwdNode(pwd);
    if (!cwdNode) return 'Invalid pwd path';
    //first find dir in children of cwdNode
    //if dir exists, set pwd,load its children
    const dir = cwdNode.children?.find(child=>child.type==='folder' && child.name===directory);
    if(!dir) return `${directory} not found!`;
    useTerminalStore.setState({pwd:`${pwd}/${dir.name}`});
    //load dir's children too, only if it doesnt exist

    if(!dir.children) await appendChildrenNodes(dir);

    return `Changed directory to ${dir.name}`

}
  // Helper to recursively update the tree
function renameInTree(nodes: UINode[],oldNode:UINode,newName:string): UINode[] {
    return nodes.map(n => {
      if (n._id === oldNode._id) {
        console.log("Renaming:", n.name, "->", newName, "children:", n.children);
        return { ...n, name: newName };
      }
      if (n.children) {
        return { ...n, children: renameInTree(n.children,oldNode,newName) };
      }
      return n;
    });
  }
export function renameHelper(oldName: string, newName: string) {
  const mode = useRepoStore.getState().mode;
  if (mode !== "staging") return "Please switch to staging mode!";
  if (!oldName || !newName) return "Invalid arguments, must provide valid name";

  const pwd = useTerminalStore.getState().pwd;
  const currWorkingDir = findcwdNode(pwd);
  if (!currWorkingDir) return "Error retrieving current working directory!";

  // Ensure no duplicate
  if (currWorkingDir.children?.some(child => child.name === newName))
    return `${newName} already exists!`;

  const oldNode = currWorkingDir.children?.find(child => child.name === oldName);
  if (!oldNode) return `${oldName} not found!`;

  // Deep clone stagedNodes to safely mutate
  const stagedNodes = structuredClone(useRepoStore.getState().stagedNodes);

  const updatedNodes = renameInTree(stagedNodes,oldNode,newName);

  useRepoStore.setState({ stagedNodes: updatedNodes });

  // Record change
  const stagedChanges = useRepoStore.getState().stagedChanges;
  const change: Change = {
    type: "rename",
    nodeId: oldNode._id,
    payload: { newName },
  };
  useRepoStore.setState({ stagedChanges: [...stagedChanges, change] });
  console.log(useRepoStore.getState().stagedChanges);
  return `${oldName} renamed to ${newName}`;
}
