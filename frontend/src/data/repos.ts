// src/data/repos.js

//hopefully this comes from server backend
export const repos = [
  {
    id: "101",
    name: "Project Alpha",
    files: [
      { id: "f1", name: "index.js" },
      { id: "f2", name: "App.jsx" },
      { id: "f3", name: "package.json" },
    ],
  },
  {
    id: "102",
    name: "Backend API",
    files: [
      { id: "f1", name: "server.js" },
      { id: "f2", name: "routes.js" },
      { id: "f3", name: "config.json" },
    ],
  },
  {
    id: "103",
    name: "Frontend UI",
    files: [
      { id: "f1", name: "main.jsx" },
      { id: "f2", name: "Home.jsx" },
      { id: "f3", name: "Navbar.jsx" },
    ],
  },
];

// Simulate async API call
export async function getRepoById(repoId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const repo = repos.find((r) => r.id === repoId);
      if (repo) resolve(repo);
      else reject(new Error("Repo not found"));
    }, 400); // simulate network delay
  });
}
