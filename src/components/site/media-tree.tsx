"use client";

import * as React from "react";
import { FileTree, type FileTreeNode } from "./file-tree";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Sample data structure
const initialData: FileTreeNode[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        type: "folder",
        parentId: "1",
        children: [
          {
            id: "3",
            name: "ui",
            type: "folder",
            parentId: "2",
            children: [
              { id: "4", name: "button.tsx", type: "file", parentId: "3" },
              { id: "5", name: "input.tsx", type: "file", parentId: "3" },
              { id: "6", name: "card.tsx", type: "file", parentId: "3" },
            ],
          },
          { id: "7", name: "header.tsx", type: "file", parentId: "2" },
          { id: "8", name: "footer.tsx", type: "file", parentId: "2" },
        ],
      },
      {
        id: "9",
        name: "pages",
        type: "folder",
        parentId: "1",
        children: [
          { id: "10", name: "index.tsx", type: "file", parentId: "9" },
          { id: "11", name: "about.tsx", type: "file", parentId: "9" },
        ],
      },
      { id: "12", name: "app.tsx", type: "file", parentId: "1" },
      { id: "13", name: "main.tsx", type: "file", parentId: "1" },
    ],
  },
  {
    id: "14",
    name: "public",
    type: "folder",
    children: [
      { id: "15", name: "favicon.ico", type: "file", parentId: "14" },
      { id: "16", name: "logo.svg", type: "file", parentId: "14" },
    ],
  },
  { id: "17", name: "package.json", type: "file" },
  { id: "18", name: "README.md", type: "file" },
  { id: "19", name: "tsconfig.json", type: "file" },
];

// Add sorting utility function
const sortTreeNodes = (nodes: FileTreeNode[]): FileTreeNode[] => {
  return [...nodes].sort((a, b) => {
    // Folders always come before files
    if (a.type === "folder" && b.type === "file") return -1;
    if (a.type === "file" && b.type === "folder") return 1;

    // Within the same type, sort alphabetically (case-insensitive)
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });
};

// Apply initial sorting to the sample data
const applySortingToTree = (nodes: FileTreeNode[]): FileTreeNode[] => {
  return sortTreeNodes(
    nodes.map((node) => ({
      ...node,
      children: node.children ? applySortingToTree(node.children) : undefined,
    }))
  );
};

const sortedInitialData = applySortingToTree(initialData);

