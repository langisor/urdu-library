import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const AUDIO_BASE_PATH = path.join(
  __dirname,
  "..",
  "public",
  "media",
  "audio-all"
);
const OUTPUT_PATH = path.join(
  __dirname,
  "..",
  "src",
  "data",
  "auto-generated",
  "audio-files.json"
);
const WEB_BASE_PATH = "/media/audio-all";

// File type detection patterns
const PATTERNS = {
  // Sound and Script Lessons: Pien7788_SSL01Ex01.mp3
  soundScript: /^Pien7788_SSL(\d+)Ex(\d+)\.mp3$/,

  // Unit Exercises: Pien7788_U01Ch01Ex01.mp3
  unitExercise: /^Pien7788_U(\d+)Ch(\d+)Ex(.+)\.mp3$/,

  // Unit Vocabulary: Pien7788_U01Ch01V01.mp3
  unitVocabulary: /^Pien7788_U(\d+)Ch(\d+)V(.+)\.mp3$/,

  // General files
  general: /^[^/]+\.mp3$/,
};

/**
 * Parse filename to extract metadata
 */
function parseFilename(filename) {
  // Remove .mp3 extension for parsing
  const nameWithoutExt = filename.replace(".mp3", "");

  // Sound and Script Lessons
  const sslMatch = filename.match(PATTERNS.soundScript);
  if (sslMatch) {
    const [, lesson, exercise] = sslMatch;
    return {
      type: "exercise",
      category: "sound_script",
      lesson: Number.parseInt(lesson),
      exercise_number: exercise.padStart(2, "0"),
      title: `Exercise ${Number.parseInt(exercise)}`,
      unit: null,
      chapter: null,
    };
  }

  // Unit Exercises
  const unitExMatch = filename.match(PATTERNS.unitExercise);
  if (unitExMatch) {
    const [, unit, chapter, exerciseNum] = unitExMatch;
    return {
      type: "exercise",
      category: "unit",
      unit: Number.parseInt(unit),
      chapter: Number.parseInt(chapter),
      exercise_number: exerciseNum,
      title: `Exercise ${exerciseNum}`,
      lesson: null,
    };
  }

  // Unit Vocabulary
  const unitVocabMatch = filename.match(PATTERNS.unitVocabulary);
  if (unitVocabMatch) {
    const [, unit, chapter, vocabNum] = unitVocabMatch;
    return {
      type: "vocabulary",
      category: "unit",
      unit: Number.parseInt(unit),
      chapter: Number.parseInt(chapter),
      vocabulary_number: vocabNum,
      title: `Vocabulary ${vocabNum}`,
      lesson: null,
    };
  }

  // General files
  if (filename.match(PATTERNS.general)) {
    return {
      type: "general",
      category: "general",
      title: nameWithoutExt.replace(/_/g, " "),
      unit: null,
      chapter: null,
      lesson: null,
    };
  }

  return null;
}

/**
 * Recursively scan directory and build file structure
 */
async function scanDirectory(dirPath, relativePath = "") {
  const items = await fs.readdir(dirPath, { withFileTypes: true });
  const structure = {
    files: [],
    directories: {},
  };

  for (const item of items) {
    const itemPath = path.join(dirPath, item.name);
    const itemRelativePath = path.join(relativePath, item.name);

    if (item.isDirectory()) {
      console.log(`📁 Scanning directory: ${itemRelativePath}`);
      structure.directories[item.name] = await scanDirectory(
        itemPath,
        itemRelativePath
      );
    } else if (item.isFile() && item.name.endsWith(".mp3")) {
      const metadata = parseFilename(item.name);
      if (metadata) {
        const fileInfo = {
          filename: item.name,
          ...metadata,
          path: path.join(WEB_BASE_PATH, itemRelativePath).replace(/\\/g, "/"),
        };
        structure.files.push(fileInfo);
        console.log(`🎵 Found audio file: ${item.name} (${metadata.type})`);
      }
    }
  }

  return structure;
}

/**
 * Organize files into the structured format
 */
