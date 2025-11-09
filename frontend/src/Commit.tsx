import { useLoaderData } from "react-router";
import type { Commit } from "./types";
import FileTree from "./components/FileTree";

export default function Commit() {
  const data = useLoaderData();
  const { repoName, commit, nodes } = data;
  const formattedDate = new Date(commit.timestamp).toLocaleString();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Repository name header */}
        <div className="mb-4">
          <h1 className="text-xl hover:underline cursor-pointer font-semibold">
            {repoName}
          </h1>
        </div>

        {/* Commit header card */}
        <div className="bg-white border border-gray-300 rounded-lg mb-4">
          <div className="px-4 py-3 border-b border-gray-300">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-base mr-3 flex-shrink-0">
                {commit.author.username[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <span className="font-semibold text-gray-900 text-base">
                    {commit.author.username}
                  </span>
                  <span className="text-gray-600 text-base ml-1">
                    committed on {formattedDate}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  {commit.message}
                </h2>
                <div className="flex items-center space-x-3 text-sm">
                  <span className="text-gray-600">1 parent</span>
                  <span className="text-gray-400">•</span>
                  <span className="font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200 text-xs hover:bg-blue-100 cursor-pointer">
                    {commit._id.slice(0, 7)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Branch info */}
          <div className="px-4 py-2 bg-blue-50 border-b border-gray-300 text-sm">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-gray-700" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"/>
              </svg>
              <span className="font-semibold text-gray-900 font-mono">main</span>
            </div>
          </div>
        </div>

        {/* Files changed section */}
        <div className="bg-white border border-gray-300 rounded-lg">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-300">
            <h3 className="font-semibold text-gray-900 text-sm">
              Repository Content
            </h3>
          </div>
          <div className="p-4">
            <FileTree nodes={nodes} />
          </div>
        </div>
      </div>
    </div>
  );
}