// ============================================================
// APP LOGIC — Grøntsagshavens årshjul (month/plant views)
// Reads SOURCES, CLIMATE and gardenData (from data.js),
// draws the screen, and handles clicks + editing.
// ============================================================

const CATEGORY_KEYS = ["sow", "plantOut", "harvest", "care", "prep"];
const CATEGORY_LABELS = {
  sow: "Så og forspir",
  plantOut: "Plantes ud",
  harvest: "Høst",
  care: "Plantepleje",
  prep: "Haveforberedelse"
};
// The month view is split into two sections
const SECTIONS = [
  { title: "Planter", sub: "Såning, udplantning, høst og pleje af afgrøderne", keys: ["sow", "plantOut", "harvest", "care"] },
  { title: "Haveforberedelse", sub: "Jord, bede, kompost, planlægning og vedligehold", keys: ["prep"] }
];
const STORAGE_KEY = "veggieWheel.garden.v2";
const OLD_STORAGE_KEY = "veggieWheel.garden.v1";

// ------------------------------------------------------------
// STATE — the app's "memory" while it's open
// ------------------------------------------------------------
let garden = loadGarden();      // the working copy of the data
let currentMonth = null;        // index of the month on screen
let currentPlant = null;        // name of the plant on screen

// ------------------------------------------------------------
// SAVING & LOADING (localStorage)
// ------------------------------------------------------------
function loadGarden() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return withAllCategories(JSON.parse(saved));
    const old = localStorage.getItem(OLD_STORAGE_KEY);
    if (old) return migrateOldTips(JSON.parse(old));
  } catch (e) { /* storage unavailable — fall back */ }
  // deep copy, so edits never change the original gardenData
  return JSON.parse(JSON.stringify(gardenData));
}

// Make sure every month has every list (protects against old saves)
function withAllCategories(data) {
  data.forEach(m => CATEGORY_KEYS.forEach(k => { if (!Array.isArray(m[k])) m[k] = []; }));
  return data;
}

// Older versions had one "tips" list. Split it the same way data.js does:
// if data.js has the tip under "care", it goes there; otherwise "prep".
function migrateOldTips(data) {
  data.forEach((m, i) => {
    const ref = gardenData[i] || { care: [] };
    const careNames = new Set((ref.care || []).map(t => t.name));
    const tips = m.tips || [];
    delete m.tips;
    m.care = tips.filter(t => careNames.has(t.name));
    m.prep = tips.filter(t => !careNames.has(t.name));
  });
  return withAllCategories(data);
}

function saveGarden() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(garden));
    setStatus("Ændringer gemt i denne browser");
  } catch (e) {
    setStatus("Kunne ikke gemme i browseren — brug Eksportér for at beholde ændringer");
  }
}

function hasLocalEdits() {
  try { return localStorage.getItem(STORAGE_KEY) !== null; } catch (e) { return false; }
}

function setStatus(text) {
  document.getElementById("saveStatus").textContent = text;
}

// ------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------
// Escape user text so it can't break the HTML
function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function renderSources(keys) {
  if (!keys || keys.length === 0) return "";
  return `<div class="src-tags">${keys.map(k => {
    const src = SOURCES[k];
    if (!src) return "";
    return src.url
      ? `<a class="src-tag" href="${src.url}" target="_blank" rel="noopener">${esc(src.label)}</a>`
      : `<span class="src-tag own">${esc(src.label)}</span>`;
  }).join("")}</div>`;
}

// Edit + delete buttons for one item. The data-* attributes tell
// the click handler exactly which item it belongs to.
function editButtons(m, cat, i) {
  return `<span class="item-actions">
    <button class="icon-btn" data-action="edit" data-m="${m}" data-cat="${cat}" data-i="${i}" aria-label="Redigér">✎</button>
    <button class="icon-btn" data-action="delete" data-m="${m}" data-cat="${cat}" data-i="${i}" aria-label="Slet">✕</button>
  </span>`;
}

// ------------------------------------------------------------
// TABS
// ------------------------------------------------------------
function showTab(tabId) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === tabId));
  document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === tabId));
}

function setupTabs() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
  });
}

// ------------------------------------------------------------
// PAGES — each feature registers its own page here (see layout.js);
// the burger menu and routing in menu.js are built from this list.
// ------------------------------------------------------------
const PAGES = {
  wheel: { id: "pageWheel", title: "Grøntsagshavens årshjul", menuLabel: "Grøntsagshavens årshjul" }
};

