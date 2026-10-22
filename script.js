"use strict";

const STORAGE_KEY = "comp424-midterm-test-lab-v1";
const THEME_KEY = "comp424-midterm-test-lab-theme";
const bank = window.QUESTION_BANK;
const app = document.getElementById("app");
const saveStatus = document.getElementById("save-status");
const topics = [...new Set(bank.map((question) => question.topic))];
let activeQuiz = null;
let storageAvailable = true;

function readProgress() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return { attempted: 0, correct: 0, bestPercent: 0, lastPercent: null };
    const parsed = JSON.parse(value);
    if (
      !parsed ||
      !Number.isInteger(parsed.attempted) ||
      !Number.isInteger(parsed.correct) ||
      !Number.isFinite(parsed.bestPercent) ||
      !(parsed.lastPercent === null || Number.isFinite(parsed.lastPercent))
    ) {
      throw new Error("Saved progress has an unexpected format.");
    }
    return parsed;
  } catch (error) {
    storageAvailable = false;
    saveStatus.textContent = "Progress storage unavailable; this session will not be saved.";
    console.warn("Unable to read saved progress.", error);
    return { attempted: 0, correct: 0, bestPercent: 0, lastPercent: null };
  }
}

let progress = readProgress();

function saveProgress() {
  if (!storageAvailable) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    saveStatus.textContent = "Progress saves in this browser.";
  } catch (error) {
    storageAvailable = false;
    saveStatus.textContent = "Could not save progress in this browser.";
    console.warn("Unable to save progress.", error);
  }
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function makeButton(label, className, onClick, type = "button") {
  const button = element("button", className, label);
  button.type = type;
  if (onClick) button.addEventListener("click", onClick);
  return button;
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function header(eyebrow, title, description) {
  const section = element("section", "hero");
  const copy = element("div", "hero-copy");
  copy.append(element("div", "eyebrow", eyebrow), element("h1", "", title), element("p", "subtle", description));
  section.append(copy);
  return section;
}

function statCard(label, value, note) {
  const card = element("article", "stat-card");
  card.append(element("span", "stat-label", label), element("strong", "stat-value", value), element("span", "stat-note", note));
  return card;
}

function renderHome() {
  activeQuiz = null;
  app.replaceChildren();
  app.append(header(
    "COMP 424 · MIDTERM PRACTICE",
    "Turn the crib sheet into recall.",
    "Practice search, optimization, constraint satisfaction, and game-tree reasoning with questions drawn from your midterm PDF."
  ));

  const stats = element("section", "stat-grid");
  const accuracy = progress.attempted ? `${Math.round((progress.correct / progress.attempted) * 100)}%` : "—";
  stats.append(
    statCard("Questions answered", String(progress.attempted), "across completed tests"),
    statCard("Overall accuracy", accuracy, `${progress.correct} correct so far`),
    statCard("Best test score", progress.attempted ? `${progress.bestPercent}%` : "—", "personal best"),
    statCard("Question bank", String(bank.length), `across ${topics.length} subject areas`)
  );
  app.append(stats);

  const layout = element("section", "dashboard-grid");
  const startPanel = element("article", "panel");
  const heading = element("div", "section-heading");
  heading.append(element("h2", "", "Build a practice test"), element("span", "tag live", `${bank.length} QUESTIONS`));
  startPanel.append(heading);

  const form = element("form", "test-form");
  const topicLabel = element("label", "field-label", "Topic");
  const topicSelect = element("select", "select-control");
  topicSelect.id = "topic-select";
  topicSelect.name = "topic";
  const allTopicsOption = element("option", "", "All topics");
  allTopicsOption.value = "all";
  topicSelect.append(allTopicsOption);
  topics.forEach((topic) => {
    const option = element("option", "", topic);
    option.value = topic;
    topicSelect.append(option);
  });
  topicLabel.htmlFor = topicSelect.id;

  const countLabel = element("label", "field-label", "Test length");
  const countSelect = element("select", "select-control");
  countSelect.id = "count-select";
  countSelect.name = "count";
  [
    ["10", "Quick test · up to 10 questions"],
    ["20", "Practice test · up to 20 questions"],
    ["all", "Full review · all questions"]
  ].forEach(([value, label]) => {
    const option = element("option", "", label);
    option.value = value;
    countSelect.append(option);
  });
  countLabel.htmlFor = countSelect.id;

  const fields = element("div", "form-fields");
  const topicField = element("div", "field");
  topicField.append(topicLabel, topicSelect);
  const countField = element("div", "field");
  countField.append(countLabel, countSelect);
  fields.append(topicField, countField);
  const formNote = element("p", "form-note", "Questions and answer choices are shuffled for each test. You’ll see an explanation after every answer.");
  const startButton = makeButton("Start test", "button primary", null, "submit");
  form.append(fields, formNote, startButton);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    startQuiz(topicSelect.value, countSelect.value);
  });
  startPanel.append(form);

  const coveragePanel = element("article", "panel");
  const coverageHeading = element("div", "section-heading");
  coverageHeading.append(element("h2", "", "What's covered"));
  coveragePanel.append(coverageHeading);
  const list = element("ul", "topic-list");
  topics.forEach((topic) => {
    const count = bank.filter((question) => question.topic === topic).length;
    const row = element("li", "topic-row");
    row.append(element("span", "", topic), element("span", "topic-count", `${count} questions`));
    list.append(row);
  });
  coveragePanel.append(list);
  layout.append(startPanel, coveragePanel);
  app.append(layout);
  focusMain();
}

