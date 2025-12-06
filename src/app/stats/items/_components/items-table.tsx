"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AudioPlayer } from "./audio-player"
import { Card } from "@/components/ui/card"
import { 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  PlayCircle,
  Filter,
  RefreshCw
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  
  // Favorites (stored in state, could be moved to localStorage/database)
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const filteredItems = useMemo(() => {
    let filtered = items

    // Filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter(item => favorites.has(item.id))
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) => 
          item.mother_text.toLowerCase().includes(query) || 
          item.target_text.toLowerCase().includes(query) ||
          item.phonetic.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [items, searchQuery, showFavoritesOnly, favorites])

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

  // Paginated items
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return sortedItems.slice(startIndex, endIndex)
  }, [sortedItems, currentPage, itemsPerPage])

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage)

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

  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId)
      } else {
        newFavorites.add(itemId)
      }
      return newFavorites
    })
  }

  const exportToCSV = () => {
    const headers = visibleColumns.map(col => col.label).join(',')
    const rows = sortedItems.map(item => 
      visibleColumns.map(col => {
        const value = item[col.key]
        // Escape commas and quotes in CSV
        return typeof value === 'string' && (value.includes(',') || value.includes('"')) 
          ? `"${value.replace(/"/g, '""')}"` 
          : value
      }).join(',')
    ).join('\n')
    
    const csv = `${headers}\n${rows}`
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `vocabulary-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSortField(null)
    setSortDirection(null)
    setShowFavoritesOnly(false)
    setCurrentPage(1)
  }

  const visibleColumns = columns.filter((col) => col.visible)

  return (
    <div className="w-full space-y-4">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:items-center md:justify-between p-3">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportToCSV}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
          
          <Card className="w-full bg-background m-3 px-5 py-4">
            <div className="flex flex-col gap-3">
              {/* Search and Filter Row */}
              <div className="flex flex-wrap gap-2">
                <Input
                  placeholder="Search Arabic, Urdu, or Phonetic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 min-w-[200px]"
                />

                <Button
                  variant={showFavoritesOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className="gap-2"
                >
                  <Star className={`h-4 w-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                  Favorites ({favorites.size})
                </Button>

                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => setColumnMenuOpen(!columnMenuOpen)}
                  >
                    <Filter className="h-4 w-4" />
                    Columns
                  </Button>

                  {columnMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-56 bg-white border rounded-md shadow-lg z-50">
                      <div className="p-2 border-b">
                        <h3 className="font-semibold text-sm text-black">Show / Hide Columns</h3>
                      </div>
                      <div className="p-1 max-h-64 overflow-y-auto">
                        {columns.map((col) => (
                          <Button
                            key={col.key}
                            variant="ghost"
                            onClick={() => toggleColumnVisibility(col.key)}
                            className="w-full justify-start px-3 py-2 rounded hover:bg-accent text-sm"
                          >
                            <span className="w-4 text-center">{col.visible ? "✓" : ""}</span>
                            <span className="ml-2">{col.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Showing {paginatedItems.length} of {sortedItems.length} items
                  {sortedItems.length !== items.length && ` (filtered from ${items.length} total)`}
                </span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(parseInt(value))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-[130px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 per page</SelectItem>
                    <SelectItem value="25">25 per page</SelectItem>
                    <SelectItem value="50">50 per page</SelectItem>
                    <SelectItem value="100">100 per page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-nowrap text-white bg-slate-900 w-[50px]">
                <Star className="h-4 w-4" />
              </TableHead>
              {visibleColumns.map((col) => (
                <TableHead key={col.key} className="text-nowrap text-white bg-slate-900">
                  {col.sortable ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort(col.key)}
                      className="h-auto gap-2 p-0 font-semibold hover:bg-transparent text-white"
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
            {paginatedItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 1} className="py-8 text-center text-muted-foreground">
                  {showFavoritesOnly 
                    ? "No favorite items. Click the star icon to add favorites!"
                    : "No vocabulary items found. Try adjusting your search."}
                </TableCell>
              </TableRow>
            ) : (
              paginatedItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(item.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Star 
                        className={`h-4 w-4 ${favorites.has(item.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} 
                      />
                    </Button>
                  </TableCell>
                  {visibleColumns.map((col) => (
                    <TableCell key={`${item.id}-${col.key}`} className="text-white">
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {columnMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setColumnMenuOpen(false)} />}
    </div>
  )
}