export  function MediaTree() {
  const [treeData, setTreeData] =
    React.useState<FileTreeNode[]>(sortedInitialData);
  const [selectedFile, setSelectedFile] = React.useState<FileTreeNode | null>(
    null
  );

  // Helper function to generate unique IDs
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Helper function to find a node by ID
  const findNodeById = (
    nodes: FileTreeNode[],
    id: string
  ): FileTreeNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Helper function to update tree data
  const updateTreeData = (
    nodes: FileTreeNode[],
    updater: (nodes: FileTreeNode[]) => FileTreeNode[]
  ): FileTreeNode[] => {
    return updater(nodes);
  };

  const handleNodeSelect = (node: FileTreeNode) => {
    setSelectedFile(node);
  };

  const handleNodeCreate = (
    parentId: string | null,
    name: string,
    type: "file" | "folder"
  ) => {
    const newNode: FileTreeNode = {
      id: generateId(),
      name,
      type,
      parentId: parentId || undefined,
      children: type === "folder" ? [] : undefined,
    };

    // Automatically select the newly created node
    setSelectedFile(newNode);

    setTreeData((prevData) => {
      if (!parentId) {
        // Add to root and sort
        const newData = [...prevData, newNode];
        return sortTreeNodes(newData);
      }

      // Add to specific parent folder and sort that folder's children
      const addToParent = (nodes: FileTreeNode[]): FileTreeNode[] => {
        return nodes.map((node) => {
          if (node.id === parentId) {
            const updatedChildren = [...(node.children || []), newNode];
            return {
              ...node,
              children: sortTreeNodes(updatedChildren),
            };
          }
          if (node.children) {
            return {
              ...node,
              children: addToParent(node.children),
            };
          }
          return node;
        });
      };

      return addToParent(prevData);
    });
  };

  const handleNodeRename = (nodeId: string, newName: string) => {
    setTreeData((prevData) => {
      const renameNode = (nodes: FileTreeNode[]): FileTreeNode[] => {
        return nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, name: newName };
          }
          if (node.children) {
            return {
              ...node,
              children: renameNode(node.children),
            };
          }
          return node;
        });
      };

      // After renaming, we need to re-sort the tree to maintain order
      const renamedData = renameNode(prevData);

      // Re-sort the entire tree structure
      const reSortTree = (nodes: FileTreeNode[]): FileTreeNode[] => {
        return sortTreeNodes(
          nodes.map((node) => ({
            ...node,
            children: node.children ? reSortTree(node.children) : undefined,
          }))
        );
      };

      return reSortTree(renamedData);
    });

    // Update selected file if it was renamed
    if (selectedFile?.id === nodeId) {
      setSelectedFile((prev) => (prev ? { ...prev, name: newName } : null));
    }
  };

  const handleNodeDelete = (nodeId: string) => {
    setTreeData((prevData) => {
      const deleteNode = (nodes: FileTreeNode[]): FileTreeNode[] => {
        return nodes.filter((node) => {
          if (node.id === nodeId) {
            return false;
          }
          if (node.children) {
            node.children = deleteNode(node.children);
          }
          return true;
        });
      };

      return deleteNode(prevData);
    });

    // Clear selected file if it was deleted
    if (selectedFile?.id === nodeId) {
      setSelectedFile(null);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">File Tree Component</h1>
        <p className="text-muted-foreground mt-2">
          A VS Code-style file tree with context menus, create, rename, and
          delete functionality.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File Tree */}
        <Card className="lg:col-span-1">
          <FileTree
            data={treeData}
            selectedNodeId={selectedFile?.id || null}
            onNodeSelect={handleNodeSelect}
            onNodeCreate={handleNodeCreate}
            onNodeRename={handleNodeRename}
            onNodeDelete={handleNodeDelete}
          />
        </Card>

        {/* File Content Preview */}
        <Card className="lg:col-span-2 p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">File Details</h3>
            <Separator />
            {selectedFile ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Name:</span>
                  <span className="text-sm">{selectedFile.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Type:</span>
                  <span className="text-sm capitalize">
                    {selectedFile.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">ID:</span>
                  <span className="text-sm font-mono text-muted-foreground">
                    {selectedFile.id}
                  </span>
                </div>
                {selectedFile.parentId && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Parent ID:</span>
                    <span className="text-sm font-mono text-muted-foreground">
                      {selectedFile.parentId}
                    </span>
                  </div>
                )}
                {selectedFile.type === "folder" && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Children:</span>
                    <span className="text-sm">
                      {selectedFile.children?.length || 0} items
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Select a file or folder to view details</p>
                <p className="text-sm mt-2">
                  Right-click items for context menu options
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="mt-6 p-6">
        <h3 className="text-lg font-semibold mb-3">How to Use</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            • <strong>Click</strong> on folders to expand/collapse them
          </p>
          <p>
            • <strong>Click</strong> on files or folders to select them
          </p>
          <p>
            • <strong>Hover</strong> over folders to see creation icons (file
            and folder)
          </p>
          <p>
            • <strong>Click creation icons</strong> or use header buttons to
            create new items inline
          </p>
          <p>
            • <strong>Right-click</strong> on any item to open the context menu
          </p>
          <p>
            • <strong>Context menu options:</strong> Create new files/folders
            (folders only), Rename, Delete
          </p>
          <p>
            • Press <strong>Enter</strong> to confirm or <strong>Escape</strong>{" "}
            to cancel inline actions
          </p>
          <p>
            • <strong>Inline editing:</strong> All creation and renaming happens
            directly in the tree
          </p>
          <p>
            • <strong>Auto-sorting:</strong> Folders appear first, then files,
            all sorted alphabetically
          </p>
          <p>
            • <strong>Smart insertion:</strong> New items are automatically
            placed in the correct sorted position
          </p>
          <p>
            • <strong>Auto-selection:</strong> Newly created files and folders
            are automatically selected with enhanced visual highlighting
          </p>
        </div>
      </Card>
    </div>
  );
}
