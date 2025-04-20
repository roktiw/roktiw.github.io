#!/bin/bash

# Read menu order from config.json using jq
MENU_ORDER=$(jq -r '.menuOrder[]' config/config.json)

# Generate menu.html
echo "<!-- Navigation Menu -->" > templates/menu.html
echo "<ul class=\"nav-menu\">" >> templates/menu.html

# Create menu items based on config
for item in $MENU_ORDER; do
    # Convert item name to display name (replace - with space and capitalize)
    display_name=$(echo "$item" | tr '-' ' ' | sed 's/\b\(.\)/\u\1/g')
    echo "    <li><a href=\"$item/index.html\">$display_name</a></li>" >> templates/menu.html
done

echo "</ul>" >> templates/menu.html

# Create output directory if it doesn't exist
mkdir -p output

# Create output directories and copy content from input
for item in $MENU_ORDER; do
    mkdir -p "output/$item"
    if [ -d "input/$item" ]; then
        cp -r "input/$item"/* "output/$item"/ 2>/dev/null || true
    fi
done

# Combine templates into index.html
cat templates/header.html templates/menu.html templates/footer.html > output/index.html 