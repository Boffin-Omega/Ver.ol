import { create } from "zustand";
import type {UINode, Change} from '../types'

interface RepoState {
  repoId: string;
  repoName: string;
  commitId: string;
  nodes: UINode[];
  stagedNodes: UINode[];
  stagedChanges: Change[];
  mode: "viewing" | "staging";

  // actions
  setRepoInfo: (id: string, name: string) => void;
  setCommitId: (commitId: string) => void;
  setNodes: (nodes: UINode[]) => void;
  setMode: (mode: "viewing" | "staging") => void;
  appendChildren: (parentId: string, children: UINode[]) => void;
  toggleExpand: (nodeId: string) => void;
  clearStore: () => void;
}

export const useRepoStore = create<RepoState>((set, get) => ({
  repoId: "",
  repoName: "",
  commitId: "",
  nodes: [],
  stagedNodes: [],
  stagedChanges: [],
  mode: "viewing",

  setRepoInfo: (id, name) => set({ repoId: id, repoName: name }),
  
  setCommitId: (commitId) => set({ commitId }),

  setNodes: (nodes) => set({ nodes }),

  setMode: (mode) => {
    if (mode === "staging") {
      // Deep clone nodes into stagedNodes
      const cloned = structuredClone(get().nodes);
      set({ stagedNodes: cloned, mode });
    } else {
      set({ stagedNodes: [], mode });
    }
  },


  appendChildren: (parentId, children) =>
    set((state) => {
      const attachChildren = (nodes: UINode[]): UINode[] =>
        nodes.map((n) => {
          if (n._id === parentId) {
            return {
              ...n,
              children, // replace instead of append
            };
          }
          if (n.children) {
            return { ...n, children: attachChildren(n.children) };
          }
          return n;
        });

      const targetKey =
        state.mode === "staging" ? "stagedNodes" : "nodes";

      return { [targetKey]: attachChildren(state[targetKey]) } as Partial<RepoState>;
  }),


  toggleExpand: (nodeId) =>
    set((state) => {
      const toggle = (nodes: UINode[]): UINode[] =>
        nodes.map((n) => {
          if (n._id === nodeId) {
            return { ...n, isExpanded: !n.isExpanded };
          }
          if (n.children) {
            return { ...n, children: toggle(n.children) };
          }
          return n;
        });

      const targetKey =
        state.mode === "staging" ? "stagedNodes" : "nodes";

      return { [targetKey]: toggle(state[targetKey]) } as Partial<RepoState>;
    }),

  clearStore: () => set({ nodes: [], stagedNodes: [],mode:'viewing',stagedChanges: [], commitId: "" }),
}));
