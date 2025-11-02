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
export type UINode = node & { isExpanded?: boolean; children?: UINode[] };
