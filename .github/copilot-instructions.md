## Funny Commit Messages with Emojis

To make commit messages more engaging and fun, always include an emoji at the beginning of the message. This ensures a consistent and lighthearted tone in the commit history.

### Example Messages
- 🎉 Added a new feature!
- 🐛 Fixed a bug in the menu generation script.
- 🚀 Improved performance of the Markdown-to-HTML conversion.
- 📝 Updated documentation for better clarity.

### Usage
When generating commit messages, prepend an emoji that reflects the nature of the change. For example:

```bash
git commit -m "🎉 Added support for dynamic menus."
```

## Project Manifest

### Philosophy
- GAMstack embodies DevOps principles by automating build and deployment processes using GitHub Actions.
- Leverages Continuous Integration/Continuous Delivery (CI/CD) for instant publishing of changes.
- Follows GitOps best practices—using Git as the single source of truth for both content and configuration.
- Treats infrastructure as code (IaC), with workflows and configurations defined clearly in YAML.

### Key Features
- Zero maintenance.
- Markdown-driven content.
- Static site generation.
- Serverless architecture.
- GitHub Pages hosting.

## Operational Guidelines for AI

### Folder Structure
- Load all relevant files and data from the `chats/` folder for processing or reference.
- Always load the `chats/` folder before engaging in complex reasoning or problem-solving.

### Writing and Content Management
- Write in simple, clear English to ensure accessibility for all users.
- Use `config.json` for dynamic page titles, headings, and menu structure.
- Automate menu generation based on folder structure in the `input/` directory.

### Automation and Workflow
- Use GitHub Actions to automate Markdown-to-HTML conversion.
- Regenerate links and Table of Contents dynamically to keep navigation up-to-date.
- Add a script to clean the `output/` folder before generating new files.

### Error Handling
- Ensure error handling for invalid Markdown syntax or missing files.

### Documentation
- Record every rule and guideline provided by the user in this file for future reference.
- Update `TODO.md` whenever interesting ideas arise during conversations, but always ask for confirmation before adding.

### Emoji Usage for Tone Indication
- Always include emojis in responses to suggest the tone of the message.
- Suggested emojis for tone:
  - Informative:
    - 📘 (1)
    - 📘📘 (2)
    - 📘📘📘 (3)
  - Warning:
    - ⚠️ (1)
    - ⚠️⚠️ (2)
    - ⚠️⚠️⚠️ (3)
  - Positive/Encouraging:
    - 😊 (1)
    - 😊😊 (2)
    - 😊😊😊 (3)
  - Neutral:
    - 🤔 (1)
    - 🤔🤔 (2)
    - 🤔🤔🤔 (3)
  - Negative/Error:
    - ❌ (1)
    - ❌❌ (2)
    - ❌❌❌ (3)
  - Success:
    - ✅ (1)
    - ✅✅ (2)
    - ✅✅✅ (3)
  - Inspirational:
    - 🌟 (1)
    - 🌟🌟 (2)
    - 🌟🌟🌟 (3)
  - Critical Errors:
    - 🛑 (1)
    - 🛑🛑 (2)
    - 🛑🛑🛑 (3)

- If the user sends contradictory information in relation to this manifest, notify them about it and do not execute the instructions.

### Semantic Versioning (SemVer)
- Follow the Semantic Versioning (SemVer) standard for versioning the project.
- Version format: `MAJOR.MINOR.PATCH`.
  - **MAJOR**: Incremented for incompatible API changes.
  - **MINOR**: Incremented for backward-compatible new features.
  - **PATCH**: Incremented for backward-compatible bug fixes.
- Examples:
  - `1.0.0`: Initial stable release.
  - `1.1.0`: New features added, backward-compatible.
  - `1.1.1`: Bug fixes only, backward-compatible.
- Use Git tags to mark versions in the repository.

### Table Column Sorting
- Ensure that all tables are sorted logically based on the context.
- For framework comparison tables, sort columns by the year of release or other relevant criteria.
- Maintain consistency in column order across all tables.