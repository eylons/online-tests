# COMP 424: Midterm Test Lab

A static, browser-based practice-test site based on `COMP424_Midterm_Cheat_Sheet.pdf`. The question bank covers search, A* and heuristics, local search, constraint satisfaction, and minimax/alpha-beta. It uses no server, account, analytics, or external runtime dependency. Test results and theme preference are stored in the browser's `localStorage`.

## Run locally

Serve this folder over HTTP for service-worker and offline support:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. No packages need to be installed. The app can also be hosted as a static site over HTTPS.

## Use the practice tests

- Choose any topic, or mix questions from the full bank.
- Select a 10-question quick test, a 20-question test, or a full review.
- Questions and choices are shuffled. Each answer is checked immediately and followed by an explanation.
- The results page shows the score and a review of every question.
- Progress and the theme preference stay in the current browser; there is no cross-device sync.

The original PDF is not loaded by the website. Questions are encoded in `question-bank.js`, and the PDF does not need to be published with the site. Review the question bank against your course materials before relying on it as an authoritative answer key.

## Privacy and publishing

This project is a static site with no server-side data collection. Browser progress is local to the site origin. Clearing that browser's site data removes it.

If publishing publicly, only the generated question bank and site files need to be deployed; do not add the PDF or private course materials unless you have permission to publish them. On GitHub Pages, create a repository under your personal account, push the site files, and enable Pages from the `main` branch and `/(root)`.