function organizeFiles(scannedStructure) {
  const organized = {
    metadata: {
      generated_from: "public/media/audio-all file system scan",
      generated_at: new Date().toISOString(),
      base_path: WEB_BASE_PATH,
    },
    structure: {
      root_files: [],
      sound_and_script: {
        folder_name: "Sound and Script",
        base_path: `${WEB_BASE_PATH}/Sound and Script`,
        lessons: {},
      },
      units: {},
    },
    statistics: {
      total_sound_script_lessons: 0,
      total_units: 0,
      total_chapters_with_audio: 0,
      total_exercise_files: 0,
      total_vocabulary_files: 0,
      total_audio_files: 0,
      chapters_by_unit: {},
      files_by_type: {
        exercise: 0,
        vocabulary: 0,
        general: 0,
      },
    },
  };

  // Process root files
  scannedStructure.files.forEach((file) => {
    if (file.type === "general") {
      organized.structure.root_files.push({
        filename: file.filename,
        path: file.path,
        type: file.type,
        description: file.title,
      });
      organized.statistics.files_by_type.general++;
    }
  });

  // Process Sound and Script directory
  if (scannedStructure.directories["Sound and Script"]) {
    const soundScriptDir = scannedStructure.directories["Sound and Script"];

    Object.keys(soundScriptDir.directories).forEach((lessonDirName) => {
      const lessonMatch = lessonDirName.match(/Lesson(\d+)/);
      if (lessonMatch) {
        const lessonNumber = lessonMatch[1];
        const lessonDir = soundScriptDir.directories[lessonDirName];

        organized.structure.sound_and_script.lessons[lessonNumber] = {
          folder_name: lessonDirName,
          path: `${WEB_BASE_PATH}/Sound and Script/${lessonDirName}`,
          files: lessonDir.files.map((file) => ({
            filename: file.filename,
            type: file.type,
            exercise_number: file.exercise_number,
            title: file.title,
          })),
        };

        organized.statistics.total_exercise_files += lessonDir.files.length;
        organized.statistics.files_by_type.exercise += lessonDir.files.length;
      }
    });

    organized.statistics.total_sound_script_lessons = Object.keys(
      organized.structure.sound_and_script.lessons
    ).length;
  }

  // Process Unit directories
  Object.keys(scannedStructure.directories).forEach((dirName) => {
    const unitMatch = dirName.match(/Unit (\d+) Audio/);
    if (unitMatch) {
      const unitNumber = unitMatch[1];
      const unitDir = scannedStructure.directories[dirName];

      organized.structure.units[unitNumber] = {
        folder_name: dirName,
        base_path: `${WEB_BASE_PATH}/${dirName}`,
        chapters: {},
      };

      let chaptersInUnit = 0;

      Object.keys(unitDir.directories).forEach((chapterDirName) => {
        const chapterMatch = chapterDirName.match(/Chapter(\d+)/);
        if (chapterMatch) {
          const chapterNumber = chapterMatch[1];
          const chapterDir = unitDir.directories[chapterDirName];

          organized.structure.units[unitNumber].chapters[chapterNumber] = {
            folder_name: chapterDirName,
            path: `${WEB_BASE_PATH}/${dirName}/${chapterDirName}`,
            files: chapterDir.files.map((file) => {
              const fileData = {
                filename: file.filename,
                type: file.type,
                title: file.title,
              };

              if (file.type === "exercise") {
                fileData.exercise_number = file.exercise_number;
                organized.statistics.total_exercise_files++;
                organized.statistics.files_by_type.exercise++;
              } else if (file.type === "vocabulary") {
                fileData.vocabulary_number = file.vocabulary_number;
                organized.statistics.total_vocabulary_files++;
                organized.statistics.files_by_type.vocabulary++;
              }

              return fileData;
            }),
          };

          chaptersInUnit++;
        }
      });

      organized.statistics.chapters_by_unit[unitNumber] = chaptersInUnit;
      organized.statistics.total_chapters_with_audio += chaptersInUnit;
    }
  });

  organized.statistics.total_units = Object.keys(
    organized.structure.units
  ).length;
  organized.statistics.total_audio_files =
    organized.statistics.files_by_type.exercise +
    organized.statistics.files_by_type.vocabulary +
    organized.statistics.files_by_type.general;

  // Generate quick access data
  organized.quick_access = generateQuickAccess(organized);

  return organized;
}

/**
 * Generate quick access statistics
 */
