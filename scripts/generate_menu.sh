#!/bin/bash

# Script to dynamically generate a menu based on the input folder structure
INPUT_DIR="../input"
OUTPUT_FILE="../templates/menu.html"

# Check if a homepage template exists
HOMEPAGE_TEMPLATE="../input/homepage.md"
HOMEPAGE_OUTPUT="../output/index.html"

if [ -f "$HOMEPAGE_TEMPLATE" ]; then
  echo "Processing homepage template: $HOMEPAGE_TEMPLATE"
  markdown-it "$HOMEPAGE_TEMPLATE" > "$HOMEPAGE_OUTPUT"
  echo "Homepage generated at: $HOMEPAGE_OUTPUT"
else
  echo "No homepage template found at $HOMEPAGE_TEMPLATE. Skipping homepage generation."
fi

# Ensure the output directory exists
mkdir -p ../templates

# Start the menu HTML
echo "<ul>" > ../templates/menu.html

# Recursively find all Markdown files and generate menu items
find "$INPUT_DIR" -type f -name '*.md' | while read -r file; do
  # Extract relative path and filename without extension
  relative_path="${file#$INPUT_DIR/}"
  filename="$(basename "$relative_path" .md)"

  # Convert to a valid HTML link
  echo "  <li><a href='output/${filename}.html'>${filename}</a></li>" >> ../templates/menu.html
done

# End the menu HTML
echo "</ul>" >> ../templates/menu.html

# Notify completion
echo "Menu generated at ../templates/menu.html"