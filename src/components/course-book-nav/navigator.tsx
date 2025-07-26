"use client"

import { useState, useMemo } from "react"
import { Search, Play, Volume2, ChevronDown, ChevronRight, Book, Headphones } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import tocData from "@/data/toc-data.json"
import AudioPlayer from "./audio-player"

interface MediaFile {
  filename: string
  path: string
  type: string
  title: string
  exercise_number?: string
  vocabulary_number?: string
}

interface TocItem {
  id: string
  title: string
  page: string
  type?: string
  topics?: string[]
  lessons?: any[]
  chapters?: any[]
  sections?: string[]
  media_files: MediaFile[]
}

interface NavigationProps {
  onItemSelect?: (item: TocItem) => void
  onAudioSelect?: (audioFile: MediaFile) => void
}

export default function BookNavigation({ onItemSelect, onAudioSelect }: NavigationProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  // Filter TOC items based on search
  const filteredTocItems = useMemo(() => {
    if (!searchQuery.trim()) return tocData.toc

    const query = searchQuery.toLowerCase()
    const filterItems = (items: any[]): any[] => {
      return items.filter((item) => {
        const matchesTitle = item.title.toLowerCase().includes(query)
        const matchesTopics = item.topics?.some((topic: string) => topic.toLowerCase().includes(query))
        const hasMatchingChildren =
          item.lessons?.some((lesson: any) => lesson.title.toLowerCase().includes(query)) ||
          item.chapters?.some(
            (chapter: any) =>
              chapter.title.toLowerCase().includes(query) ||
              chapter.topics?.some((topic: string) => topic.toLowerCase().includes(query)),
          )

        return matchesTitle || matchesTopics || hasMatchingChildren
      })
    }

    return {
      ...tocData.toc,
      units: filterItems(tocData.toc.units),
      sound_and_script: tocData.toc.sound_and_script.map((part: any) => ({
        ...part,
        lessons: part.lessons ? filterItems(part.lessons) : part.lessons,
      })),
    }
  }, [searchQuery])

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const handleItemClick = (item: TocItem) => {
    onItemSelect?.(item)
  }

  const handleAudioClick = (audioFile: MediaFile) => {
    onAudioSelect?.(audioFile)
  }

  const renderMediaFiles = (mediaFiles: MediaFile[]) => {
    if (mediaFiles.length === 0) return null

    const exercises = mediaFiles.filter((f) => f.type === "exercise")
    const vocabulary = mediaFiles.filter((f) => f.type === "vocabulary")
    const general = mediaFiles.filter((f) => f.type === "general")

    return (
      <div className="ml-4 mt-2 space-y-2">
        {/* Exercises */}
        {exercises.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
              <Book className="h-3 w-3" />
              Exercises ({exercises.length})
            </div>
            <div className="grid grid-cols-1 gap-1">
              {exercises
                .sort((a, b) => {
                  const aNum = Number.parseInt(a.exercise_number || "0")
                  const bNum = Number.parseInt(b.exercise_number || "0")
                  return aNum - bNum
                })
                .map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-950/20 rounded text-xs"
                  >
                    <span className="font-medium">{file.title}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => handleAudioClick(file)}
                      title={`Play ${file.title}`}
                    >
                      {/* <Play className="h-3 w-3" /> */}
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Vocabulary */}
        {vocabulary.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
              <Volume2 className="h-3 w-3" />
              Vocabulary ({vocabulary.length})
            </div>
            <div className="grid grid-cols-1 gap-1">
              {vocabulary
                .sort((a, b) => {
                  const aNum = Number.parseInt(a.vocabulary_number || "0")
                  const bNum = Number.parseInt(b.vocabulary_number || "0")
                  return aNum - bNum
                })
                .map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded text-xs"
                  >
                    <span className="font-medium">{file.title}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => handleAudioClick(file)}
                      title={`Play ${file.title}`}
                    >
                      <Play className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* General Audio */}
        {general.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
              <Headphones className="h-3 w-3" />
              General Audio ({general.length})
            </div>
            <div className="grid grid-cols-1 gap-1">
              {general.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-950/20 rounded text-xs"
                >
                  <span className="font-medium">{file.title}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => handleAudioClick(file)}
                    title={`Play ${file.title}`}
                  >
                    <Play className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderLesson = (lesson: any) => {
    const hasAudio = lesson.media_files && lesson.media_files.length > 0

    return (
      <div key={lesson.id} className="ml-4">
        <div
          className="flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer"
          onClick={() => handleItemClick(lesson)}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{lesson.title}</span>
            {hasAudio && (
              <Badge variant="secondary" className="text-xs">
                <Headphones className="h-3 w-3 mr-1" />
                {lesson.media_files.length}
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">p. {lesson.page}</span>
        </div>
        {hasAudio && renderMediaFiles(lesson.media_files)}
      </div>
    )
  }

  const renderChapter = (chapter: any) => {
    const hasAudio = chapter.media_files && chapter.media_files.length > 0

    return (
      <div key={chapter.id} className="ml-4">
        <div
          className="flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer"
          onClick={() => handleItemClick(chapter)}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{chapter.title}</span>
            {hasAudio && (
              <Badge variant="secondary" className="text-xs">
                <Headphones className="h-3 w-3 mr-1" />
                {chapter.media_files.length}
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">p. {chapter.page}</span>
        </div>

        {chapter.topics && (
          <div className="ml-4 mt-1">
            <div className="text-xs text-muted-foreground space-y-1">
              {chapter.topics.map((topic: string, index: number) => (
                <div key={index} className="pl-2 border-l-2 border-muted">
                  {topic}
                </div>
              ))}
            </div>
          </div>
        )}

        {hasAudio && renderMediaFiles(chapter.media_files)}
      </div>
    )
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          {tocData.title}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <Input
            placeholder="Search chapters, topics, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {/* General Audio */}
            {tocData.toc.general_audio && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">GENERAL AUDIO</h3>
                {tocData.toc.general_audio.map((item: any) => (
                  <div key={item.id}>
                    <div
                      className="flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.title}</span>
                        <Badge variant="secondary" className="text-xs">
                          <Headphones className="h-3 w-3 mr-1" />
                          {item.media_files.length}
                        </Badge>
                      </div>
                    </div>
                    {renderMediaFiles(item.media_files)}
                  </div>
                ))}
              </div>
            )}

            {/* Preambles */}
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">PREAMBLES</h3>
              {filteredTocItems.preambles?.map((item: TocItem) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <span className="text-sm">{item.title}</span>
                  <span className="text-xs text-muted-foreground">p. {item.page}</span>
                </div>
              ))}
            </div>

            {/* Sound and Script */}
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">SOUND AND SCRIPT</h3>
              {filteredTocItems.sound_and_script?.map((part: any) => (
                <Collapsible key={part.id}>
                  <CollapsibleTrigger
                    className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded"
                    onClick={() => toggleSection(part.id)}
                  >
                    <div className="flex items-center gap-2">
                      {expandedSections.has(part.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">{part.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">p. {part.page}</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>{part.lessons?.map((lesson: any) => renderLesson(lesson))}</CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            {/* Units */}
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">UNITS</h3>
              {filteredTocItems.units?.map((unit: any) => (
                <Collapsible key={unit.id}>
                  <CollapsibleTrigger
                    className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded"
                    onClick={() => toggleSection(unit.id)}
                  >
                    <div className="flex items-center gap-2">
                      {expandedSections.has(unit.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">{unit.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">p. {unit.page}</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {unit.chapters?.map((chapter: any) => renderChapter(chapter))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
