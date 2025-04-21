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
    # Zapisujemy każdą nazwę pliku bez zmian (uwzględniając spacje)
    echo "- \"$file\"" >> "$yaml_file"
done

echo "Nazwy plików zostały zapisane do pliku YAML."

# Wczytujemy listę plików z pliku YAML
files=($(grep -o '^\s*-\s*\(.*\)' "$yaml_file" | sed 's/^\s*-\s*//'))

# Nadajemy prefiksy do plików zgodnie z kolejnością z YAML
counter=1
for file in "${files[@]}"; do
    # Usuwamy niepotrzebne spacje na początku i końcu nazwy pliku
    file=$(echo "$file" | xargs)

    # Sprawdzamy, czy plik istnieje w folderze, traktując nazwę jako string
    if [[ -f "$folder/$file" ]]; then
        # Usuwamy istniejący prefiks
        new_name="${file//_blog[0-9]*_/}"

        # Dodajemy nowy prefiks w formie _blog001_
        new_name="_blog$(printf "%03d" "$counter")_$new_name"

        mv "$folder/$file" "$folder/$new_name"
        echo "Zmieniono nazwę '$file' na '$new_name'"
        ((counter++))
    else
        echo "Plik '$file' nie istnieje w folderze."
    fi
done

echo "Nazwy plików zostały zmienione zgodnie z kolejnością z pliku YAML."