"use client"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Play, Trash2, ArrowRight, Clock, Calendar, SortAsc, AlertCircle, Loader2 } from "lucide-react"
import { useFavorites } from "@/hooks/use-favorites"
import type { FavoritesComponentProps, FavoriteItem, FavoritesSortOption, FileTypeColor } from "@/types/favorites"
import type { JSX } from "react/jsx-runtime"

export function FavoritesComponent({ onPlayAudio, onNavigate }: FavoritesComponentProps): JSX.Element {
  const { items, isLoading, error, removeFromFavorites, clearAllFavorites, updateLastPlayed, getFavoritesSortedBy } =
    useFavorites()

  const [sortBy, setSortBy] = useState<FavoritesSortOption>("recent")

  const sortedFavorites = getFavoritesSortedBy(sortBy)

  const getFileTypeColor = useCallback((type: string): FileTypeColor => {
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
  }, [])

  const formatDate = useCallback((timestamp: number): string => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`
    } else if (diffInHours < 48) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }, [])

  const handlePlayAudio = useCallback(
    (item: FavoriteItem): void => {
      updateLastPlayed(item.id)
      onPlayAudio(item.file, item.path, item.context)
    },
    [updateLastPlayed, onPlayAudio],
  )

  const handleNavigateToSource = useCallback(
    (item: FavoriteItem): void => {
      if (item.context.includes("Sound & Script")) {
        const lessonMatch = item.context.match(/Lesson (\d+)/)
        if (lessonMatch) {
          onNavigate({ type: "sound-script-lesson", lessonId: lessonMatch[1] })
        } else {
          onNavigate({ type: "sound-script" })
        }
      } else if (item.context.includes("Unit")) {
        const unitMatch = item.context.match(/Unit (\d+)/)
        const chapterMatch = item.context.match(/Chapter (\d+)/)
        if (unitMatch && chapterMatch) {
          onNavigate({ type: "chapter", unitId: unitMatch[1], chapterId: chapterMatch[1] })
        } else if (unitMatch) {
          onNavigate({ type: "unit", unitId: unitMatch[1] })
        } else {
          onNavigate({ type: "units" })
        }
      } else {
        onNavigate({ type: "home" })
      }
    },
    [onNavigate],
  )

  const handleSortChange = useCallback((value: string): void => {
    setSortBy(value as FavoritesSortOption)
  }, [])

  const handleClearAll = useCallback((): void => {
    if (window.confirm("Are you sure you want to remove all favorites? This action cannot be undone.")) {
      clearAllFavorites()
    }
  }, [clearAllFavorites])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading favorites...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            Favorites
          </h1>
          <p className="text-muted-foreground mt-1">
            {items.length} {items.length === 1 ? "favorite" : "favorites"}
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-40">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
                <SelectItem value="type">By Type</SelectItem>
                <SelectItem value="context">By Source</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="text-destructive hover:text-destructive bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Empty State */}
      {items.length === 0 && !error && (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">
              Start adding audio files to your favorites by clicking the heart icon when browsing content.
            </p>
            <Button onClick={() => onNavigate({ type: "home" })}>Browse Audio Files</Button>
          </CardContent>
        </Card>
      )}

      {/* Favorites List */}
      {sortedFavorites.length > 0 && (
        <ScrollArea className="h-[600px]">
          <div className="space-y-3">
            {sortedFavorites.map((item: FavoriteItem) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold truncate">{item.file.title}</h3>
                        <Badge variant={getFileTypeColor(item.file.type)} className="text-xs">
                          {item.file.type}
                        </Badge>
                        {item.file.exercise_number && (
                          <Badge variant="outline" className="text-xs">
                            Ex. {item.file.exercise_number}
                          </Badge>
                        )}
                        {item.file.vocabulary_number && (
                          <Badge variant="outline" className="text-xs">
                            Vocab {item.file.vocabulary_number}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <span>{item.context}</span>
                        <Separator orientation="vertical" className="h-4" />
                        <Calendar className="h-3 w-3" />
                        <span>Added {formatDate(item.addedAt)}</span>
                        {item.lastPlayedAt && (
                          <>
                            <Separator orientation="vertical" className="h-4" />
                            <Clock className="h-3 w-3" />
                            <span>Played {formatDate(item.lastPlayedAt)}</span>
                          </>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground truncate">{item.file.filename}</p>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleNavigateToSource(item)}
                        title="Go to source"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromFavorites(item.id)}
                        title="Remove from favorites"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => handlePlayAudio(item)} title="Play now">
                        <Play className="h-4 w-4 mr-2" />
                        Play
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Statistics */}
      {items.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">By Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(["exercise", "vocabulary", "general"] as const).map((type) => {
                  const count = items.filter((item) => item.file.type === type).length
                  if (count === 0) return null

                  return (
                    <div key={type} className="flex justify-between text-sm">
                      <span className="capitalize">{type}</span>
                      <Badge variant={getFileTypeColor(type)}>{count}</Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recently Added</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {items
                  .sort((a, b) => b.addedAt - a.addedAt)
                  .slice(0, 3)
                  .map((item) => (
                    <div key={item.id} className="text-sm">
                      <div className="font-medium truncate">{item.file.title}</div>
                      <div className="text-muted-foreground text-xs">{formatDate(item.addedAt)}</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recently Played</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {items
                  .filter((item) => item.lastPlayedAt)
                  .sort((a, b) => (b.lastPlayedAt || 0) - (a.lastPlayedAt || 0))
                  .slice(0, 3)
                  .map((item) => (
                    <div key={item.id} className="text-sm">
                      <div className="font-medium truncate">{item.file.title}</div>
                      <div className="text-muted-foreground text-xs">
                        {item.lastPlayedAt && formatDate(item.lastPlayedAt)}
                      </div>
                    </div>
                  ))}
                {items.filter((item) => item.lastPlayedAt).length === 0 && (
                  <div className="text-sm text-muted-foreground">No recently played favorites</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
