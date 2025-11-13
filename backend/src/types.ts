interface node{
    _id: string;
    repoId: string;
    commitId: string;
    parentNodeId: string|null;
    name: string;
    type: 'file' | 'folder';
    gridFSFileId: string|null;
    timestamp: Date;
}
export type Change = | {
      type: "rename";
      nodeId: string;
      payload: { oldName:string,newName: string };
    } |
    {
      type: "move";
      nodeId: string;
      payload: { src:string, dest:string, newParentId: string };
    } |
    {
      type: "delete";
      nodeId: string;
      payload: { deletedNodeName:string };
    } |
    {
      type: "edit";
      nodeId: string;
      payload: {newContent: string};
    } |
    {
      type: "create";
      nodeId: string;
      payload: {fileName: string, parentNodeId: string};
    }
export type UINode = node & { isExpanded?: boolean; children?: UINode[] };

