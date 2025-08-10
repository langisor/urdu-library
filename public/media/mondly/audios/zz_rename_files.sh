#!/bin/bash

# This script renames audio files in the current directory by removing the '?t='
# and all subsequent characters from the filename.
#
# Usage:
# 1. Save this code to a file, e.g., 'rename_audio.sh'
# 2. Make the script executable: 'chmod +x rename_audio.sh'
# 3. Run the script in the directory with your files: './rename_audio.sh'

echo "Starting file renaming process..."

# Loop through all files in the current directory
for file in *; do
    # Check if the filename contains the '?t=' pattern using a simple test
    if [[ "$file" == *"?t="* ]]; then
        # Use 'sed' to create the new filename.
        # The 'sed' command searches for the pattern '\?t=.*' and replaces it with nothing.
        # The '\?' is an escaped question mark to treat it as a literal character.
        # The '.*' matches all characters after the '?t='.
        new_name=$(echo "$file" | sed 's/\?t=.*//')
        
        # Check if the new name is different from the original
        if [[ "$file" != "$new_name" ]]; then
            echo "Renaming '$file' to '$new_name'..."
            # The 'mv' command renames the file.
            mv "$file" "$new_name"
        fi
    fi
done

echo "Renaming complete."