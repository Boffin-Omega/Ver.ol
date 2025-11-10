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
type author = {
  _id:string,
  username:string,
  email:string,
}
export type Commit = {
    _id: string;
    repoId: string;
    message: string;
    author: author; // reference to the user who pushed the commit
    parentCommitId: string|null;
    timestamp: Date;
}
export type Change =
  | {
      type: "rename";
      nodeId: string;
      payload: { oldName:string,newName: string };
    }
  | {
      type: "move";
      nodeId: string;
      payload: { src:string, dest:string, newParentId: string };
    }
  | {
      type: "delete";
      nodeId: string;
      payload: {
        deletedNodeName:string
      };
    }
  | {
      type: "edit";
      nodeId: string;
      payload: {
        newContent: string;
      };
    };
export type UINode = node & { isExpanded?: boolean; children?: UINode[] };