function startQuiz(topic, count) {
  const pool = topic === "all" ? bank : bank.filter((question) => question.topic === topic);
  if (!pool.length) {
    saveStatus.textContent = "No questions are available for that topic.";
    return;
  }
  const requested = count === "all" ? pool.length : Number(count);
  const questions = shuffle(pool).slice(0, Math.min(requested, pool.length));
  activeQuiz = {
    topic,
    questions: questions.map((question) => ({ ...question, choices: shuffle(question.choices) })),
    index: 0,
    selected: null,
    answered: false,
    results: []
  };
  renderQuestion();
}

function renderQuestion() {
  const question = activeQuiz.questions[activeQuiz.index];
  const current = activeQuiz.index + 1;
  app.replaceChildren();
  const headerSection = element("section", "session-head");
  const heading = element("div", "");
  heading.append(element("div", "eyebrow", activeQuiz.topic === "all" ? "MIXED PRACTICE" : activeQuiz.topic.toUpperCase()), element("h1", "", "Practice test"));
  headerSection.append(heading);
  const progressText = element("div", "session-progress", `${current} / ${activeQuiz.questions.length}`);
  headerSection.append(progressText);
  app.append(headerSection);

  const track = element("div", "progress-track");
  const fill = element("div", "progress-fill");
  fill.style.width = `${(current / activeQuiz.questions.length) * 100}%`;
  track.append(fill);
  app.append(track);

  const card = element("section", "question-card");
  const meta = element("div", "question-meta");
  meta.append(element("span", "tag", question.topic), element("span", "question-number", `QUESTION ${String(current).padStart(2, "0")}`));
  card.append(meta, element("h2", "question-prompt", question.question));

  const choices = element("div", "answer-list");
  choices.setAttribute("role", "radiogroup");
  choices.setAttribute("aria-label", "Answer choices");
  question.choices.forEach((choice, index) => {
    const label = element("label", "answer-choice");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = choice;
    radio.checked = activeQuiz.selected === choice;
    radio.disabled = activeQuiz.answered;
    radio.addEventListener("change", () => {
      activeQuiz.selected = choice;
      app.querySelectorAll(".answer-choice").forEach((item) => item.classList.remove("selected"));
      label.classList.add("selected");
      const submit = document.getElementById("submit-answer");
      if (submit) submit.disabled = false;
    });
    label.append(radio, element("span", "choice-key", String.fromCharCode(65 + index)), element("span", "choice-text", choice));
    if (activeQuiz.selected === choice) label.classList.add("selected");
    choices.append(label);
  });
  card.append(choices);

  if (activeQuiz.answered) {
    const result = activeQuiz.results[activeQuiz.index];
    const feedback = element("div", result.correct ? "feedback correct" : "feedback incorrect");
    feedback.setAttribute("role", "status");
    feedback.append(
      element("strong", "", result.correct ? "That's right." : "Not quite."),
      element("p", "", result.correct ? question.explanation : `The correct answer is: ${question.answer}. ${question.explanation}`)
    );
    card.append(feedback);
  }
  app.append(card);

  const actions = element("div", "question-actions");
  actions.append(makeButton("Exit test", "button secondary", renderHome));
  if (activeQuiz.answered) {
    const isLast = activeQuiz.index === activeQuiz.questions.length - 1;
    actions.append(makeButton(isLast ? "See results" : "Next question", "button primary", isLast ? finishQuiz : nextQuestion));
  } else {
    const submit = makeButton("Check answer", "button primary", checkAnswer);
    submit.id = "submit-answer";
    submit.disabled = !activeQuiz.selected;
    actions.append(submit);
  }
  app.append(actions);
  focusMain();
}

