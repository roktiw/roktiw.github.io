#!/bin/bash

# Używamy bieżącego folderu roboczego
folder="."
output_file="2-blog-order.yaml"

# Usuwamy istniejący plik output, jeśli już istnieje
if [ -f "$output_file" ]; then
    rm "$output_file"
    echo "Usunięto istniejący plik $output_file"
fi

# Tworzymy plik YAML z listą plików
echo "files:" > "$output_file"
# Używamy find do uzyskania plików z rozszerzeniem .md
find "$folder" -maxdepth 1 -type f -name "*.md" | sort | while read file; do
    # Zapisujemy pełne nazwy plików w formacie YAML
    echo "  - $(basename "$file")" >> "$output_file"
done

echo "Kolejność plików została zapisana w pliku '$output_file'."