// ------------------------------------------------------------
// MONTH VIEW
// ------------------------------------------------------------
function renderMonthPicker() {
  const picker = document.getElementById("monthPicker");
  picker.innerHTML = "";
  garden.forEach((monthData, index) => {
    const btn = document.createElement("button");
    btn.textContent = monthData.month;
    if (index === currentMonth) btn.classList.add("selected");
    btn.addEventListener("click", () => {
      currentMonth = index;
      renderMonthPicker();
      renderMonth();
    });
    picker.appendChild(btn);
  });
}

function renderCategory(m, cat) {
  const items = garden[m][cat];
  const body = items.length
    ? `<ul>${items.map((item, i) => `
        <li>
          ${editButtons(m, cat, i)}
          <b>${esc(item.name)}</b>
          ${item.note ? `<span>${esc(item.note)}</span>` : ""}
          ${renderSources(item.sources)}
        </li>`).join("")}</ul>`
    : `<p class="empty-msg small">Ikke noget denne måned</p>`;
  return `
    <div class="category ${cat}">
      <h3>${CATEGORY_LABELS[cat]}
        <button class="add-btn" data-action="add" data-m="${m}" data-cat="${cat}">+ Tilføj</button>
      </h3>
      ${body}
    </div>`;
}

function renderMonth() {
  const detail = document.getElementById("monthDetail");
  const m = currentMonth;
  const monthData = garden[m];

  const sectionsHtml = SECTIONS.map(sec => `
    <section class="month-section">
      <div class="section-head">
        <h2>${sec.title}</h2>
        <p>${sec.sub}</p>
      </div>
      ${sec.keys.map(cat => renderCategory(m, cat)).join("")}
    </section>`).join("");

  detail.innerHTML = `
    <div class="month-header">
      <h2>${esc(monthData.month)}</h2>
      <p>${esc(monthData.subtitle)}</p>
    </div>
    ${sectionsHtml}`;
}

// ------------------------------------------------------------
// PLANT VIEW
// Each plant profile (PLANTS in data.js) links to monthly tasks
// through its "match" words. Tasks that don't match any profile
// (e.g. ones you add yourself) are listed under "Andre".
// ------------------------------------------------------------
function taskMatches(profile, taskName) {
  const n = taskName.toLowerCase();
  if ((profile.exclude || []).some(w => n.includes(w))) return false;
  if ((profile.exact || []).includes(n)) return true;
  return profile.match.some(w => n.includes(w));
}

function tasksFor(predicate) {
  const rows = [];
  garden.forEach((monthData, m) =>
    CATEGORY_KEYS.forEach(cat =>
      monthData[cat].forEach((item, i) => {
        if (predicate(item.name)) rows.push({ m, cat, i, month: monthData.month, item });
      })
    )
  );
  return rows;
}

// Task names not covered by any profile
function getOtherNames() {
  const names = new Set();
  garden.forEach(md => CATEGORY_KEYS.forEach(cat => md[cat].forEach(item => {
    if (cat === "care" || cat === "prep") return; // jobs, not plants
    if (/^(alt det|løbende)/i.test(item.name)) return; // general harvest notes
    if (!PLANTS.some(p => taskMatches(p, item.name))) names.add(item.name);
  })));
  return Array.from(names).sort((a, b) => a.localeCompare(b, "da"));
}

function renderPlantPicker() {
  const picker = document.getElementById("plantPicker");
  const filterText = document.getElementById("plantSearch").value.toLowerCase();
  picker.innerHTML = "";

  const makeBtn = (label, key) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    if (key === currentPlant) btn.classList.add("selected");
    btn.addEventListener("click", () => { currentPlant = key; renderPlantPicker(); renderPlant(); });
    return btn;
  };

  PLANTS
    .filter(p => p.name.toLowerCase().includes(filterText))
    .sort((a, b) => a.name.localeCompare(b.name, "da"))
    .forEach(p => picker.appendChild(makeBtn(p.name, "profile:" + p.name)));

  const others = getOtherNames().filter(n => n.toLowerCase().includes(filterText));
  if (others.length) {
    const label = document.createElement("span");
    label.className = "picker-label";
    label.textContent = "Andre:";
    picker.appendChild(label);
    others.forEach(n => picker.appendChild(makeBtn(n, "task:" + n)));
  }
}

