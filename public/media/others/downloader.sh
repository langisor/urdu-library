#!/bin/bash

# Define the base URL for the audio files
BASE_URL="https://www.book2.nl/cms/alphabet/learn/ur/"

# Define the subdirectory where files will be saved
SUBDIR="alphabets"

# Create the subdirectory if it doesn't exist
mkdir -p "$SUBDIR"

# Check if the directory was created successfully or already exists
if [ ! -d "$SUBDIR" ]; then
    echo "Error: Could not create directory '$SUBDIR'. Exiting."
    exit 1
fi

echo "Starting download of audio files into '$SUBDIR'..."

# Loop from 1 to 38
for i in $(seq -w 1 38); do
    # -w option with seq ensures leading zeros (e.g., 01, 02, ..., 09)

    # Construct the full URL for the current file
    FILE_URL="${BASE_URL}${i}.mp3"

    # Construct the local path where the file will be saved
    # The filename will be XX.mp3 (e.g., 01.mp3)
    LOCAL_PATH="${SUBDIR}/${i}.mp3"

    echo "Downloading: ${FILE_URL} to ${LOCAL_PATH}"

    # Use wget to download the file
    # -q: quiet mode (suppress output)
    # --show-progress: show a progress bar (useful for larger files)
    # -O: output document to a specific file
    wget -q --show-progress -O "$LOCAL_PATH" "$FILE_URL"

    # Check if the download was successful
    if [ $? -eq 0 ]; then
        echo "Successfully downloaded ${i}.mp3"
    else
        echo "Failed to download ${i}.mp3"
    fi
done

echo "All downloads attempted. Check the '$SUBDIR' directory for files."