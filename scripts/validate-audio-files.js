import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIO_BASE_PATH = path.join(
  __dirname,
  "..",
  "public",
  "media",
  "audio-all"
);
const MANIFEST_PATH = path.join(
  __dirname,
  "..",
  "src",
  "data",
  "auto-generated",
  "audio-files.json"
);

/**
 * Validate that all files in manifest exist on filesystem
 */
async function validateAudioFiles() {
  try {
    console.log("🔍 Starting audio file validation...");

    // Load the manifest
    const manifestData = JSON.parse(await fs.readFile(MANIFEST_PATH, "utf8"));

    let totalFiles = 0;
    const missingFiles = [];
    let foundFiles = 0;

    // Validate root files
    for (const file of manifestData.structure.root_files) {
      totalFiles++;
      const filePath = path.join(AUDIO_BASE_PATH, file.filename);
      try {
        await fs.access(filePath);
        foundFiles++;
        console.log(`✅ ${file.filename}`);
      } catch {
        missingFiles.push(file.filename);
        console.log(`❌ ${file.filename} - NOT FOUND`);
      }
    }

    // Validate Sound and Script files
    for (const [lessonNum, lesson] of Object.entries(
      manifestData.structure.sound_and_script.lessons
    )) {
      for (const file of lesson.files) {
        totalFiles++;
        const filePath = path.join(
          AUDIO_BASE_PATH,
          "Sound and Script",
          lesson.folder_name,
          file.filename
        );
        try {
          await fs.access(filePath);
          foundFiles++;
          console.log(
            `✅ Sound and Script/Lesson${lessonNum}/${file.filename}`
          );
        } catch {
          missingFiles.push(
            `Sound and Script/Lesson${lessonNum}/${file.filename}`
          );
          console.log(
            `❌ Sound and Script/Lesson${lessonNum}/${file.filename} - NOT FOUND`
          );
        }
      }
    }

    // Validate Unit files
    for (const [unitNum, unit] of Object.entries(
      manifestData.structure.units
    )) {
      for (const [chapterNum, chapter] of Object.entries(unit.chapters)) {
        for (const file of chapter.files) {
          totalFiles++;
          const filePath = path.join(
            AUDIO_BASE_PATH,
            unit.folder_name,
            chapter.folder_name,
            file.filename
          );
          try {
            await fs.access(filePath);
            foundFiles++;
            console.log(
              `✅ Unit ${unitNum}/Chapter${chapterNum}/${file.filename}`
            );
          } catch {
            missingFiles.push(
              `Unit ${unitNum}/Chapter${chapterNum}/${file.filename}`
            );
            console.log(
              `❌ Unit ${unitNum}/Chapter${chapterNum}/${file.filename} - NOT FOUND`
            );
          }
        }
      }
    }

    // Print summary
    console.log("\n📊 Validation Summary:");
    console.log(`   • Total files in manifest: ${totalFiles}`);
    console.log(`   • Files found: ${foundFiles}`);
    console.log(`   • Missing files: ${missingFiles.length}`);

    if (missingFiles.length > 0) {
      console.log("\n❌ Missing files:");
      missingFiles.forEach((file) => console.log(`   • ${file}`));
      process.exit(1);
    } else {
      console.log("\n✅ All files validated successfully!");
    }
  } catch (error) {
    console.error("❌ Error validating audio files:", error);
    process.exit(1);
  }
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateAudioFiles();
}

export { validateAudioFiles };
