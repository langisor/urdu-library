"use client"

import type React from "react"
import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  Book,
  BookOpen,
  FileText,
  Users,
  Home,
  ShoppingCart,
  Baby,
  Shield,
  Plane,
  Clock,
  FileCheck,
  Search,
  X,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import tocData from "@/data/toc.json"
import { Input } from "@/components/ui/input"
interface TableOfContentsItem {
  title: string
  page: string | number
  unit?: number
  chapter_number?: number
  sub_topics?: string[]
  chapters?: Chapter[]
  parts?: Part[]
  lessons?: Lesson[]
}

interface Chapter {
  chapter_number: number
  title: string
  sub_topics: string[]
  page: string | number
}

interface Part {
  title: string
  lessons?: Lesson[]
  page?: string | number
}

interface Lesson {
  title: string
  page: string | number
}

interface BookData {
  title: string
  authors: string[]
  publisher: string
  publication_year: number
  isbn: string
  table_of_contents: TableOfContentsItem[]
}

const getUnitIcon = (unitNumber: number) => {
  const icons = [
    Users, // Unit 1: Me and My School
    Home, // Unit 2: My Family and My Home
    Clock, // Unit 3: Daily Life
    ShoppingCart, // Unit 4: In the Market
    Baby, // Unit 5: My Childhood
    Shield, // Unit 6: Rules and Responsibilities
    Plane, // Unit 7: A Trip to South Asia
    FileCheck, // Unit 8: Past Events and Experiences
  ]
  return icons[unitNumber - 1] || Book
}