function profileRow(label, text) {
  if (!text || text === "—") return "";
  return `<div class="p-row"><b>${label}</b><span>${esc(text)}</span></div>`;
}

function renderProfile(p) {
  const grp = p.group ? ROTATION[p.group] : null;
  let nextYear = "";
  if (grp && grp.next) {
    nextYear = `Bedet går videre til: ${ROTATION[grp.next].label}`;
  } else if (p.group === "flerarig") {
    nextYear = "Flerårig — står fast og indgår ikke i sædskiftet.";
  } else if (p.group === "drivhus") {
    nextYear = "Varmekrævende/drivhus — ikke med i Bolius' 4 sædskiftegrupper.";
  }
  return `
    <div class="profile">
      <div class="profile-head">
        <h2>${esc(p.name)}</h2>
        <span class="method-badge">${esc(p.method)}</span>
      </div>
      ${grp ? `<p class="p-group">Sædskiftegruppe: ${esc(grp.label)}</p>` : ""}
      ${profileRow("Såning", p.sow)}
      ${profileRow("Udplantning", p.out)}
      ${profileRow("Tid til høst", p.time)}
      ${profileRow("Bagefter samme år", p.after)}
      ${profileRow("Næste år i bedet", nextYear)}
      ${p.conflict ? `<p class="p-conflict">Uenighed mellem kilder: ${esc(p.conflict)}</p>` : ""}
      ${renderSources(p.sources)}
    </div>`;
}

function renderTaskRows(rows) {
  return rows.map(r => `
    <div class="plant-year-item">
      ${editButtons(r.m, r.cat, r.i)}
      <span class="m-label">${esc(r.month)}</span>
      <span class="cat-tag ${r.cat}">${CATEGORY_LABELS[r.cat]}</span>
      <span class="py-name">${esc(r.item.name)}</span>
      ${r.item.note ? `<div class="py-note">${esc(r.item.note)}</div>` : ""}
      ${renderSources(r.item.sources)}
    </div>`).join("");
}

function renderPlant() {
  const detail = document.getElementById("plantDetail");
  if (!currentPlant) {
    detail.innerHTML = `<p class="empty-msg">Vælg en afgrøde for at se hvornår den skal sås, plantes ud og høstes.</p>`;
    return;
  }

  let head = "", rows = [];
  if (currentPlant.startsWith("profile:")) {
    const p = PLANTS.find(x => "profile:" + x.name === currentPlant);
    if (!p) { currentPlant = null; return renderPlant(); }
    head = renderProfile(p);
    rows = tasksFor(name => taskMatches(p, name));
  } else {
    const name = currentPlant.slice(5);
    head = `<div class="month-header"><h2>${esc(name)}</h2></div>`;
    rows = tasksFor(n => n === name);
  }

  detail.innerHTML = head + `
    <h3 class="tasks-title">Opgaver hen over året (${rows.length})</h3>
    ${rows.length ? renderTaskRows(rows) : `<p class="empty-msg small">Ingen opgaver i kalenderen endnu.</p>`}`;
}

// Redraw everything that depends on the data
function refreshAll() {
  renderMonthPicker();
  renderMonth();
  renderPlantPicker();
  renderPlant();
}

// ------------------------------------------------------------
// EDITOR (the popup form)
// ------------------------------------------------------------
const dialog = () => document.getElementById("editDialog");
let editing = null; // null = adding new; otherwise {m, cat, i}

function fillSelects() {
  document.getElementById("fMonth").innerHTML =
    garden.map((md, idx) => `<option value="${idx}">${esc(md.month)}</option>`).join("");
  document.getElementById("fCat").innerHTML =
    CATEGORY_KEYS.map(k => `<option value="${k}">${CATEGORY_LABELS[k]}</option>`).join("");
}

function openEditor(m, cat, i) {
  fillSelects();
  const isNew = i === undefined;
  editing = isNew ? null : { m, cat, i };
  const item = isNew ? { name: "", note: "" } : garden[m][cat][i];

  document.getElementById("dialogTitle").textContent = isNew ? "Tilføj opgave" : "Redigér opgave";
  document.getElementById("fMonth").value = m;
  document.getElementById("fCat").value = cat;
  document.getElementById("fName").value = item.name;
  document.getElementById("fNote").value = item.note;
  dialog().showModal();
  document.getElementById("fName").focus();
}

