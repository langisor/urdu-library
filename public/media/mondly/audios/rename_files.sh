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
    # Check if the filename contains the '?t=' pattern
    if [[ "$file" == *"?t="* ]]; then
        # Use shell parameter expansion to get the new filename
        # This removes the shortest matching pattern '??t=*' from the end of the string.
        # Example: '_49Nc9pZTyyakVlXUpFnfwIYZ9B6C2eX?t=1688821938' becomes '_49Nc9pZTyyakVlXUpFnfwIYZ9B6C2eX'
        new_name="${file%%?t=*}"
        
        # Check if the new name is different from the original
        if [[ "$file" != "$new_name" ]]; then
            echo "Renaming '$file' to '$new_name'..."
            # The 'mv' command renames the file.
            mv "$file" "$new_name"
        fi
    fi
done

echo "Renaming complete."
