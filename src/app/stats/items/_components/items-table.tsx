"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AudioPlayer } from "./audio-player";
import { Card } from "@/components/ui/card";
import {
  Download,
  ChevronLeft,
  ChevronRight,
  Star,
  Filter,
  RefreshCw,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const getAudioUrl = (src: string): string => {
  return `/media/mondly/audios/${src}`;
};

interface Item {
  id: number;
  word_id: number;
  mother_text: string;
  target_text: string;
  phonetic: string;
  audio_src: string;
}

interface ItemsTableProps {
  items: Item[];
  title?: string;
}

export function ItemsTable({
  items,
  title = "Vocabulary Table",
}: ItemsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
    phonetic: false,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  // Define columns using TanStack Table
  const columns: ColumnDef<Item>[] = [
    {
      id: "favorite",
      header: () => <Star className="h-4 w-4" />,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleFavorite(row.original.id)}
          className="h-8 w-8 p-0"
        >
          <Star
            className={`h-4 w-4 ${favorites.has(row.original.id) ? "fill-yellow-400 text-yellow-400" : ""}`}
          />
        </Button>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto gap-2 p-0 font-semibold hover:bg-transparent text-white"
          >
            ID
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-3 w-3" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="h-3 w-3" />
            ) : (
              <ArrowUpDown className="h-3 w-3 opacity-50" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => <span className="text-sm">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "word_id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto gap-2 p-0 font-semibold hover:bg-transparent text-white"
          >
            Word ID
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-3 w-3" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="h-3 w-3" />
            ) : (
              <ArrowUpDown className="h-3 w-3 opacity-50" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <span className="text-sm">{row.getValue("word_id")}</span>
      ),
    },
    {
      accessorKey: "mother_text",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto gap-2 p-0 font-semibold hover:bg-transparent text-white"
          >
            Arabic
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-3 w-3" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="h-3 w-3" />
            ) : (
              <ArrowUpDown className="h-3 w-3 opacity-50" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <span className="text-sm font-medium arabic-text" dir="ltr">
          {row.getValue("mother_text")}
        </span>
      ),
    },
    {
      accessorKey: "target_text",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto gap-2 p-0 font-semibold hover:bg-transparent text-white"
          >
            Urdu
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-3 w-3" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="h-3 w-3" />
            ) : (
              <ArrowUpDown className="h-3 w-3 opacity-50" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <span className="text-sm font-medium urdu-text">
          {row.getValue("target_text")}
        </span>
      ),
    },
    {
      accessorKey: "phonetic",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto gap-2 p-0 font-semibold hover:bg-transparent text-white "
          >
            Phonetic
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-3 w-3" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="h-3 w-3" />
            ) : (
              <ArrowUpDown className="h-3 w-3 opacity-50" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground italic">
          {row.getValue("phonetic")}
        </span>
      ),
    },
    {
      accessorKey: "audio_src",
      header: "Audio",
      cell: ({ row }) => (
        <AudioPlayer src={getAudioUrl(row.getValue("audio_src"))} />
      ),
      enableSorting: false,
    },
  ];

  // Filter data based on favorites
  const filteredData = showFavoritesOnly
    ? items.filter((item) => favorites.has(item.id))
    : items;

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const searchableFields = [
        row.original.mother_text,
        row.original.target_text,
        row.original.phonetic,
      ];
      return searchableFields.some((field) =>
        field.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
  });

  const exportToCSV = () => {
    const visibleColumns = table
      .getAllColumns()
      .filter((col) => col.getIsVisible() && col.id !== "favorite");
    const headers = visibleColumns.map((col) => col.columnDef.header).join(",");

    const rows = table
      .getFilteredRowModel()
      .rows.map((row) =>
        visibleColumns
          .map((col) => {
            const value = row.getValue(col.id);
            return typeof value === "string" &&
              (value.includes(",") || value.includes('"'))
              ? `"${value.replace(/"/g, '""')}"`
              : value;
          })
          .join(",")
      )
      .join("\n");

    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vocabulary-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const resetFilters = () => {
    setGlobalFilter("");
    setSorting([]);
    setColumnFilters([]);
    setShowFavoritesOnly(false);
    table.resetColumnVisibility();
    table.setPageIndex(0);
  };

  return (
    <div className="h-full overflow-hidden flex flex-col">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:items-center md:justify-between p-3">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            {/* activities */}
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

          <Card className="w-full bg-background m-2 px-2 py-2">
            <div className="flex flex-col gap-3">
              {/* Search and Filter Row */}
              <div className="flex flex-wrap gap-2">
                <Input
                  placeholder="Search Arabic, Urdu, or Phonetic..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="flex-1 min-w-[200px]"
                />

                <Button
                  variant={showFavoritesOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className="gap-2"
                >
                  <Star
                    className={`h-4 w-4 ${showFavoritesOnly ? "fill-current" : ""}`}
                  />
                  Favorites ({favorites.size})
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Columns
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id.replace(/_/g, " ")}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>

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
                  Showing {table.getRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} items
                  {table.getFilteredRowModel().rows.length !== items.length &&
                    ` (filtered from ${items.length} total)`}
                </span>
                <Select
                  value={table.getState().pagination.pageSize.toString()}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
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

      {/* Table with Sticky Header */}
      <div className="rounded-md border">
        <div className="overflow-y-auto">
          <Table>
            <TableHeader className=" ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-nowrap text-white bg-slate-900 shadow-sm"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className=" text-white">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-muted/10 dark:text-background"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {showFavoritesOnly
                      ? "No favorite items. Click the star icon to add favorites!"
                      : "No vocabulary items found. Try adjusting your search."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <Card className="flex items-center justify-between p-1">
          <div className="flex-1 text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className={`${!table.getCanPreviousPage() ? "" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={`${!table.getCanPreviousPage() ? "" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={`${!table.getCanNextPage() ? "" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className={`${!table.getCanNextPage() ? "" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
