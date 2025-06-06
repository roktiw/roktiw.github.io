#!/bin/bash

# Function to read JSON config using jq
get_config() {
    jq -r "$1" config/site.json
}

# Create menu HTML
echo "<nav class=\"site-nav\">" > templates/menu.html
echo "  <ul>" >> templates/menu.html

# Add home link if configured
if [ "$(get_config '.menu.home.show')" = "true" ]; then
    home_title=$(get_config '.menu.home.title // "Home"')
    echo "    <li><a href=\"/\">$home_title</a></li>" >> templates/menu.html
fi

# Get ordered menu items
menu_order=$(get_config '.menu.order[]' | tr '\n' ' ')

# If no order specified, use directory listing
if [ -z "$menu_order" ]; then
    menu_order=$(ls input/ | grep -v 'homepage.md' | tr '\n' ' ')
fi

# Process each menu item
for item in $menu_order; do
    # Skip if in hide list
    if echo "$(get_config '.menu.hide[]')" | grep -q "^$item$"; then
        continue
    fi
    
    # Get custom title or use directory name
    title=$(get_config ".menu.titles[\"$item\"] // \"$item\"")
    
    # Add menu item
    echo "    <li><a href=\"/$item/\">$title</a></li>" >> templates/menu.html
done

echo "  </ul>" >> templates/menu.html
echo "</nav>" >> templates/menu.html