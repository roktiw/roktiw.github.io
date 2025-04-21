#!/bin/bash

# Używamy bieżącego folderu roboczego
folder="."
yaml_file="2_blog_order.yaml"

# Usuwamy istniejący plik YAML, jeśli istnieje
rm -f "$yaml_file"

# Wyszukujemy wszystkie pliki .md w folderze (uważając na spacje)
files=($(find "$folder" -maxdepth 1 -type f -name "*.md"))

# Zrzucamy nazwy plików do pliku YAML
echo "Kolejność plików w folderze:" > "$yaml_file"
for file in "${files[@]}"; do
    # Używamy cudzysłowów, aby nazwa pliku była traktowana jako jeden ciąg znaków
    echo "- \"$file\"" >> "$yaml_file"
done

echo "Nazwy plików zostały zapisane do pliku YAML."