function generateQuickAccess(organized) {
  const unitsWithMostAudio = [];
  const chaptersWithMostExercises = [];
  const chaptersWithMostVocabulary = [];

  // Calculate units with most audio
  Object.keys(organized.structure.units).forEach((unitNumber) => {
    const unit = organized.structure.units[unitNumber];
    let totalFiles = 0;

    Object.values(unit.chapters).forEach((chapter) => {
      totalFiles += chapter.files.length;
    });

    unitsWithMostAudio.push({
      unit: Number.parseInt(unitNumber),
      total_files: totalFiles,
    });
  });

  // Calculate chapters with most exercises/vocabulary
  Object.keys(organized.structure.units).forEach((unitNumber) => {
    const unit = organized.structure.units[unitNumber];

    Object.keys(unit.chapters).forEach((chapterNumber) => {
      const chapter = unit.chapters[chapterNumber];
      const exercises = chapter.files.filter((f) => f.type === "exercise");
      const vocabulary = chapter.files.filter((f) => f.type === "vocabulary");

      if (exercises.length > 0) {
        chaptersWithMostExercises.push({
          unit: Number.parseInt(unitNumber),
          chapter: Number.parseInt(chapterNumber),
          exercise_count: exercises.length,
        });
      }

      if (vocabulary.length > 0) {
        chaptersWithMostVocabulary.push({
          unit: Number.parseInt(unitNumber),
          chapter: Number.parseInt(chapterNumber),
          vocabulary_count: vocabulary.length,
        });
      }
    });
  });

  return {
    units_with_most_audio: unitsWithMostAudio
      .sort((a, b) => b.total_files - a.total_files)
      .slice(0, 4),
    chapters_with_most_exercises: chaptersWithMostExercises
      .sort((a, b) => b.exercise_count - a.exercise_count)
      .slice(0, 3),
    chapters_with_most_vocabulary: chaptersWithMostVocabulary
      .sort((a, b) => b.vocabulary_count - a.vocabulary_count)
      .slice(0, 4),
  };
}

/**
 * Main execution function
 */
async function generateAudioManifest() {
  try {
    console.log("🚀 Starting audio manifest generation...");
    console.log(`📂 Scanning directory: ${AUDIO_BASE_PATH}`);

    // Check if audio directory exists
    try {
      await fs.access(AUDIO_BASE_PATH);
    } catch (error) {
      console.error(`❌ Audio directory not found: ${AUDIO_BASE_PATH}`);
      console.log("Please ensure the audio files are in the correct location.");
      process.exit(1);
    }

    // Scan the directory structure
    const scannedStructure = await scanDirectory(AUDIO_BASE_PATH);

    // Organize the files into the desired structure
    console.log("🔄 Organizing files...");
    const organizedData = organizeFiles(scannedStructure);

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_PATH);
    await fs.mkdir(outputDir, { recursive: true });

    // Write the JSON file
    console.log(`💾 Writing manifest to: ${OUTPUT_PATH}`);
    await fs.writeFile(
      OUTPUT_PATH,
      JSON.stringify(organizedData, null, 2),
      "utf8"
    );

    // Print summary
    console.log("\n✅ Audio manifest generated successfully!");
    console.log("\n📊 Summary:");
    console.log(
      `   • Total audio files: ${organizedData.statistics.total_audio_files}`
    );
    console.log(
      `   • Exercise files: ${organizedData.statistics.total_exercise_files}`
    );
    console.log(
      `   • Vocabulary files: ${organizedData.statistics.total_vocabulary_files}`
    );
    console.log(
      `   • General files: ${organizedData.statistics.files_by_type.general}`
    );
    console.log(
      `   • Sound & Script lessons: ${organizedData.statistics.total_sound_script_lessons}`
    );
    console.log(`   • Units: ${organizedData.statistics.total_units}`);
    console.log(
      `   • Chapters with audio: ${organizedData.statistics.total_chapters_with_audio}`
    );

    console.log("\n🎯 Top units by audio count:");
    organizedData.quick_access.units_with_most_audio.forEach((unit) => {
      console.log(`   • Unit ${unit.unit}: ${unit.total_files} files`);
    });

    console.log(
      `\n📄 Manifest saved to: ${path.relative(process.cwd(), OUTPUT_PATH)}`
    );
  } catch (error) {
    console.error("❌ Error generating audio manifest:", error);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAudioManifest();
}

export { generateAudioManifest, parseFilename, organizeFiles };
