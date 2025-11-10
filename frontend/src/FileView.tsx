import { useLoaderData, useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import {useTerminalStore} from './store/terminalStore'
import {useRepoStore} from './store/repoStore'
import Editor from "@monaco-editor/react";
import { Button } from "./components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import type { Change } from "./types";

const langMap: Record<string, string> = {
  js: "javascript",
  jsx:"javascript",
  ts: "typescript",
  tsx:"typescript",
  py: "python",
  java: "java",
  c: "c",
  cpp: "cpp",
  html: "html",
  css: "css",
  json: "json",
  md: "markdown",
  txt: "plaintext",
};

export default function FileView() {
  const { fileContent, fileName, contentType } = useLoaderData() as {
    fileContent: string;
    fileName: string;
    contentType: string;
  };
  const { fileId } = useParams<{ fileId: string }>();
  const navigate = useNavigate();
  const pwd = useTerminalStore.getState().getPwd();
  const mode = useRepoStore((state) => state.mode);
  const stagedChanges = useRepoStore((state) => state.stagedChanges);
  const repoId = useRepoStore((state) => state.repoId);
  const repoName = useRepoStore((state) => state.repoName);

  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  
  // Check if there's an existing edit for this file in stagedChanges
  const existingEdit = stagedChanges.find(
    (change) => change.type === "edit" && change.nodeId === fileId
  );
  
  const [editedContent, setEditedContent] = useState(
    existingEdit && existingEdit.type === "edit" 
      ? existingEdit.payload.newContent 
      : fileContent
  );

  // Track the content that was saved to staging area
  const [savedContent, setSavedContent] = useState(
    existingEdit && existingEdit.type === "edit" 
      ? existingEdit.payload.newContent 
      : fileContent
  );

  // Update editedContent and savedContent when stagedChanges change
  useEffect(() => {
    const edit = stagedChanges.find(
      (change) => change.type === "edit" && change.nodeId === fileId
    );
    if (edit && edit.type === "edit") {
      setEditedContent(edit.payload.newContent);
      setSavedContent(edit.payload.newContent);
    }
  }, [stagedChanges, fileId]);

  const filePath = `${pwd}/${fileName}`
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  const language = langMap[ext] || "plaintext";

  const handleEditClick = () => {
    if (mode !== "staging") {
      setShowDialog(true);
      return;
    }
    setIsEditing(true);
  };

  const handleSwitchToStaging = () => {
    useRepoStore.getState().setMode("staging");
    setShowDialog(false);
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (!fileId) return;
    
    // Check if content actually changed from the saved/original version
    if (editedContent === savedContent) {
      setIsEditing(false);
      return;
    }
    
    const newChange: Change = {
      type: "edit",
      nodeId: fileId,
      payload: {
        newContent: editedContent,
      },
    };

    // Check if there's already an edit change for this file
    const existingChangeIndex = stagedChanges.findIndex(
      (change) => change.type === "edit" && change.nodeId === fileId
    );

    if (existingChangeIndex !== -1) {
      // Update existing change
      const updatedChanges = [...stagedChanges];
      updatedChanges[existingChangeIndex] = newChange;
      useRepoStore.setState({ stagedChanges: updatedChanges });
    } else {
      // Add new change
      useRepoStore.setState({ stagedChanges: [...stagedChanges, newChange] });
    }

    // Update saved content to current edited content
    setSavedContent(editedContent);
    setIsEditing(false);
  };

  const handleDiscardChanges = () => {
    // Revert to the last saved content (whether that's from staging or original)
    setEditedContent(savedContent);
    setIsEditing(false);
  };

  const handleBackToRepo = () => {
    if (repoId && repoName) {
      navigate(`/app/repoview/${repoId}/${repoName}`);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditedContent(value);
    }
  };

  // Image handling
  if (contentType.startsWith("image/")) {
    return (
      <>
        <div className="font-bold text-3xl">{filePath}</div>
        <img src={fileContent} alt={filePath} className="max-w-full h-auto" />
      </>
    );
  }

  // PDF handling
  if (contentType === "application/pdf") {
    return (
      <>
        <div className="font-bold text-3xl">{filePath}</div>
        <iframe
          src={fileContent}
          width="100%"
          height="800px"
          title={filePath}
        />
      </>
    );
  }

  // Code or text-like content
  const isTextLike =
    contentType.startsWith("text/") ||
    contentType.includes("json") ||
    langMap[ext];

  if (isTextLike) {
    return (
      <>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Switch to Staging Mode?</DialogTitle>
              <DialogDescription>
                You need to be in staging mode to edit files. Would you like to switch to staging mode now?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSwitchToStaging}>
                Switch to Staging Mode
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex items-center gap-4 mb-4">
          <Button 
            onClick={handleBackToRepo} 
            variant="outline" 
            size="icon"
            title="Back to repository"
          >
            <ArrowLeft />
          </Button>
          <div className="flex-1 flex justify-between items-center">
            <div className="font-bold text-3xl">{filePath}</div>
            {!isEditing && (
              <Button onClick={handleEditClick} variant="default">
                Edit File
              </Button>
            )}
            {isEditing && (
              <div className="flex gap-2">
                <Button onClick={handleSaveChanges} variant="default">
                  Save Changes
                </Button>
                <Button onClick={handleDiscardChanges} variant="destructive">
                  Discard Changes
                </Button>
              </div>
            )}
          </div>
        </div>
        <Editor
          value={editedContent}
          language={language}
          theme="vs-dark"
          options={{ readOnly: !isEditing }}
          onChange={handleEditorChange}
          height="80vh"
        />
      </>
    );
  }

  // Fallback for unsupported files
  return (
    <div>
      <div className="font-bold text-3xl">{filePath}</div>
      Unsupported format D:
    </div>
  );
}
