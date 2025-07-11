"use client"

import * as React from "react"
import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
  Edit,
  Trash2,
  FileText,
  FolderPlus,
  X,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from "@/components/ui/context-menu"
import { ContextMenuTrigger } from "@/components/ui/context-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

export interface FileTreeNode {
  id: string
  name: string
  type: "file" | "folder"
  children?: FileTreeNode[]
  parentId?: string
}

interface FileTreeProps {
  data: FileTreeNode[]
  selectedNodeId?: string | null
  onNodeSelect?: (node: FileTreeNode) => void
  onNodeCreate?: (parentId: string | null, name: string, type: "file" | "folder") => void
  onNodeRename?: (nodeId: string, newName: string) => void
  onNodeDelete?: (nodeId: string) => void
}

interface InlineInputState {
  folderId: string | null
  type: "file" | "folder" | null
  value: string
}

interface RenameState {
  nodeId: string | null
  value: string
}

// Utility function to sort tree nodes: folders first (alphabetically), then files (alphabetically)
const sortTreeNodes = (nodes: FileTreeNode[]): FileTreeNode[] => {
  return [...nodes].sort((a, b) => {
    // Folders always come before files
    if (a.type === "folder" && b.type === "file") return -1
    if (a.type === "file" && b.type === "folder") return 1

    // Within the same type, sort alphabetically (case-insensitive)
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  })
}

