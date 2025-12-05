"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AudioPlayer } from "./audio-player"
import {Card} from "@/components/ui/card"
 

export const getAudioUrl = (src: string): string => {
  return `/media/mondly/audios/${src}`
}


interface Item {
  id: number
  word_id: number
  mother_text: string
  target_text: string
  phonetic: string
  audio_src: string
}

type SortField = keyof Item
type SortDirection = "asc" | "desc" | null

interface ColumnConfig {
  key: SortField
  label: string
  visible: boolean
  sortable: boolean
}

interface ItemsTableProps {
  items: Item[]
  title?: string
}

const defaultColumns: ColumnConfig[] = [
  { key: "id", label: "ID", visible: false, sortable: true },
  { key: "word_id", label: "Word ID", visible: true, sortable: true },
  { key: "mother_text", label: "Arabic", visible: true, sortable: true },
  { key: "target_text", label: "Urdu", visible: true, sortable: true },
  { key: "phonetic", label: "Phonetic", visible: false, sortable: true },
  { key: "audio_src", label: "Audio", visible: true, sortable: false },
]

export function ItemsTable({ items, title = "Vocabulary Table" }: ItemsTableProps) {
  
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [columns, setColumns] = useState<ColumnConfig[]>(defaultColumns)
  const [columnMenuOpen, setColumnMenuOpen] = useState(false)

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items

    const query = searchQuery.toLowerCase()
    return items.filter(
      (item) => item.mother_text.toLowerCase().includes(query) || item.target_text.toLowerCase().includes(query),
    )
  }, [items, searchQuery])

  const sortedItems = useMemo(() => {
    if (!sortField || !sortDirection) return filteredItems

    const sorted = [...filteredItems].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })

    return sorted
  }, [filteredItems, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortDirection(null)
        setSortField(null)
      }
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const toggleColumnVisibility = (columnKey: SortField) => {
    setColumns((prev) => prev.map((col) => (col.key === columnKey ? { ...col, visible: !col.visible } : col)))
  }

  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return "↕"
    }
    return sortDirection === "asc" ? "↑" : "↓"
  }

  const visibleColumns = columns.filter((col) => col.visible)

  return (
    <div className="w-full space-y-4">
      <div className="space-y-4">
        <div className="flex flex-col gap-4   md:items-center md:justify-between p-3">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <Card className="w-full bg-background m-3">
          <div className="flex gap-2 relative">
            <Input
              placeholder="Search Arabic or Urdu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64"
            />

            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
                onClick={() => setColumnMenuOpen(!columnMenuOpen)}
              >
                ⚙️ Columns
              </Button>

              {columnMenuOpen && (
                <div className="absolute left-2 top-full mt-1 w-56  border rounded-md shadow-lg z-50">
                  <div className="p-1 border-b">
                    <h3 className="font-semibold text-sm bg-white text-black">Show / Hide Columns</h3>
                  </div>
                  <div className="p-1 max-h-64 overflow-y-auto">
                    {columns.map((col) => (
                      <Button
                        key={col.key}
                        variant="outline"
                        onClick={() => toggleColumnVisibility(col.key)}
                        className="w-full text-left px-3 py-2 rounded hover:bg-accent/50 flex items-center gap-2 text-sm "
                      >
                        <span className="w-4 text-center">{col.visible ? "✓" : ""}</span>
                        <span>{col.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
          </div>
          </Card>
        </div>

        <p className="text-sm text-muted-foreground">
          Showing {sortedItems.length} of {items.length} vocabulary items
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.map((col) => (
                <TableHead key={col.key} className="text-nowrap">
                  {col.sortable ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort(col.key)}
                      className="h-auto gap-2 p-0 font-semibold hover:bg-transparent"
                    >
                      {col.label}
                      <span className="text-xs opacity-50">{getSortIndicator(col.key)}</span>
                    </Button>
                  ) : (
                    col.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length} className="py-8 text-center text-muted-foreground">
                  No vocabulary items found. Try adjusting your search.
                </TableCell>
              </TableRow>
            ) : (
              sortedItems.map((item) => (
                <TableRow key={item.id}>
                  {visibleColumns.map((col) => (
                    <TableCell key={`${item.id}-${col.key}`}  >
                      {col.key === "audio_src" ? (
                        <AudioPlayer src={getAudioUrl(item.audio_src)} />
                      ) : (
                        <span className="text-sm">{String(item[col.key])}</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {columnMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setColumnMenuOpen(false)} />}
    </div>
  )
}
