#!/bin/bash

# Create output directory if it doesn't exist
mkdir -p output

# Mirror directory structure from input to output
find input -type d | while read dir; do
    # Create corresponding directory in output
    mkdir -p "output/${dir#input/}"
done

# Process Markdown files
find input -name "*.md" | while read file; do
    # Get relative path and create output path
    rel_path="${file#input/}"
    dir_path=$(dirname "output/$rel_path")
    base_name=$(basename "$rel_path" .md)
    
    # Special handling for section index files
    if [ "$base_name" = "$(basename $(dirname "$file"))" ]; then
        output_file="$dir_path/index.html"
        template="templates/default.html"
        # Set section flag
        metadata="--metadata=is_section:true"
    else
        output_file="$dir_path/$base_name.html"
        template="templates/default.html"
        metadata=""
    fi
    
    # Convert markdown to HTML
    pandoc "$file" \
        --standalone \
        --template="$template" \
        --metadata-file=config/site.json \
        $metadata \
        --include-in-header=templates/menu.html \
        -o "$output_file"
done

# Special handling for homepage.md
if [ -f "input/homepage.md" ]; then
    pandoc "input/homepage.md" \
        --standalone \
        --template="templates/home.html" \
        --metadata-file=config/site.json \
        --include-in-header=templates/menu.html \
        -o "output/index.html"
fi 