#!/bin/bash

# Script to dynamically generate a menu based on the input folder structure
INPUT_DIR="../input"
OUTPUT_FILE="../templates/menu.html"

# Ensure the output directory exists
mkdir -p ../templates

# Start the menu HTML
echo "<ul>" > $OUTPUT_FILE

# Recursively find all Markdown files and generate menu items
find "$INPUT_DIR" -type f -name '*.md' | while read -r file; do
  # Extract relative path and filename without extension
  relative_path="${file#$INPUT_DIR/}"
  filename="$(basename "$relative_path" .md)"

  # Convert to a valid HTML link
  echo "  <li><a href='output/${filename}.html'>${filename}</a></li>" >> $OUTPUT_FILE
done

# End the menu HTML
echo "</ul>" >> $OUTPUT_FILE

# Notify completion
echo "Menu generated at $OUTPUT_FILE"