function checkAnswer() {
  if (!activeQuiz.selected) return;
  const question = activeQuiz.questions[activeQuiz.index];
  activeQuiz.answered = true;
  activeQuiz.results[activeQuiz.index] = {
    question,
    selected: activeQuiz.selected,
    correct: activeQuiz.selected === question.answer
  };
  renderQuestion();
}

function nextQuestion() {
  activeQuiz.index += 1;
  activeQuiz.selected = null;
  activeQuiz.answered = false;
  renderQuestion();
}

function finishQuiz() {
  const results = activeQuiz.results;
  const correct = results.filter((result) => result.correct).length;
  const percent = Math.round((correct / results.length) * 100);
  progress.attempted += results.length;
  progress.correct += correct;
  progress.bestPercent = Math.max(progress.bestPercent, percent);
  progress.lastPercent = percent;
  saveProgress();
  renderResults(results, correct, percent);
}

function renderResults(results, correct, percent) {
  activeQuiz = null;
  app.replaceChildren();
  const title = percent === 100 ? "Perfect run." : percent >= 70 ? "Good progress." : "Keep building the basics.";
  app.append(header("TEST COMPLETE", title, `You answered ${correct} of ${results.length} questions correctly. Review the explanations below, then try another test.`));

  const score = element("section", "score-card");
  score.append(
    element("strong", "score-value", `${percent}%`),
    element("span", "", "test score"),
    element("div", "progress-track")
  );
  const scoreTrack = score.querySelector(".progress-track");
  const scoreFill = element("div", "progress-fill");
  scoreFill.style.width = `${percent}%`;
  scoreTrack.append(scoreFill);
  app.append(score);

  const actions = element("div", "results-actions");
  actions.append(makeButton("Try another test", "button primary", renderHome));
  app.append(actions);

  const review = element("section", "review-list");
  review.append(element("h2", "", "Answer review"));
  results.forEach((result, index) => {
    const card = element("article", result.correct ? "review-card correct" : "review-card incorrect");
    const label = element("div", "review-label", `${result.correct ? "CORRECT" : "REVIEW"} · ${result.question.topic} · QUESTION ${index + 1}`);
    card.append(label, element("h3", "", result.question.question));
    if (!result.correct) card.append(element("p", "your-answer", `Your answer: ${result.selected}`));
    card.append(element("p", "review-answer", `Answer: ${result.question.answer}`), element("p", "review-explanation", result.question.explanation));
    review.append(card);
  });
  app.append(review);
  focusMain();
}

function showProgress() {
  if (activeQuiz) {
    renderHome();
    return;
  }
  renderHome();
  document.querySelector(".stat-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function focusMain() {
  app.focus({ preventScroll: true });
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  const root = document.documentElement;
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = nextTheme;
  try {
    localStorage.setItem(THEME_KEY, nextTheme);
  } catch (error) {
    saveStatus.textContent = "Theme preference could not be saved.";
    console.warn("Unable to save theme preference.", error);
  }
});

document.getElementById("home-link").addEventListener("click", (event) => {
  event.preventDefault();
  renderHome();
});
document.getElementById("progress-button").addEventListener("click", showProgress);

try {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light" || savedTheme === "dark") document.documentElement.dataset.theme = savedTheme;
} catch (error) {
  saveStatus.textContent = "Theme preference could not be loaded.";
  console.warn("Unable to load theme preference.", error);
}

if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      saveStatus.textContent = "Offline caching could not be enabled.";
      console.warn("Unable to register the service worker.", error);
    });
  });
}

renderHome();
