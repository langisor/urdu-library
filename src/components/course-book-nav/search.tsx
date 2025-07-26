"use client";

import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SearchIcon,
  Play,
  Filter,
  X,
  ArrowRight,
  BookOpen,
  Layers,
  FileAudio,
} from "lucide-react";
import type {
  SearchComponentProps,
  SearchResult,
  SearchFilters,
  SearchState,
  FileTypeColor,
  MatchType,
  ChangeEventHandler,
  SelectChangeHandler,
  ClickEventHandler,
} from "@/types/audio-data";
import type { JSX } from "react/jsx-runtime"; // Import JSX to fix the undeclared variable error
import { AudioFile, RootFile } from "@/types/audio-data";
import audioData from "@/data/auto-generated/audio-files.json";

export function SearchComponent({
  onPlayAudio,
  onNavigate,
}: SearchComponentProps): React.ReactNode {
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    filters: {
      type: "all",
      source: "all",
    },
    showFilters: false,
  });

  const updateSearchState = useCallback(
    (updates: Partial<SearchState>): void => {
      setSearchState((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  // Create searchable index from audio data
  const searchIndex = useMemo((): SearchResult[] => {
    const results: SearchResult[] = [];

    // Index root files
    audioData.structure.root_files.forEach((file: RootFile): void => {
      results.push({
        id: `root-${file.filename}`,
        file: {
          filename: file.filename,
          type: file.type as "exercise" | "vocabulary" | "general",
          title: file.description,
        },
        path: file.path,
        context: "General",
        matchType: "title",
        matchText: file.description,
        relevanceScore: 0,
      });
    });

    // Index Sound and Script lessons
    Object.entries(audioData.structure.sound_and_script.lessons).forEach(
      ([lessonId, lesson]): void => {
        lesson.files.forEach((file: AudioFile): void => {
          results.push({
            id: `ssl-${lessonId}-${file.filename}`,
            file,
            path: `${lesson.path}/${file.filename}`,
            context: `Sound & Script - Lesson ${lessonId}`,
            matchType: "title",
            matchText: file.title,
            relevanceScore: 0,
          });
        });
      }
    );

    // Index Units
    Object.entries(audioData.structure.units).forEach(
      ([unitId, unit]): void => {
        Object.entries(unit.chapters).forEach(([chapterId, chapter]): void => {
          chapter.files.forEach((file: AudioFile): void => {
            results.push({
              id: `unit-${unitId}-${chapterId}-${file.filename}`,
              file,
              path: `${chapter.path}/${file.filename}`,
              context: `Unit ${unitId} - Chapter ${chapterId}`,
              matchType: "title",
              matchText: file.title,
              relevanceScore: 0,
            });
          });
        });
      }
    );

    return results;
  }, [audioData]);

  // Search function with relevance scoring
  const searchResults = useMemo((): SearchResult[] => {
    if (!searchState.query.trim()) return [];

    const searchTerm: string = searchState.query.toLowerCase().trim();
    const results: SearchResult[] = [];

    searchIndex.forEach((item): void => {
      let relevanceScore = 0;
      let matchType: MatchType = "title";
      let matchText = "";

      // Check title match
      if (item.file.title.toLowerCase().includes(searchTerm)) {
        relevanceScore +=
          item.file.title.toLowerCase() === searchTerm ? 100 : 80;
        matchType = "title";
        matchText = item.file.title;
      }

      // Check filename match
      if (item.file.filename.toLowerCase().includes(searchTerm)) {
        relevanceScore +=
          item.file.filename.toLowerCase() === searchTerm ? 90 : 60;
        if (relevanceScore < 60) {
          matchType = "filename";
          matchText = item.file.filename;
        }
      }

      // Check context match
      if (item.context.toLowerCase().includes(searchTerm)) {
        relevanceScore += 40;
        if (relevanceScore < 40) {
          matchType = "context";
          matchText = item.context;
        }
      }

      // Check exercise number match
      if (
        item.file.exercise_number &&
        item.file.exercise_number.toLowerCase().includes(searchTerm)
      ) {
        relevanceScore += 70;
        matchType = "exercise_number";
        matchText = `Exercise ${item.file.exercise_number}`;
      }

      // Check vocabulary number match
      if (
        item.file.vocabulary_number &&
        item.file.vocabulary_number.toLowerCase().includes(searchTerm)
      ) {
        relevanceScore += 70;
        matchType = "vocabulary_number";
        matchText = `Vocabulary ${item.file.vocabulary_number}`;
      }

      // Apply filters
      if (relevanceScore > 0) {
        // Type filter
        if (
          searchState.filters.type !== "all" &&
          item.file.type !== searchState.filters.type
        ) {
          return;
        }

        // Source filter
        if (searchState.filters.source !== "all") {
          if (
            searchState.filters.source === "sound-script" &&
            !item.context.includes("Sound & Script")
          ) {
            return;
          }
          if (
            searchState.filters.source === "units" &&
            !item.context.includes("Unit")
          ) {
            return;
          }
        }

        // Unit filter
        if (
          searchState.filters.unit &&
          !item.context.includes(`Unit ${searchState.filters.unit}`)
        ) {
          return;
        }

        results.push({
          ...item,
          matchType,
          matchText,
          relevanceScore,
        });
      }
    });

    // Sort by relevance score (highest first)
    return results.sort(
      (a: SearchResult, b: SearchResult): number =>
        b.relevanceScore - a.relevanceScore
    );
  }, [searchState.query, searchState.filters, searchIndex]);

  const getFileTypeColor = useCallback((type: string): FileTypeColor => {
    switch (type) {
      case "exercise":
        return "default";
      case "vocabulary":
        return "secondary";
      case "general":
        return "outline";
      default:
        return "outline";
    }
  }, []);

  const getMatchTypeIcon = useCallback((matchType: MatchType): JSX.Element => {
    switch (matchType) {
      case "title":
        return <FileAudio className="h-3 w-3" />;
      case "filename":
        return <FileAudio className="h-3 w-3" />;
      case "context":
        return <ArrowRight className="h-3 w-3" />;
      case "exercise_number":
        return <BookOpen className="h-3 w-3" />;
      case "vocabulary_number":
        return <Layers className="h-3 w-3" />;
      default:
        return <FileAudio className="h-3 w-3" />;
    }
  }, []);

  const clearSearch = useCallback((): void => {
    updateSearchState({
      query: "",
      filters: {
        type: "all",
        source: "all",
      },
    });
  }, [updateSearchState]);

  const navigateToSource = useCallback(
    (result: SearchResult): void => {
      if (result.context.includes("Sound & Script")) {
        const lessonMatch: RegExpMatchArray | null =
          result.context.match(/Lesson (\d+)/);
        if (lessonMatch) {
          onNavigate({ type: "sound-script-lesson", lessonId: lessonMatch[1] });
        } else {
          onNavigate({ type: "sound-script" });
        }
      } else if (result.context.includes("Unit")) {
        const unitMatch: RegExpMatchArray | null =
          result.context.match(/Unit (\d+)/);
        const chapterMatch: RegExpMatchArray | null =
          result.context.match(/Chapter (\d+)/);
        if (unitMatch && chapterMatch) {
          onNavigate({
            type: "chapter",
            unitId: unitMatch[1],
            chapterId: chapterMatch[1],
          });
        } else if (unitMatch) {
          onNavigate({ type: "unit", unitId: unitMatch[1] });
        } else {
          onNavigate({ type: "units" });
        }
      } else {
        onNavigate({ type: "home" });
      }
    },
    [onNavigate]
  );

  const handleQueryChange: ChangeEventHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      updateSearchState({ query: e.target.value });
    },
    [updateSearchState]
  );

  const handleTypeFilterChange: SelectChangeHandler = useCallback(
    (value: string): void => {
      updateSearchState({
        filters: {
          ...searchState.filters,
          type: value as SearchFilters["type"],
        },
      });
    },
    [searchState.filters, updateSearchState]
  );

  const handleSourceFilterChange: SelectChangeHandler = useCallback(
    (value: string): void => {
      updateSearchState({
        filters: {
          ...searchState.filters,
          source: value as SearchFilters["source"],
        },
      });
    },
    [searchState.filters, updateSearchState]
  );

  const handleUnitFilterChange: SelectChangeHandler = useCallback(
    (value: string): void => {
      updateSearchState({
        filters: {
          ...searchState.filters,
          unit: value === "all" ? undefined : value,
        },
      });
    },
    [searchState.filters, updateSearchState]
  );

  const toggleFilters: ClickEventHandler = useCallback((): void => {
    updateSearchState({ showFilters: !searchState.showFilters });
  }, [searchState.showFilters, updateSearchState]);

  const getMatchTypeLabel = useCallback((matchType: MatchType): string => {
    switch (matchType) {
      case "title":
        return "Title match";
      case "filename":
        return "Filename match";
      case "context":
        return "Context match";
      case "exercise_number":
        return "Exercise number match";
      case "vocabulary_number":
        return "Vocabulary number match";
      default:
        return "Match";
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search audio files, lessons, exercises, vocabulary..."
              value={searchState.query}
              onChange={handleQueryChange}
              className="pl-10 pr-10"
            />
            {searchState.query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Button variant="outline" onClick={toggleFilters}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filters */}
        {searchState.showFilters && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Search Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    File Type
                  </label>
                  <Select
                    value={searchState.filters.type}
                    onValueChange={handleTypeFilterChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="exercise">Exercises</SelectItem>
                      <SelectItem value="vocabulary">Vocabulary</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Source
                  </label>
                  <Select
                    value={searchState.filters.source}
                    onValueChange={handleSourceFilterChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="sound-script">
                        Sound & Script
                      </SelectItem>
                      <SelectItem value="units">Units</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Unit</label>
                  <Select
                    value={searchState.filters.unit || "all"}
                    onValueChange={handleUnitFilterChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Units</SelectItem>
                      {Object.keys(audioData.structure.units).map(
                        (unitId: string) => (
                          <SelectItem key={unitId} value={unitId}>
                            Unit {unitId}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" onClick={clearSearch}>
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Search Results */}
      {searchState.query && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Search Results ({searchResults.length})
              {searchState.query && (
                <span className="text-muted-foreground ml-2">
                  for "{searchState.query}"
                </span>
              )}
            </h2>
          </div>

          {searchResults.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-3">
                {searchResults.map((result: SearchResult) => (
                  <Card
                    key={result.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold truncate">
                              {result.matchText}
                              {result.matchType === "title" && (
                                <span className="text-xs text-muted-foreground">
                                  (Title)
                                </span>
                              )}
                              {result.matchType === "filename" && (
                                <span className="text-xs text-muted-foreground">
                                  (Filename)
                                </span>
                              )}
                              {result.matchType === "context" && (
                                <span className="text-xs text-muted-foreground">
                                  (Context)
                                </span>
                              )}
                              {result.matchType === "exercise_number" && (
                                <span className="text-xs text-muted-foreground">
                                  (Exercise Number)
                                </span>
                              )}
                              {result.matchType === "vocabulary_number" && (
                                <span className="text-xs text-muted-foreground">
                                  (Vocabulary Number)
                                </span>
                              )}
                            </h3>
                            <Badge
                              variant={getFileTypeColor(result.file.type)}
                              className="text-xs"
                            >
                              {result.file.type}
                            </Badge>
                            {result.file.exercise_number && (
                              <Badge variant="outline" className="text-xs">
                                Ex. {result.file.exercise_number}
                              </Badge>
                            )}
                            {result.file.vocabulary_number && (
                              <Badge variant="outline" className="text-xs">
                                Vocab {result.file.vocabulary_number}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            {getMatchTypeIcon(result.matchType)}
                            <span>{getMatchTypeLabel(result.matchType)}</span>
                            <Separator orientation="vertical" className="h-4" />
                            <span>{result.context}</span>
                          </div>

                          <p className="text-sm text-muted-foreground truncate">
                            {result.file.filename}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(): void => navigateToSource(result)}
                            title="Go to source"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={(): void =>
                              onPlayAudio(
                                result.file,
                                result.path,
                                result.context
                              )
                            }
                            title="Play now"
                          >
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
        </div>
      )}

      {/* Search Tips */}
      {!searchState.query && (
        <Card>
          <CardHeader>
            <CardTitle>Search Tips</CardTitle>
            <CardDescription>
              Find audio files quickly with these search techniques
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Search by:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• File titles and names</li>
                  <li>• Exercise numbers (e.g., "01", "02")</li>
                  <li>• Vocabulary numbers</li>
                  <li>• Lesson or unit numbers</li>
                  <li>• File types (exercise, vocabulary)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Examples:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• "exercise 01" - Find first exercises</li>
                  <li>• "vocabulary" - Find all vocabulary files</li>
                  <li>• "lesson 5" - Find lesson 5 content</li>
                  <li>• "unit 2" - Find unit 2 content</li>
                  <li>• "SSL" - Find Sound & Script content</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
