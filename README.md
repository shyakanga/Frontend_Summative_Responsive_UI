# ISSUES WITH CODEVIBE
-  When I was coding I deleted a function (It was around 40 lines), then the authorship jumped to ~45 from ~10%
-  Then when I was working on a seed data json file outside the assignment directory (but it was opened in the same vscode window), I pasted 30 seed data books, and then went to 52%



# Project Overview

- Theme: A personal book management app that helps you keep track of your catlog.
- This is a books app built with vanilla html,js, and css to help you interact with your books
- Video Walkthrough: https://www.loom.com/share/2c79161f138a4efd864b43c05cb370b2
- Live site: https://shyakanga.github.io/Frontend_Summative_Responsive_UI/index.html



# Setup

- Clone the repo and use vscode's built in live server or use "python http.serve 4000" (if you open the files nromally ES modules won't work from 'file//')
- After opening the app, import the books using seed.json or your own.



# Features

- Dashboard Stats
- Importing and exporting your custom data
- Sort and Search through your whole book catalog
- Add, Edit, and Delete the books from your data
- Manipulate settings (Reading speed and page cap)
- Persistent data saved through localstorage


## Regex Catalog

- Title: `^\S(?:.*\S)?$`, not empty and no space at the start or end.
- Title: `\b(\w+)\s+\1\b`, catches repeated words like "it it".
- Author: `^\S(?:.*\S)?$`, not empty and no space at the start or end.
- Pages: `^[1-9]\d*$`, a whole number above 0 with no leading zero.
- Tag: `^[A-Za-z]+(?:[ -][A-Za-z]+)*$`, letters only, with single spaces or hyphens between words.
- Date format: `^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$`, YYYY-MM-DD.
- Date really exists: After the format check, the date is rebuilt to reject days like 2025-20-20.
- Book ID (import): `^book_\d+$` means the word book, an underscore, then digits.
- Search box: User input is converted to regex and compiled safely if valid. Flags are `gi`, or `g` when case sensitive is checked.


## Keyboard Map

- Tab / Shift+Tab: Navigate through links and interact with them.
- Enter on "Skip to content": Jumps past the navigation to the main content.


## Accessibility

- Skip link: First thing on every page, and it is only shown when it is focused on.
- Landmarks: Each page has a header, nav, main and footer, and one h1.
- Current page: The current page is marked with `aria-current="page"`.
- Labels: Every input has a label, and errors show next to the field.
- Live messages: Results are announced with `role="status"` / `aria-live`.
- Contrast: Colours chosen for readable text contrast.
- Responsive: Mobile-first, checked at 360, 768 and 1024 pixels.


## Testing

- Navigate to `https://shyakanga.github.io/Frontend_Summative_Responsive_UI/tests.html` to see the tests.
- Manual check: Import `seed.json`, then try a broken file (not JSON, or `pages` as text) and confirm the error and that nothing changed.


## Files

- Main Pages: `index.html`, `about.html`, `records.html`, `add-edit.html`, `settings.html`
- `styles/`: One CSS file per page plus a shared one.
- `scripts/`: `storage.js`, `state.js`, `validators.js`, `search.js`, and one script per page.
- `seed.json`: Example data to import.
- `tests.html`: Test page.