const BookNavigation: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const bookData = tocData as BookData

  // Search functionality
  const searchContent = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const results: any[] = []
    const searchTerm = query.toLowerCase()

    bookData.table_of_contents.forEach((item, index) => {
      // Search in main item title
      if (item.title.toLowerCase().includes(searchTerm)) {
        results.push({
          type: item.unit ? "unit" : "section",
          title: item.title,
          page: item.page,
          unit: item.unit,
          id: item.unit ? `unit-${item.unit}` : `item-${index}`,
          path: item.unit ? `Unit ${item.unit}` : "Section",
        })
      }

      // Search in chapters
      if (item.chapters) {
        item.chapters.forEach((chapter) => {
          if (chapter.title.toLowerCase().includes(searchTerm)) {
            results.push({
              type: "chapter",
              title: chapter.title,
              page: chapter.page,
              chapter_number: chapter.chapter_number,
              id: `unit-${item.unit}-chapter-${chapter.chapter_number}`,
              path: `Unit ${item.unit}: ${item.title} > Chapter ${chapter.chapter_number}`,
            })
          }

          // Search in sub-topics
          if (chapter.sub_topics) {
            chapter.sub_topics.forEach((topic) => {
              if (topic.toLowerCase().includes(searchTerm)) {
                results.push({
                  type: "sub-topic",
                  title: topic,
                  page: chapter.page,
                  id: `unit-${item.unit}-chapter-${chapter.chapter_number}-topic`,
                  path: `Unit ${item.unit}: ${item.title} > Chapter ${chapter.chapter_number}: ${chapter.title}`,
                })
              }
            })
          }
        })
      }

      // Search in parts and lessons
      if (item.parts) {
        item.parts.forEach((part, partIndex) => {
          if (part.title.toLowerCase().includes(searchTerm)) {
            results.push({
              type: "part",
              title: part.title,
              page: part.page,
              id: `item-${index}-part-${partIndex}`,
              path: `${item.title} > Part`,
            })
          }

          if (part.lessons) {
            part.lessons.forEach((lesson, lessonIndex) => {
              if (lesson.title.toLowerCase().includes(searchTerm)) {
                results.push({
                  type: "lesson",
                  title: lesson.title,
                  page: lesson.page,
                  id: `item-${index}-part-${partIndex}-lesson-${lessonIndex}`,
                  path: `${item.title} > ${part.title}`,
                })
              }
            })
          }
        })
      }
    })

    setSearchResults(results)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setIsSearching(false)
  }

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  const getSearchResultIcon = (type: string) => {
    switch (type) {
      case "unit":
        return Users
      case "chapter":
        return BookOpen
      case "lesson":
        return FileText
      case "part":
        return Book
      case "sub-topic":
        return ChevronRight
      default:
        return FileText
    }
  }

  const renderSearchResults = () => {
    if (!isSearching) return null

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm text-muted-foreground">Search Results ({searchResults.length})</h3>
          {searchResults.length === 0 && <span className="text-sm text-muted-foreground">No results found</span>}
        </div>

        {searchResults.map((result, index) => {
          const IconComponent = getSearchResultIcon(result.type)
          const isSelected = selectedItem === result.id

          return (
            <div key={index} className="border border-border/50 rounded-lg p-3 hover:bg-muted/30 transition-colors">
              <Button
                variant="ghost"
                size="sm"
                className={`w-full justify-start text-left h-auto p-0 ${isSelected ? "text-primary" : ""}`}
                onClick={() => {
                  handleItemClick(result.id, result.page)
                  // Auto-expand parent items for better UX
                  if (result.type === "chapter" || result.type === "sub-topic") {
                    setExpandedItems((prev) => new Set([...prev, `unit-${result.unit || result.id.split("-")[1]}`]))
                  }
                  if (result.type === "lesson") {
                    const parts = result.id.split("-")
                    setExpandedItems((prev) => new Set([...prev, parts.slice(0, -1).join("-")]))
                  }
                }}
              >
                <div className="space-y-2 w-full">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{highlightText(result.title, searchQuery)}</div>
                      <div className="text-xs text-muted-foreground mt-1 truncate">{result.path}</div>
                    </div>
                    <Badge variant="outline" className="text-xs flex-shrink-0">
                      {result.page}
                    </Badge>
                  </div>
                  {result.type === "chapter" && (
                    <Badge variant="secondary" className="text-xs w-fit">
                      Chapter {result.chapter_number}
                    </Badge>
                  )}
                </div>
              </Button>
            </div>
          )
        })}
      </div>
    )
  }

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const handleItemClick = (itemId: string, page: string | number) => {
    setSelectedItem(itemId)
    // Here you would typically navigate to the page or scroll to content
    console.log(`Navigate to page: ${page}`)
  }

  const renderLesson = (lesson: Lesson, parentId: string, index: number) => {
    const itemId = `${parentId}-lesson-${index}`
    const isSelected = selectedItem === itemId

    return (
      <div key={itemId} className="ml-8">
        <Button
          variant="ghost"
          size="sm"
          className={`w-full justify-start text-left h-auto py-2 px-3 ${
            isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted/50"
          }`}
          onClick={() => handleItemClick(itemId, lesson.page)}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
              <span className="text-sm">{lesson.title}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {lesson.page}
            </Badge>
          </div>
        </Button>
      </div>
    )
  }

  const renderPart = (part: Part, parentId: string, index: number) => {
    const itemId = `${parentId}-part-${index}`
    const isExpanded = expandedItems.has(itemId)
    const hasLessons = part.lessons && part.lessons.length > 0

    return (
      <div key={itemId} className="ml-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-left h-auto py-2 px-3 hover:bg-muted/50"
          onClick={() => hasLessons && toggleExpanded(itemId)}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {hasLessons && (isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">{part.title}</span>
            </div>
            {part.page && (
              <Badge variant="outline" className="text-xs">
                {part.page}
              </Badge>
            )}
          </div>
        </Button>

        {hasLessons && isExpanded && (
          <div className="mt-1 space-y-1">
            {part.lessons!.map((lesson, lessonIndex) => renderLesson(lesson, itemId, lessonIndex))}
          </div>
        )}
      </div>
    )
  }

  const renderChapter = (chapter: Chapter, parentId: string) => {
    const itemId = `${parentId}-chapter-${chapter.chapter_number}`
    const isExpanded = expandedItems.has(itemId)
    const isSelected = selectedItem === itemId
    const hasSubTopics = chapter.sub_topics && chapter.sub_topics.length > 0

    return (
      <div key={itemId} className="ml-4">
        <Button
          variant="ghost"
          size="sm"
          className={`w-full justify-start text-left h-auto py-3 px-3 ${
            isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted/50"
          }`}
          onClick={() => {
            handleItemClick(itemId, chapter.page)
            if (hasSubTopics) toggleExpanded(itemId)
          }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              {hasSubTopics &&
                (isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs px-2">
                  {chapter.chapter_number}
                </Badge>
                <span className="font-medium">{chapter.title}</span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {chapter.page}
            </Badge>
          </div>
        </Button>

        {hasSubTopics && isExpanded && (
          <div className="mt-2 ml-8 space-y-1">
            {chapter.sub_topics.map((topic, index) => (
              <div key={index} className="flex items-center gap-2 py-1 px-3 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                {topic}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderUnit = (unit: TableOfContentsItem) => {
    const itemId = `unit-${unit.unit}`
    const isExpanded = expandedItems.has(itemId)
    const IconComponent = getUnitIcon(unit.unit!)

    return (
      <div key={itemId} className="mb-4">
        <Button
          variant="ghost"
          size="lg"
          className="w-full justify-start text-left h-auto py-4 px-4 hover:bg-muted/50 border border-border/50 rounded-lg"
          onClick={() => toggleExpanded(itemId)}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              <IconComponent className="h-5 w-5 text-primary" />
              <div>
                <div className="flex items-center gap-2">
                  <Badge className="text-xs">Unit {unit.unit}</Badge>
                  <span className="font-semibold">{unit.title}</span>
                </div>
              </div>
            </div>
          </div>
        </Button>

        {isExpanded && unit.chapters && (
          <div className="mt-3 space-y-2">{unit.chapters.map((chapter) => renderChapter(chapter, itemId))}</div>
        )}
      </div>
    )
  }

  const renderRegularItem = (item: TableOfContentsItem, index: number) => {
    const itemId = `item-${index}`
    const isExpanded = expandedItems.has(itemId)
    const isSelected = selectedItem === itemId
    const hasParts = item.parts && item.parts.length > 0

    return (
      <div key={itemId} className="mb-2">
        <Button
          variant="ghost"
          size="sm"
          className={`w-full justify-start text-left h-auto py-3 px-3 ${
            isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted/50"
          }`}
          onClick={() => {
            handleItemClick(itemId, item.page)
            if (hasParts) toggleExpanded(itemId)
          }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {hasParts && (isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{item.title}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {item.page}
            </Badge>
          </div>
        </Button>

        {hasParts && isExpanded && (
          <div className="mt-2 space-y-1">
            {item.parts!.map((part, partIndex) => renderPart(part, itemId, partIndex))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Book className="h-8 w-8 text-primary mt-1" />
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{bookData.title}</CardTitle>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                <strong>Authors:</strong> {bookData.authors.join(", ")}
              </p>
              <p>
                <strong>Publisher:</strong> {bookData.publisher} ({bookData.publication_year})
              </p>
              <p>
                <strong>ISBN:</strong> {bookData.isbn}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <div className="px-6 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search chapters, topics, lessons..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              searchContent(e.target.value)
            }}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <Separator />

      <CardContent className="p-0">
        <ScrollArea className="h-[600px] p-4">
          {isSearching ? (
            renderSearchResults()
          ) : (
            <div className="space-y-3">
              {bookData.table_of_contents.map((item, index) => {
                if (item.unit) {
                  return renderUnit(item)
                } else {
                  return renderRegularItem(item, index)
                }
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default BookNavigation