export function FileTree({
  data,
  selectedNodeId,
  onNodeSelect,
  onNodeCreate,
  onNodeRename,
  onNodeDelete,
}: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(new Set())
  const [selectedNode, setSelectedNode] = React.useState<string | null>(selectedNodeId || null)
  const [hoveredFolder, setHoveredFolder] = React.useState<string | null>(null)
  const [inlineInput, setInlineInput] = React.useState<InlineInputState>({
    folderId: null,
    type: null,
    value: "",
  })
  const [renameState, setRenameState] = React.useState<RenameState>({
    nodeId: null,
    value: "",
  })

  // Refs for managing focus
  const createInputRef = React.useRef<HTMLInputElement>(null)
  const renameInputRef = React.useRef<HTMLInputElement>(null)

  // Update selected node when prop changes
  React.useEffect(() => {
    if (selectedNodeId !== undefined) {
      setSelectedNode(selectedNodeId)
    }
  }, [selectedNodeId])

  // Focus create input when it becomes active
  React.useEffect(() => {
    if (inlineInput.type && createInputRef.current) {
      // Use setTimeout to ensure the input is rendered before focusing
      setTimeout(() => {
        createInputRef.current?.focus()
        createInputRef.current?.select()
      }, 0)
    }
  }, [inlineInput.type, inlineInput.folderId])

  // Focus rename input when it becomes active
  React.useEffect(() => {
    if (renameState.nodeId && renameInputRef.current) {
      // Use setTimeout to ensure the input is rendered before focusing
      setTimeout(() => {
        renameInputRef.current?.focus()
        renameInputRef.current?.select()
      }, 0)
    }
  }, [renameState.nodeId])

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(folderId)) {
        newSet.delete(folderId)
      } else {
        newSet.add(folderId)
      }
      return newSet
    })
  }

  const handleNodeClick = (node: FileTreeNode) => {
    if (node.type === "folder") {
      toggleFolder(node.id)
    }
    setSelectedNode(node.id)
    onNodeSelect?.(node)
  }

  const startInlineCreate = (folderId: string | null, type: "file" | "folder") => {
    // If creating in a folder, make sure it's expanded
    if (folderId) {
      setExpandedFolders((prev) => new Set([...prev, folderId]))
    }

    setInlineInput({
      folderId,
      type,
      value: "",
    })
  }

  const confirmInlineCreate = () => {
    if (inlineInput.value.trim() && inlineInput.type) {
      onNodeCreate?.(inlineInput.folderId, inlineInput.value.trim(), inlineInput.type)
      setInlineInput({ folderId: null, type: null, value: "" })
    }
  }

  const cancelInlineCreate = () => {
    setInlineInput({ folderId: null, type: null, value: "" })
  }

  const startRename = (nodeId: string, currentName: string) => {
    setRenameState({ nodeId, value: currentName })
  }

  const confirmRename = () => {
    if (renameState.value.trim() && renameState.nodeId) {
      onNodeRename?.(renameState.nodeId, renameState.value.trim())
      setRenameState({ nodeId: null, value: "" })
    }
  }

  const cancelRename = () => {
    setRenameState({ nodeId: null, value: "" })
  }

  const handleDelete = (nodeId: string) => {
    onNodeDelete?.(nodeId)
  }

  const renderInlineInput = (folderId: string | null, depth: number) => {
    if (inlineInput.folderId !== folderId || !inlineInput.type) return null

    return (
      <div className="flex items-center gap-1 py-1 px-2 text-sm" style={{ paddingLeft: `${depth * 12 + 20}px` }}>
        <div className="h-4 w-4" />
        {inlineInput.type === "folder" ? (
          <Folder className="h-4 w-4 text-blue-500" />
        ) : (
          <File className="h-4 w-4 text-gray-500" />
        )}
        <Input
          ref={createInputRef}
          value={inlineInput.value}
          onChange={(e) => setInlineInput((prev) => ({ ...prev, value: e.target.value }))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              confirmInlineCreate()
            } else if (e.key === "Escape") {
              cancelInlineCreate()
            }
          }}
          onBlur={cancelInlineCreate}
          className="h-6 text-xs border-none shadow-none p-0 focus-visible:ring-1 focus-visible:ring-ring"
          placeholder={`New ${inlineInput.type}`}
        />
        <Button variant="ghost" size="sm" className="h-4 w-4 p-0" onClick={confirmInlineCreate}>
          <Check className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-4 w-4 p-0" onClick={cancelInlineCreate}>
          <X className="h-3 w-3" />
        </Button>
      </div>
    )
  }

  const renderNode = (node: FileTreeNode, depth = 0) => {
    const isExpanded = expandedFolders.has(node.id)
    const isSelected = selectedNode === node.id
    const hasChildren = node.children && node.children.length > 0
    const isHovered = hoveredFolder === node.id
    const isRenaming = renameState.nodeId === node.id

    return (
      <div key={node.id}>
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div
              className={cn(
                "flex items-center gap-1 py-1 px-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm group",
                isSelected && "bg-primary/10 text-primary border-l-2 border-primary",
                !isSelected && "hover:bg-accent hover:text-accent-foreground",
                "select-none relative transition-colors duration-150",
              )}
              style={{ paddingLeft: `${depth * 12 + 8}px` }}
              onClick={() => !isRenaming && handleNodeClick(node)}
              onMouseEnter={() => node.type === "folder" && setHoveredFolder(node.id)}
              onMouseLeave={() => setHoveredFolder(null)}
            >
              {node.type === "folder" ? (
                <>
                  <Collapsible open={isExpanded}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        {hasChildren || inlineInput.folderId === node.id ? (
                          isExpanded ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )
                        ) : (
                          <div className="h-3 w-3" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </Collapsible>
                  {isExpanded ? (
                    <FolderOpen className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Folder className="h-4 w-4 text-blue-500" />
                  )}
                </>
              ) : (
                <>
                  <div className="h-4 w-4" />
                  <File className="h-4 w-4 text-gray-500" />
                </>
              )}

              {isRenaming ? (
                <Input
                  ref={renameInputRef}
                  value={renameState.value}
                  onChange={(e) => setRenameState((prev) => ({ ...prev, value: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      confirmRename()
                    } else if (e.key === "Escape") {
                      cancelRename()
                    }
                  }}
                  onBlur={cancelRename}
                  className="h-6 text-xs border-none shadow-none p-0 focus-visible:ring-1 focus-visible:ring-ring flex-1"
                />
              ) : (
                <span className="truncate flex-1">{node.name}</span>
              )}

              {/* Hover actions for folders */}
              {node.type === "folder" && isHovered && !isRenaming && (
                <div className="flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      startInlineCreate(node.id, "file")
                    }}
                    title="New File"
                  >
                    <FileText className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      startInlineCreate(node.id, "folder")
                    }}
                    title="New Folder"
                  >
                    <FolderPlus className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            {node.type === "folder" && (
              <>
                <ContextMenuItem onClick={() => startInlineCreate(node.id, "file")}>
                  <FileText className="h-4 w-4 mr-2" />
                  New File
                </ContextMenuItem>
                <ContextMenuItem onClick={() => startInlineCreate(node.id, "folder")}>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Folder
                </ContextMenuItem>
                <ContextMenuSeparator />
              </>
            )}
            <ContextMenuItem onClick={() => startRename(node.id, node.name)}>
              <Edit className="h-4 w-4 mr-2" />
              Rename
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleDelete(node.id)} className="text-destructive focus:text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        {/* Inline input for creating new items */}
        {node.type === "folder" && renderInlineInput(node.id, depth)}

        {/* Children */}
        {node.type === "folder" && (hasChildren || inlineInput.folderId === node.id) && (
          <Collapsible open={isExpanded}>
            <CollapsibleContent>
              {sortTreeNodes(node.children || []).map((child) => renderNode(child, depth + 1))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Header with create buttons */}
      <div className="flex items-center justify-between p-2 border-b">
        <span className="text-sm font-medium">Explorer</span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => startInlineCreate(null, "file")}
            title="New File"
          >
            <FileText className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => startInlineCreate(null, "folder")}
            title="New Folder"
          >
            <FolderPlus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* File tree with context menu for empty space */}
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="p-1 min-h-[200px]">
            {/* Root level inline input */}
            {renderInlineInput(null, 0)}
            {sortTreeNodes(data).map((node) => renderNode(node))}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => startInlineCreate(null, "file")}>
            <FileText className="h-4 w-4 mr-2" />
            Create File
          </ContextMenuItem>
          <ContextMenuItem onClick={() => startInlineCreate(null, "folder")}>
            <FolderPlus className="h-4 w-4 mr-2" />
            Create Folder
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}
