import { authFetch } from "../utils/authFetch";
import type { Change } from "../types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface CommitPayload {
  repoId: string;
  message: string;
}

export async function createCommitAction(
  commitId: string,
  stagedChanges: Change[],
  payload: CommitPayload
) {
  try {
    const response = await authFetch(
      `${BASE_URL}/app/repo/api/commit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commitId,
          stagedChanges,
          repoId: payload.repoId,
          message: payload.message
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.msg || "Failed to create commit");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating commit:", error);
    throw error;
  }
}
