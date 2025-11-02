import { create } from "zustand";
import type {UINode} from '../types'


type RepoState = {
  repoId:string,
  repoName:string,
  nodes: UINode[];
  setNodes: (nodes: UINode[]) => void;
  appendChildren: (parentId: string, children: UINode[]) => void;
  toggleExpand: (nodeId: string) => void;
  clearStore: () => void;
};

export const useRepoStore = create<RepoState>((set) => ({
  repoId:'',
  repoName:'',
  nodes: [],

  setNodes: (nodes) => set({ nodes }),

  appendChildren: (parentId, children) =>
    set((state) => {
      const attachChildren = (nodes: UINode[]): UINode[] =>
        nodes.map((n) => {
          if (n._id === parentId) {
            return {
              ...n,
              children: [...(n.children || []), ...children],
            };
          }
          if (n.children) {
            return { ...n, children: attachChildren(n.children) };
          }
          return n;
        });
      return { nodes: attachChildren(state.nodes) };
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
      return { nodes: toggle(state.nodes) };
    }),

  clearStore: () => set({ nodes: [] }),
}));
