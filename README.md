# GAM GitHub Actions Markdown Stack

## Overview
The GAM GitHub Actions Markdown (GAM) Stack is a lightweight and automated solution for publishing content using GitHub's native tools: GitHub Actions and GitHub Pages. It is designed to simplify the process of managing and deploying static content, such as blog posts or documentation, directly from a GitHub repository.

## How It Works

1. **Content Management**:
   - All content is stored in the `posts/` directory as Markdown (`.md`) files.
   - Each Markdown file represents a post or documentation entry.

2. **Automation with GitHub Actions**:
   - A GitHub Actions workflow (`.github/workflows/update-index.yml`) is triggered whenever changes are pushed to the `posts/` directory.
   - The workflow runs a script (`update-index.js`) that scans the `posts/` directory for new or updated Markdown files.
   - The script generates links to these posts and appends them to the main `index.html` file, ensuring the site is always up-to-date.

3. **Static Site Hosting with GitHub Pages**:
   - The repository is configured to use GitHub Pages for hosting.
   - The `index.html` file serves as the entry point for the site, linking to all available posts.
   - Each Markdown file is converted to an HTML page and stored in the `output/` directory for direct access.

## Features
- **Automated Updates**: New content is automatically added to the site without manual intervention.
- **Markdown-Based**: Write content in Markdown for simplicity and readability.
- **Native GitHub Tools**: Leverages GitHub Actions and GitHub Pages, eliminating the need for external tools or services.
- **Static Hosting**: Content is served as a static site, ensuring fast load times and minimal maintenance.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/gam-stack.git
   cd gam-stack
   ```

2. **Add Content**:
   - Create a new Markdown file in the `posts/` directory.
   - Use the following format for the file:
     ```markdown
     # Title of Your Post

     Your content goes here.
     ```

3. **Push Changes**:
   ```bash
   git add .
   git commit -m "Add new post"
   git push
   ```

4. **View the Site**:
   - Visit your GitHub Pages URL (e.g., `https://username.github.io/repo-name/`) to see the updated site.

## Contributing
Contributions are welcome! Please follow the standard GitHub workflow for submitting pull requests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.