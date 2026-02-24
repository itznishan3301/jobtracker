

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

**`getElementById(id)`**
- Selects a **single** element by its unique `id` attribute.
- Returns: One `Element` object, or `null` if not found.
- Example: `document.getElementById('total-count')`
- Fastest selector because the browser indexes IDs for quick lookup.

**`getElementsByClassName(className)`**
- Selects **all** elements that have a specific CSS class.
- Returns: A **live** `HTMLCollection` — it automatically updates if the DOM changes.
- Example: `document.getElementsByClassName('job-card')`
- Multiple elements can share the same class name.

**`querySelector(selector)`**
- Selects the **first** element matching any valid CSS selector.
- Returns: One `Element` object, or `null` if not found.
- Example: `document.querySelector('.tab-btn[data-tab="all"]')`
- More flexible — accepts IDs, classes, attributes, combinators, pseudo-classes, etc.

**`querySelectorAll(selector)`**
- Selects **all** elements matching a CSS selector.
- Returns: A **static** `NodeList` — does NOT auto-update when the DOM changes.
- Example: `document.querySelectorAll('[data-tab]')`

| Method | Returns | Live? | Selector type |
|--------|---------|-------|---------------|
| `getElementById` | Single element | — | ID only |
| `getElementsByClassName` | HTMLCollection | Yes | Class only |
| `querySelector` | Single element | — | Any CSS selector |
| `querySelectorAll` | NodeList | No | Any CSS selector |

---

### 2. How do you create and insert a new element into the DOM?

```javascript
const newCard = document.createElement('div');

newCard.textContent = 'New Job Card';
newCard.className = 'job-card';
newCard.setAttribute('data-id', '9');

const container = document.getElementById('jobs-container');

container.appendChild(newCard);          
container.prepend(newCard);              
container.insertBefore(newCard, refNode);

container.innerHTML += '<div class="job-card">New Card</div>';
```

In this project, job cards are dynamically created and inserted using `innerHTML` assignment on `#jobs-container`.

---

### 3. What is Event Bubbling? And how does it work?

**Event Bubbling** is the mechanism where an event triggered on a child element travels **upward** through its parent elements in the DOM tree, triggering any matching event listeners on each ancestor.

**How it works:**
1. You click a `<button>` inside a `<div>` inside a `<section>`.
2. The `click` event fires on the `<button>` first.
3. Then it "bubbles up" to the `<div>`, then `<section>`, then `<body>`, then `document`.
4. Each ancestor's `click` listener gets triggered in order.

```html
<div id="parent">
  <button id="child">Click me</button>
</div>
```

```javascript
document.getElementById('parent').addEventListener('click', () => {
  console.log('Parent fired!');
});
document.getElementById('child').addEventListener('click', () => {
  console.log('Child fired!');
});

```

You can stop bubbling with `e.stopPropagation()` if needed.

---

### 4. What is Event Delegation in JavaScript? Why is it useful?

**Event Delegation** means attaching **one event listener to a parent element** instead of adding separate listeners to each child. It works because of event bubbling — clicks on any child element bubble up to the parent listener.

**Why it's useful:**
1. **Performance** — One listener replaces dozens or hundreds of individual listeners.
2. **Dynamic content** — Works automatically on elements added to the DOM after the page loads (no need to re-attach listeners).
3. **Cleaner code** — Centralizes event handling logic.

**Example from this project:**
```javascript

document.getElementById('jobs-container').addEventListener('click', function(e) {
  const card = e.target.closest('[data-id]');
  if (!card) return;

  const id = parseInt(card.dataset.id, 10);

  if (e.target.closest('.btn-interview-outline') || e.target.closest('.btn-interview-active')) {
    setJobStatus(id, 'interview');
  } else if (e.target.closest('.btn-rejected-outline') || e.target.closest('.btn-rejected-active')) {
    setJobStatus(id, 'rejected');
  } else if (e.target.closest('.btn-delete-icon')) {
    deleteJob(id);
  }
});
```

---

### 5. What is the difference between preventDefault() and stopPropagation() methods?

Both methods modify event behavior, but they do **different things**:

**`event.preventDefault()`**
- Prevents the **browser's default action** for the event.
- The event still bubbles up to parent elements normally.
- Examples:
  - Preventing a form from submitting (page reload).
  - Preventing a link from navigating to its `href`.
  - Preventing a checkbox from toggling.

```javascript
document.querySelector('a').addEventListener('click', function(e) {
  e.preventDefault();
  console.log('Clicked, but no navigation!');
});
```

**`event.stopPropagation()`**
- Stops the event from **bubbling up** to parent elements.
- The browser's default action still happens (unless you also call `preventDefault()`).

```javascript
document.querySelector('.btn-delete-icon').addEventListener('click', function(e) {
  e.stopPropagation(); 
  deleteJob(this.closest('[data-id]').dataset.id);
});
```

**Side-by-side comparison:**

| Method | Stops Default Action | Stops Bubbling |
|--------|---------------------|----------------|
| `preventDefault()` | **Yes** | No |
| `stopPropagation()` | No | **Yes** |
| Both together | Yes | Yes |

**Key insight:** These two concerns are completely independent. You can call one, both, or neither depending on what behavior you need to control.
