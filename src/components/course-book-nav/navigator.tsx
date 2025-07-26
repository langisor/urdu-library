"use client";

import * as React from "react";
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
  Play,
  ArrowLeft,
  BookOpen,
  Layers,
  SearchIcon,
  Keyboard,
  Heart,
} from "lucide-react";
import { AudioPlayer } from "@/components/course-book-nav/audio-player";
import { SearchComponent } from "@/components/course-book-nav/search";
import audioData from "@/data/auto-generated/audio-files.json";
import { useFavorites } from "@/hooks/use-favorites";
import type {
  AudioBookData,
  ViewState,
  CurrentAudio,
  AudioFile,
  AppState,
  FileTypeColor,
  KeyboardEventHandler,
  ChangeEventHandler,
  ClickEventHandler,
  SoundScriptLesson,
  Unit,
  Chapter,
} from "@/types/audio-data";
import { FavoritesComponent } from "@/components/course-book-nav/favorites";
import type { FavoritesHookReturn } from "@/types/favorites";
import { JSX } from "react";

// Type assertion for the imported JSON data
const typedAudioData = audioData as AudioBookData;

export default function BookNavigator(): React.ReactNode {
  const favorites = useFavorites();

  const [appState, setAppState] = React.useState<Omit<AppState, "favorites">>({
    viewState: { type: "home" },
    currentAudio: null,
    searchQuery: "",
    showKeyboardHelp: false,
  });

  const updateAppState = React.useCallback(
    (updates: Partial<AppState>): void => {
      setAppState((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const playAudio = React.useCallback(
    (file: AudioFile, path: string, context: string): void => {
      const currentAudio: CurrentAudio = { file, path, context };
      updateAppState({ currentAudio });

      // Update last played if it's a favorite
      const favoriteItem = favorites.items.find(
        (item) => item.file.filename === file.filename && item.path === path
      );
      if (favoriteItem) {
        favorites.updateLastPlayed(favoriteItem.id);
      }
    },
    [updateAppState, favorites]
  );

  const closeAudioPlayer = React.useCallback((): void => {
    updateAppState({ currentAudio: null });
  }, [updateAppState]);

  const setViewState = React.useCallback(
    (viewState: ViewState): void => {
      updateAppState({ viewState });
    },
    [updateAppState]
  );

  const handleSearch = React.useCallback(
    (query: string): void => {
      const searchQuery: string = query;
      const viewState: ViewState = query.trim()
        ? { type: "search", query: query.trim() }
        : { type: "home" };

      updateAppState({ searchQuery, viewState });
    },
    [updateAppState]
  );

  // Global keyboard shortcuts for navigation
  React.useEffect((): (() => void) => {
    const handleKeyDown: KeyboardEventHandler = (
      event: KeyboardEvent
    ): void => {
      // Don't handle shortcuts if user is typing in an input field
      const activeElement: Element | null = document.activeElement;
      const isInputFocused: boolean =
        activeElement !== null &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.getAttribute("contenteditable") === "true");

      if (isInputFocused) return;

      switch (event.code) {
        case "Escape":
          if (appState.currentAudio) {
            closeAudioPlayer();
            event.preventDefault();
          } else if (appState.viewState.type !== "home") {
            setViewState({ type: "home" });
            event.preventDefault();
          }
          break;
        case "KeyH":
          if (event.ctrlKey || event.metaKey) {
            updateAppState({ showKeyboardHelp: !appState.showKeyboardHelp });
            event.preventDefault();
          }
          break;
        case "Slash":
          // Focus search input
          const searchInput: HTMLInputElement | null = document.querySelector(
            'input[placeholder*="search"]'
          );
          if (searchInput) {
            searchInput.focus();
            event.preventDefault();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return (): void => document.removeEventListener("keydown", handleKeyDown);
  }, [
    appState.currentAudio,
    appState.viewState,
    appState.showKeyboardHelp,
    closeAudioPlayer,
    setViewState,
    updateAppState,
  ]);

  const getFileTypeColor = React.useCallback((type: string): FileTypeColor => {
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

  const handleSearchInputChange: ChangeEventHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      handleSearch(e.target.value);
    },
    [handleSearch]
  );

  const toggleKeyboardHelp: ClickEventHandler = React.useCallback((): void => {
    updateAppState({ showKeyboardHelp: !appState.showKeyboardHelp });
  }, [appState.showKeyboardHelp, updateAppState]);

  const closeKeyboardHelp: ClickEventHandler = React.useCallback((): void => {
    updateAppState({ showKeyboardHelp: false });
  }, [updateAppState]);

  const renderHome = React.useCallback(
    (): React.ReactNode => (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Audio Book Navigator</h1>
          <p className="text-lg text-muted-foreground">
            Navigate through your Urdu learning materials
          </p>
          <div className="text-sm text-muted-foreground">
            Generated from: {typedAudioData.metadata.generated_from} •{" "}
            {typedAudioData.statistics.total_audio_files} total files
          </div>

          {/* Keyboard shortcuts button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleKeyboardHelp}
              className="text-xs bg-transparent"
            >
              <Keyboard className="h-3 w-3 mr-1" />
              Keyboard Shortcuts
            </Button>
          </div>
        </div>

        {/* Keyboard Help Modal */}
        {appState.showKeyboardHelp && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Keyboard Shortcuts
                <Button variant="ghost" size="sm" onClick={closeKeyboardHelp}>
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Play/Pause</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">
                    Space
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span>Skip backward (10s)</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">←</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Skip forward (10s)</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">→</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Volume up/down</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">↑ ↓</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Focus search</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">/</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Go home/Close player</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Show this help</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">
                    Ctrl+H
                  </kbd>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Search */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Quick search audio files... (Press / to focus)"
              value={appState.searchQuery}
              onChange={handleSearchInputChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={(): void => setViewState({ type: "sound-script" })}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                Sound and Script
              </CardTitle>
              <CardDescription>
                {typedAudioData.statistics.total_sound_script_lessons} lessons
                with pronunciation exercises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Lessons 1-
                  {typedAudioData.statistics.total_sound_script_lessons}
                </span>
                <Badge variant="secondary">
                  {Object.values(
                    typedAudioData.structure.sound_and_script.lessons
                  ).reduce(
                    (acc: number, lesson: SoundScriptLesson) =>
                      acc + lesson.files.length,
                    0
                  )}{" "}
                  files
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={(): void => setViewState({ type: "units" })}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-6 w-6" />
                Units
              </CardTitle>
              <CardDescription>
                {typedAudioData.statistics.total_units} units with structured
                chapters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {typedAudioData.statistics.total_chapters_with_audio} chapters
                </span>
                <Badge variant="secondary">
                  {typedAudioData.statistics.total_exercise_files +
                    typedAudioData.statistics.total_vocabulary_files}{" "}
                  files
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={(): void => setViewState({ type: "favorites" })}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-red-500" />
                Favorites
              </CardTitle>
              <CardDescription>
                {favorites.items.length} saved audio files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Your bookmarked content</span>
                <Badge variant="secondary">
                  {favorites.items.length} items
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
                {typedAudioData.structure.root_files.map(
                  (file, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <span>{file.description}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={(): void =>
                            playAudio(
                              {
                                filename: file.filename,
                                type: file.type as AudioFile["type"],
                                title: file.description,
                              },
                              file.path,
                              "General"
                            )
                          }
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Play
                        </Button>
                      </div>
                    </div>
                  )
                )}
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
                {typedAudioData.quick_access.units_with_most_audio
                  .slice(0, 3)
                  .map((unit, index: number) => (
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
                {typedAudioData.quick_access.chapters_with_most_exercises
                  .slice(0, 3)
                  .map((chapter, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        Unit {chapter.unit}, Ch {chapter.chapter}
                      </span>
                      <Badge variant="outline">
                        {chapter.exercise_count} exercises
                      </Badge>
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
                {typedAudioData.quick_access.chapters_with_most_vocabulary
                  .slice(0, 3)
                  .map((chapter, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        Unit {chapter.unit}, Ch {chapter.chapter}
                      </span>
                      <Badge variant="outline">
                        {chapter.vocabulary_count} vocab
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    ),
    [
      appState.showKeyboardHelp,
      appState.searchQuery,
      toggleKeyboardHelp,
      closeKeyboardHelp,
      handleSearchInputChange,
      setViewState,
      playAudio,
      favorites.items.length,
    ]
  );

  const renderSoundScript = React.useCallback(
    (): JSX.Element => (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={(): void => setViewState({ type: "home" })}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold">Sound and Script Lessons</h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(
            typedAudioData.structure.sound_and_script.lessons
          ).map(([lessonId, lesson]: [string, SoundScriptLesson]) => (
            <Card
              key={lessonId}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={(): void =>
                setViewState({ type: "sound-script-lesson", lessonId })
              }
            >
              <CardHeader>
                <CardTitle>Lesson {lessonId}</CardTitle>
                <CardDescription>
                  {lesson.files.length} exercises
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">{lesson.folder_name}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    ),
    [setViewState]
  );

  const renderSoundScriptLesson = React.useCallback(
    (lessonId: string): JSX.Element | null => {
      const lesson: SoundScriptLesson | undefined =
        typedAudioData.structure.sound_and_script.lessons[lessonId];
      if (!lesson) return null;

      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={(): void => setViewState({ type: "sound-script" })}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Lessons
            </Button>
            <h1 className="text-3xl font-bold">Lesson {lessonId}</h1>
          </div>

          <div className="grid gap-4">
            {lesson.files.map((file: AudioFile, index: number) => (
              <Card key={index}>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-semibold">{file.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {file.filename}
                    </p>
                    <Badge
                      variant={getFileTypeColor(file.type)}
                      className="mt-1"
                    >
                      {file.type}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={(): void =>
                        playAudio(
                          file,
                          `${lesson.path}/${file.filename}`,
                          `Lesson ${lessonId}`
                        )
                      }
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    },
    [setViewState, getFileTypeColor, playAudio]
  );

  const renderUnits = React.useCallback(
    (): JSX.Element => (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={(): void => setViewState({ type: "home" })}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold">Units</h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(typedAudioData.structure.units).map(
            ([unitId, unit]: [string, Unit]) => {
              const chapterCount: number = Object.keys(unit.chapters).length;
              const fileCount: number = Object.values(unit.chapters).reduce(
                (acc: number, chapter: Chapter) => acc + chapter.files.length,
                0
              );

              return (
                <Card
                  key={unitId}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={(): void => setViewState({ type: "unit", unitId })}
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
              );
            }
          )}
        </div>
      </div>
    ),
    [setViewState]
  );

  const renderUnit = React.useCallback(
    (unitId: string): JSX.Element | null => {
      const unit: Unit | undefined = typedAudioData.structure.units[unitId];
      if (!unit) return null;

      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={(): void => setViewState({ type: "units" })}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Units
            </Button>
            <h1 className="text-3xl font-bold">Unit {unitId}</h1>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(unit.chapters).map(
              ([chapterId, chapter]: [string, Chapter]) => (
                <Card
                  key={chapterId}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={(): void =>
                    setViewState({ type: "chapter", unitId, chapterId })
                  }
                >
                  <CardHeader>
                    <CardTitle>Chapter {chapterId}</CardTitle>
                    <CardDescription>
                      {chapter.files.length} files
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-wrap">
                      {chapter.files.some(
                        (f: AudioFile) => f.type === "exercise"
                      ) && <Badge variant="default">Exercises</Badge>}
                      {chapter.files.some(
                        (f: AudioFile) => f.type === "vocabulary"
                      ) && <Badge variant="secondary">Vocabulary</Badge>}
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      );
    },
    [setViewState]
  );

  const renderChapter = React.useCallback(
    (unitId: string, chapterId: string): JSX.Element | null => {
      const chapter: Chapter | undefined =
        typedAudioData.structure.units[unitId]?.chapters[chapterId];
      if (!chapter) return null;

      const exercises: AudioFile[] = chapter.files.filter(
        (f: AudioFile) => f.type === "exercise"
      );
      const vocabulary: AudioFile[] = chapter.files.filter(
        (f: AudioFile) => f.type === "vocabulary"
      );

      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={(): void => setViewState({ type: "unit", unitId })}
            >
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
                {exercises.map((file: AudioFile, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <span className="font-medium">{file.title}</span>
                      <p className="text-sm text-muted-foreground">
                        {file.filename}
                      </p>
                      {file.exercise_number && (
                        <Badge variant="outline" className="mt-1">
                          Exercise {file.exercise_number}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={(): void =>
                          playAudio(
                            file,
                            `${chapter.path}/${file.filename}`,
                            `Unit ${unitId}, Chapter ${chapterId}`
                          )
                        }
                      >
                        <Play className="h-4 w-4 mr-1" />
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
                {vocabulary.map((file: AudioFile, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <span className="font-medium">{file.title}</span>
                      <p className="text-sm text-muted-foreground">
                        {file.filename}
                      </p>
                      {file.vocabulary_number && (
                        <Badge variant="secondary" className="mt-1">
                          Vocabulary {file.vocabulary_number}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={(): void =>
                          playAudio(
                            file,
                            `${chapter.path}/${file.filename}`,
                            `Unit ${unitId}, Chapter ${chapterId}`
                          )
                        }
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Play
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      );
    },
    [setViewState, playAudio]
  );

  const renderSearch = React.useCallback(
    (): JSX.Element => (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={(): void => setViewState({ type: "home" })}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold">Search</h1>
        </div>

        <SearchComponent
          audioData={typedAudioData}
          onPlayAudio={playAudio}
          onNavigate={setViewState}
        />
      </div>
    ),
    [setViewState, playAudio]
  );

  const renderFavorites = React.useCallback(
    (): React.ReactNode => (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={(): void => setViewState({ type: "home" })}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <FavoritesComponent
          // favorites={favorites}
          onPlayAudio={playAudio}
          onNavigate={setViewState}
        />
      </div>
    ),
    [playAudio, setViewState, favorites]
  );

  const renderCurrentView = React.useCallback((): React.ReactNode => {
    switch (appState.viewState.type) {
      case "home":
        return renderHome();
      case "sound-script":
        return renderSoundScript();
      case "sound-script-lesson":
        return renderSoundScriptLesson(appState.viewState.lessonId);
      case "units":
        return renderUnits();
      case "unit":
        return renderUnit(appState.viewState.unitId);
      case "chapter":
        return renderChapter(
          appState.viewState.unitId,
          appState.viewState.chapterId
        );
      case "search":
        return renderSearch();
      case "favorites":
        return renderFavorites();
      default:
        return renderHome();
    }
  }, [
    appState.viewState,
    renderHome,
    renderSoundScript,
    renderSoundScriptLesson,
    renderUnits,
    renderUnit,
    renderChapter,
    renderSearch,
    renderFavorites,
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 pb-32">{renderCurrentView()}</div>

      {/* Audio Player Component */}
      <AudioPlayer
        currentAudio={appState.currentAudio}
        onClose={closeAudioPlayer}
        onHomeClick={(): void => setViewState({ type: "home" })}
      />
    </div>
  );
}
