"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowLeft, BookOpen, Layers, SearchIcon } from "lucide-react"
import { AudioPlayer } from "./audio-player"
import { SearchComponent } from "./search"
import audioData from "@/data/auto-generated/audio-files.json"
import { AudioBookData } from "./audio-data"
import { FileType, SearchFilters, SearchResult, SearchComponentProps } from "./audio-data"

// Type assertion for the imported JSON data
const typedAudioData = audioData as AudioBookData

export default function AudioBookNavigator() {
  const [viewState, setViewState] = useState<{ type: "home" | "search", query?: string }>({ type: "home" })
  const [currentAudio, setCurrentAudio] = useState<{ file: FileType, path: string, context: string } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [queue, setQueue] = useState({
    items: [],
    currentIndex: 0,
    isShuffled: false,
    repeatMode: "none",
  })

  const playAudio = (file: FileType, path: string, context: string) => {
    const queueItem = {
      id: `${Date.now()}-${Math.random()}`,
      file,
      path,
      context,
    }

    setCurrentAudio({ file, path, context })

    // Add to queue if not already there
    const existingIndex = queue.items.findIndex((item) => item.file.filename === file.filename && item.path === path)

    if (existingIndex === -1) {
      const newQueue = {
        ...queue,
        items: [...queue.items, queueItem],
        currentIndex: queue.items.length,
      }
      setQueue(newQueue)
    } else {
      setQueue({
        ...queue,
        currentIndex: existingIndex,
      })
    }
  }

  const addToQueue = (file, path, context) => {
    const queueItem = {
      id: `${Date.now()}-${Math.random()}`,
      file,
      path,
      context,
    }

    const existingIndex = queue.items.findIndex((item) => item.file.filename === file.filename && item.path === path)

    if (existingIndex === -1) {
      setQueue({
        ...queue,
        items: [...queue.items, queueItem],
      })
    }
  }

  const playFromQueue = (index) => {
    if (index >= 0 && index < queue.items.length) {
      const item = queue.items[index]
      setCurrentAudio({
        file: item.file,
        path: item.path,
        context: item.context,
      })
      setQueue({
        ...queue,
        currentIndex: index,
      })
    }
  }

  const closeAudioPlayer = () => {
    setCurrentAudio(null)
    setQueue({
      items: [],
      currentIndex: 0,
      isShuffled: false,
      repeatMode: "none",
    })
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim()) {
      setViewState({ type: "search", query: query.trim() })
    } else {
      setViewState({ type: "home" })
    }
  }

  const getFileTypeColor = (type) => {
    switch (type) {
      case "exercise":
        return "default"
      case "vocabulary":
        return "secondary"
      case "general":
        return "outline"
      default:
        return "outline"
    }
  }

  const renderHome = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Audio Book Navigator</h1>
        <p className="text-lg text-muted-foreground">Navigate through your Urdu learning materials</p>
        <div className="text-sm text-muted-foreground">
          Generated from: {typedAudioData.metadata.generated_from} • {typedAudioData.statistics.total_audio_files} total
          files
        </div>
      </div>

      {/* Quick Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Quick search audio files..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setViewState({ type: "sound-script" })}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Sound and Script
            </CardTitle>
            <CardDescription>
              {typedAudioData.statistics.total_sound_script_lessons} lessons with pronunciation exercises
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Lessons 1-{typedAudioData.statistics.total_sound_script_lessons}</span>
              <Badge variant="secondary">
                {Object.values(typedAudioData.structure.sound_and_script.lessons).reduce(
                  (acc, lesson) => acc + lesson.files.length,
                  0,
                )}{" "}
                files
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setViewState({ type: "units" })}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-6 w-6" />
              Units
            </CardTitle>
            <CardDescription>{typedAudioData.statistics.total_units} units with structured chapters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{typedAudioData.statistics.total_chapters_with_audio} chapters</span>
              <Badge variant="secondary">
                {typedAudioData.statistics.total_exercise_files + typedAudioData.statistics.total_vocabulary_files}{" "}
                files
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {typedAudioData.structure.root_files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>General Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {typedAudioData.structure.root_files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span>{file.description}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        addToQueue(
                          { filename: file.filename, type: file.type, title: file.description },
                          file.path,
                          "General",
                        )
                      }
                    >
                      Add to Queue
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        playAudio(
                          { filename: file.filename, type: file.type, title: file.description },
                          file.path,
                          "General",
                        )
                      }
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Play
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Access Statistics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Audio Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {typedAudioData.quick_access.units_with_most_audio.slice(0, 3).map((unit, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>Unit {unit.unit}</span>
                  <Badge variant="outline">{unit.total_files} files</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Exercises</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {typedAudioData.quick_access.chapters_with_most_exercises.slice(0, 3).map((chapter, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    Unit {chapter.unit}, Ch {chapter.chapter}
                  </span>
                  <Badge variant="outline">{chapter.exercise_count} exercises</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Vocabulary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {typedAudioData.quick_access.chapters_with_most_vocabulary.slice(0, 3).map((chapter, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    Unit {chapter.unit}, Ch {chapter.chapter}
                  </span>
                  <Badge variant="outline">{chapter.vocabulary_count} vocab</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSoundScript = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setViewState({ type: "home" })}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        <h1 className="text-3xl font-bold">Sound and Script Lessons</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(typedAudioData.structure.sound_and_script.lessons).map(([lessonId, lesson]) => (
          <Card
            key={lessonId}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setViewState({ type: "sound-script-lesson", lessonId })}
          >
            <CardHeader>
              <CardTitle>Lesson {lessonId}</CardTitle>
              <CardDescription>{lesson.files.length} exercises</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">{lesson.folder_name}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderSoundScriptLesson = (lessonId) => {
    const lesson = typedAudioData.structure.sound_and_script.lessons[lessonId]
    if (!lesson) return null

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewState({ type: "sound-script" })}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Lessons
          </Button>
          <h1 className="text-3xl font-bold">Lesson {lessonId}</h1>
        </div>

        <div className="grid gap-4">
          {lesson.files.map((file, index) => (
            <Card key={index}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-semibold">{file.title}</h3>
                  <p className="text-sm text-muted-foreground">{file.filename}</p>
                  <Badge variant={getFileTypeColor(file.type)} className="mt-1">
                    {file.type}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => addToQueue(file, `${lesson.path}/${file.filename}`, `Lesson ${lessonId}`)}
                  >
                    Add to Queue
                  </Button>
                  <Button onClick={() => playAudio(file, `${lesson.path}/${file.filename}`, `Lesson ${lessonId}`)}>
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const renderUnits = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setViewState({ type: "home" })}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        <h1 className="text-3xl font-bold">Units</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(typedAudioData.structure.units).map(([unitId, unit]) => {
          const chapterCount = Object.keys(unit.chapters).length
          const fileCount = Object.values(unit.chapters).reduce((acc, chapter) => acc + chapter.files.length, 0)

          return (
            <Card
              key={unitId}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setViewState({ type: "unit", unitId })}
            >
              <CardHeader>
                <CardTitle>Unit {unitId}</CardTitle>
                <CardDescription>
                  {chapterCount} chapters • {fileCount} files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">{unit.folder_name}</Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderUnit = (unitId) => {
    const unit = typedAudioData.structure.units[unitId]
    if (!unit) return null

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewState({ type: "units" })}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Units
          </Button>
          <h1 className="text-3xl font-bold">Unit {unitId}</h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(unit.chapters).map(([chapterId, chapter]) => (
            <Card
              key={chapterId}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setViewState({ type: "chapter", unitId, chapterId })}
            >
              <CardHeader>
                <CardTitle>Chapter {chapterId}</CardTitle>
                <CardDescription>{chapter.files.length} files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {chapter.files.some((f) => f.type === "exercise") && <Badge variant="default">Exercises</Badge>}
                  {chapter.files.some((f) => f.type === "vocabulary") && <Badge variant="secondary">Vocabulary</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const renderChapter = (unitId, chapterId) => {
    const chapter = typedAudioData.structure.units[unitId]?.chapters[chapterId]
    if (!chapter) return null

    const exercises = chapter.files.filter((f) => f.type === "exercise")
    const vocabulary = chapter.files.filter((f) => f.type === "vocabulary")

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewState({ type: "unit", unitId })}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Unit {unitId}
          </Button>
          <h1 className="text-3xl font-bold">Chapter {chapterId}</h1>
        </div>

        {exercises.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Exercises ({exercises.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {exercises.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <span className="font-medium">{file.title}</span>
                    <p className="text-sm text-muted-foreground">{file.filename}</p>
                    {file.exercise_number && (
                      <Badge variant="outline" className="mt-1">
                        Exercise {file.exercise_number}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        addToQueue(file, `${chapter.path}/${file.filename}`, `Unit ${unitId}, Chapter ${chapterId}`)
                      }
                    >
                      Add to Queue
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        playAudio(file, `${chapter.path}/${file.filename}`, `Unit ${unitId}, Chapter ${chapterId}`)
                      }
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {vocabulary.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Vocabulary ({vocabulary.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {vocabulary.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <span className="font-medium">{file.title}</span>
                    <p className="text-sm text-muted-foreground">{file.filename}</p>
                    {file.vocabulary_number && (
                      <Badge variant="secondary" className="mt-1">
                        Vocabulary {file.vocabulary_number}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        addToQueue(file, `${chapter.path}/${file.filename}`, `Unit ${unitId}, Chapter ${chapterId}`)
                      }
                    >
                      Add to Queue
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        playAudio(file, `${chapter.path}/${file.filename}`, `Unit ${unitId}, Chapter ${chapterId}`)
                      }
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  const renderSearch = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setViewState({ type: "home" })}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        <h1 className="text-3xl font-bold">Search</h1>
      </div>

      <SearchComponent
        audioData={typedAudioData}
        onPlayAudio={playAudio}
        onAddToQueue={addToQueue}
        onNavigate={setViewState}
      />
    </div>
  )

  const renderCurrentView = () => {
    switch (viewState.type) {
      case "home":
        return renderHome()
      case "sound-script":
        return renderSoundScript()
      case "sound-script-lesson":
        return renderSoundScriptLesson(viewState.lessonId)
      case "units":
        return renderUnits()
      case "unit":
        return renderUnit(viewState.unitId)
      case "chapter":
        return renderChapter(viewState.unitId, viewState.chapterId)
      case "search":
        return renderSearch()
      default:
        return renderHome()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 pb-32">{renderCurrentView()}</div>

      {/* Audio Player Component */}
      <AudioPlayer
        currentAudio={currentAudio}
        queue={queue}
        onClose={closeAudioPlayer}
        onHomeClick={() => setViewState({ type: "home" })}
        onQueueUpdate={setQueue}
        onPlayFromQueue={playFromQueue}
      />
    </div>
  )
}
