## APP
This is a simple book app that stores data in localstorage and gives you a clean dashboard to view how yuo've been interacting with your catalog

## Files

- index.html is the root of the app, it has the dashboard
- the navbar gets it's style from the index.css style and is used by every page
- records.html is a html page with a table of all the books arranges neatly
- add-edit.html: this has two forms for adding and editing or deleting books
- settings: where data can be impoted or exported, along with other settings like caps
- styles/: each file will have it's custom styling file to make debugging easier and code cleaner
- scripts/: this will have modular functions for things like regex, validation, talking to locastorgae, so that we keep things clean and tidy
- seed.js has the seed data on books
- test.html will have simple tests for regex

## Data

- model: id, title, author, pages, tag, createdAt, UpdatedAt
- setting that will be able to change will be: the page cap, and pages per hour



## A11Y Plan

- Include skip-content
- Errors will be anounced via aria-live
- Proper semantic tags will be used from the beginning
- Text color contrast will be above 4.5:1