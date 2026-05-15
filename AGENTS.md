# Repository Guidelines
## Project Structure & Module Organization

This is a small static web app for a children’s pinyin learning game.

- `index.html` is the browser entry point.
- `app.js` contains app state, question generation, speech playback, routing, and click handlers.
- `styles.css` contains all layout, responsive, and visual styling.
- `docs/` stores product planning material:
  - `docs/pinyin-game-requirements.md`
  - `docs/one-month-learning-guide.md`
- `README.md` explains setup and usage.

There are currently no dedicated `tests/` or `assets/` directories. If added later, keep tests in `tests/` and media files in `assets/`.

## Build, Test, and Development Commands

No package manager or build step is required.

```bash
python3 -m http.server 4173
```

Starts a local static server. Visit `http://127.0.0.1:4173`.

```bash
open index.html
```

Opens the app directly in a browser on macOS. Use a local server when checking browser behavior consistently.

## Coding Style & Naming Conventions

Use plain JavaScript, HTML, and CSS. Match the existing style:

- JavaScript: 2-space indentation, semicolons, `camelCase` functions and variables, `UPPER_SNAKE_CASE` constants.
- CSS: 2-space indentation, kebab-case class names, custom properties under `:root`.
- HTML: semantic elements where practical, accessible labels for interactive controls.

Keep changes scoped. Avoid new dependencies unless they clearly reduce complexity.

## Testing Guidelines

There is no automated test framework yet. For each change, manually verify:

- Home, game, practice, records, and result views.
- Correct and incorrect answer flows.
- Sound toggle, replay buttons, and temporary JSON progress.
- Desktop and narrow mobile layouts.

If automated tests are introduced, document the command here and name files by feature, for example `tests/progress.test.js`.

## Commit & Pull Request Guidelines

The history currently only contains `first commit`, so no strict convention is established. Use short, imperative commit messages, for example `Add learning record view`.

Pull requests should include:

- A concise summary of user-facing changes.
- Manual verification steps.
- Screenshots or short recordings for UI changes.
- Links to related issues or planning docs when relevant.

## Security & Configuration Tips

Do not commit secrets, tokens, personal data, `.DS_Store`, or unnecessary large binaries. The app stores progress in the local `.tmp/progress.json` file when run through `server.js`.
不要提交敏感数据到git