function saveEditor() {
  const name = document.getElementById("fName").value.trim();
  if (!name) { document.getElementById("fName").focus(); return; }

  const m = Number(document.getElementById("fMonth").value);
  const cat = document.getElementById("fCat").value;
  const note = document.getElementById("fNote").value.trim();

  let sources = ["egen"];
  if (editing) {
    // keep the original sources, and mark that you've changed it
    const old = garden[editing.m][editing.cat][editing.i];
    sources = old.sources.includes("egen") ? old.sources : [...old.sources, "egen"];
    garden[editing.m][editing.cat].splice(editing.i, 1); // remove from old spot
  }
  garden[m][cat].push({ name, note, sources });

  currentMonth = m;
  if (currentPlant && currentPlant.startsWith("task:") && editing) currentPlant = "task:" + name;
  saveGarden();
  refreshAll();
  dialog().close();
}

function deleteItem(m, cat, i) {
  const item = garden[m][cat][i];
  if (!confirm(`Slet "${item.name}" fra ${garden[m].month} (${CATEGORY_LABELS[cat]})?`)) return;
  garden[m][cat].splice(i, 1);
  saveGarden();
  refreshAll();
}

// One click listener for the whole page. It checks which kind of
// button was clicked using its data-action attribute. This is
// called "event delegation" — it works even for buttons that are
// created later.
function setupActions() {
  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const m = Number(btn.dataset.m);
    const cat = btn.dataset.cat;
    const i = btn.dataset.i !== undefined ? Number(btn.dataset.i) : undefined;
    if (btn.dataset.action === "add") openEditor(m, cat);
    if (btn.dataset.action === "edit") openEditor(m, cat, i);
    if (btn.dataset.action === "delete") deleteItem(m, cat, i);
  });

  document.getElementById("fSave").addEventListener("click", saveEditor);
  document.getElementById("fCancel").addEventListener("click", () => dialog().close());
  document.getElementById("plantSearch").addEventListener("input", renderPlantPicker);
  document.getElementById("exportBtn").addEventListener("click", exportDataFile);
  document.getElementById("resetBtn").addEventListener("click", resetToOriginal);
}

// ------------------------------------------------------------
// EXPORT & RESET
// ------------------------------------------------------------
function exportDataFile() {
  const content =
`// ============================================================
// GARDEN DATA — exported from the app ${new Date().toLocaleDateString("da-DK")}
// Replace your old data.js with this file to make edits permanent.
// Lists per month: sow, plantOut, harvest, care (Planter) and prep (Haveforberedelse).
// Each item: { name, note, sources }. Use sources: ["egen"] for your own notes.
// ============================================================

const SOURCES = ${JSON.stringify(SOURCES, null, 2)};

// Background reference only — not displayed in the app.
const CLIMATE = ${JSON.stringify(CLIMATE, null, 2)};

const ROTATION = ${JSON.stringify(ROTATION, null, 2)};

const PLANTS = ${JSON.stringify(PLANTS, null, 2)};

const gardenData = ${JSON.stringify(garden, null, 2)};
`;
  const blob = new Blob([content], { type: "text/javascript" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.js";
  link.click();
  URL.revokeObjectURL(link.href);
  setStatus("data.js downloadet — erstat den gamle fil for at gøre ændringerne permanente");
}

function resetToOriginal() {
  if (!confirm("Fjern alle ændringer gemt i browseren og gå tilbage til data.js?")) return;
  try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(OLD_STORAGE_KEY); } catch (e) {}
  garden = JSON.parse(JSON.stringify(gardenData));
  document.dispatchEvent(new Event("garden:reset")); // other features reset themselves
  currentPlant = null;
  refreshAll();
  setStatus("Nulstillet til data.js");
}

// ------------------------------------------------------------
// STARTUP
// ------------------------------------------------------------
document.getElementById("sourceList").innerHTML = "Kilder: " + Object.values(SOURCES)
  .filter(s => s.url)
  .map(s => `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)}</a>`)
  .join(", ");

currentMonth = Math.min(new Date().getMonth(), garden.length - 1); // Nov+Dec share the last entry
setupTabs();
setupActions();
refreshAll();
setStatus(hasLocalEdits() ? "Viser dine gemte ændringer" : "Ingen ændringer endnu — data kommer fra data.js");

