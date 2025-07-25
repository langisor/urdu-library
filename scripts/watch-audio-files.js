import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { generateAudioManifest } from "./generate-audio-manifest.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const AUDIO_BASE_PATH = path.join(__dirname, "..", "public", "media", "audio-all")

/**
 * Watch for changes in audio directory and regenerate manifest
 */
function watchAudioFiles() {
  console.log("👀 Watching for audio file changes...")
  console.log(`📂 Monitoring: ${AUDIO_BASE_PATH}`)

  let timeout

  const watcher = fs.watch(AUDIO_BASE_PATH, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith(".mp3")) {
      console.log(`🔄 Detected change: ${eventType} - ${filename}`)

      // Debounce rapid changes
      clearTimeout(timeout)
      timeout = setTimeout(async () => {
        console.log("🚀 Regenerating audio manifest...")
        try {
          await generateAudioManifest()
          console.log("✅ Manifest updated successfully!")
        } catch (error) {
          console.error("❌ Error updating manifest:", error)
        }
      }, 1000)
    }
  })

  console.log("Press Ctrl+C to stop watching...")

  process.on("SIGINT", () => {
    console.log("\n👋 Stopping file watcher...")
    watcher.close()
    process.exit(0)
  })
}

// Run watcher if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  watchAudioFiles()
}

export { watchAudioFiles }
