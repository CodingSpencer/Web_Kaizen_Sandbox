const DAYS = [
  { w:1, topic:"CSS specificity",     task:"Override a style 3 different ways" },
  { w:1, topic:"Box model",           task:"Visualize margin vs padding on a div" },
  { w:1, topic:"Custom properties",   task:"Create 3 CSS variables for a color scheme" },
  { w:1, topic:"Pseudo-classes",      task:"Style :hover, :focus, :nth-child" },
  { w:1, topic:"Pseudo-elements",     task:"Add ::before content to a heading" },
  { w:1, topic:"Transitions",         task:"Animate a button on hover" },
  { w:1, topic:"Transforms",          task:"Scale & rotate a card on hover" },

  { w:2, topic:"Flexbox basics",      task:"Center something horizontally + vertically" },
  { w:2, topic:"Flex direction",      task:"Build a row nav that wraps on small screens" },
  { w:2, topic:"CSS Grid intro",      task:"Make a 3-column grid of cards" },
  { w:2, topic:"Grid areas",          task:"Name 3 areas: header, main, sidebar" },
  { w:2, topic:"Responsive units",    task:"Use rem, vw, clamp() in one layout" },
  { w:2, topic:"Media queries",       task:"Collapse a 2-col layout to 1 on mobile" },
  { w:2, topic:"CSS animations",      task:"Write a @keyframes fade-in" },

  { w:3, topic:"let vs const",        task:"Rewrite 5 vars using correct keyword" },
  { w:3, topic:"Arrow functions",     task:"Convert 3 functions to arrow syntax" },
  { w:3, topic:"Template literals",   task:"Build a greeting string with variables" },
  { w:3, topic:"Destructuring",       task:"Destructure an object and an array" },
  { w:3, topic:"Spread & rest",       task:"Merge two arrays with spread" },
  { w:3, topic:"Array methods",       task:"Use .map() and .filter() on a list" },
  { w:3, topic:"Promises basics",     task:"Write a fetch() and log the result" },

  { w:4, topic:"DOM selection",       task:"Select 3 elements 3 different ways" },
  { w:4, topic:"DOM manipulation",    task:"Add/remove a class on button click" },
  { w:4, topic:"Event listeners",     task:"Toggle dark mode with a button" },
  { w:4, topic:"Forms & input",       task:"Read an input value and display it live" },
  { w:4, topic:"Local storage",       task:"Save a user name between page refreshes" },
  { w:4, topic:"Fetch API",           task:"Load JSON from a free public API" },
  { w:4, topic:"Mini project",        task:"Build a to-do list from scratch" },
  { w:4, topic:"Mini project",        task:"Add delete + done to your to-do list" },
  { w:4, topic:"Review day",          task:"Revisit your hardest day and redo its task" },
];

const WEEKS = [
  { w:1, label:"Week 1", theme:"CSS fundamentals",    cls:"w1" },
  { w:2, label:"Week 2", theme:"CSS layout mastery",  cls:"w2" },
  { w:3, label:"Week 3", theme:"JavaScript fundamentals", cls:"w3" },
  { w:4, label:"Week 4", theme:"JS + DOM in action",  cls:"w4" },
];

const KEY = 'kaizen_web_v1';
let done = {};

function load() {
  try { done = JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e) { done = {}; }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(done)); } catch(e) {}
}

function updateProgress() {
  const count = Object.values(done).filter(Boolean).length;
  const pct = Math.round(count / 30 * 100);
  document.getElementById('done-count').textContent = count;
  document.getElementById('pct-label').textContent = pct + '%';
  document.getElementById('bar').style.width = pct + '%';
}

function render() {
  const container = document.getElementById('weeks');
  container.innerHTML = '';

  WEEKS.forEach(({ w, label, theme, cls }) => {
    const section = document.createElement('div');
    section.className = 'week';

    const header = document.createElement('div');
    header.className = 'week-header';
    header.innerHTML = `<h2>${label}</h2><span class="week-tag" style="background:var(--tag-${cls}-bg);color:var(--tag-${cls})">${theme}</span>`;
    section.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'days-grid';

    DAYS.filter(d => d.w === w).forEach((d) => {
      const num = DAYS.indexOf(d) + 1;
      const key = 'day' + num;
      const card = document.createElement('div');
      card.className = 'day-card' + (done[key] ? ' done' : '');
      card.innerHTML = `
        <div class="day-num">Day ${num}</div>
        <div class="day-topic">${d.topic}</div>
        <div class="day-task">${d.task}</div>
        <div class="day-check">${done[key] ? '✓' : ''}</div>
      `;
      card.addEventListener('click', () => {
        done[key] = !done[key];
        save();
        card.className = 'day-card' + (done[key] ? ' done' : '');
        card.querySelector('.day-check').textContent = done[key] ? '✓' : '';
        updateProgress();
      });
      grid.appendChild(card);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });

  updateProgress();
}

function resetAll() {
  if (!confirm('Reset all progress?')) return;
  done = {};
  save();
  render();
}

load();
render();