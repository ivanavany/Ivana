// ============================================================
// GARDEN LAYOUT — 12 beds, each with up to 3 crops.
// Loaded from garden-data.json, edits kept in localStorage,
// exported/imported as garden-data.json. Independent of the
// årshjul code except for PLANTS, esc(), setStatus() and PAGES.
// ============================================================

const LAYOUT_STORAGE_KEY = "veggieWheel.layout.v1";
const GARDEN_FILE = "garden-data.json";
const MAX_CROPS_PER_BED = 3;
const VARIANT_SEP = " – ";
// Garden layout: 3 columns x 4 rows of beds, 1 m wide. Lengths per row in metres.
const BED_COLS = 3;
const BED_ROW_LENGTHS = [1.2, 1.2, 2.4, 2.4];

let baseLayout = emptyLayout(); // layout from garden-data.json (or empty)
let layout = loadLayout();      // bed id -> list of crops
let editingBed = null;          // bed id open in the bed dialog

// The page and dialog markup live here so index.html stays feature-free.
document.getElementById("pageWheel").insertAdjacentHTML("afterend", `
  <div id="pageLayout" class="page">
    <p class="layout-intro">12 bede (1 m brede; stierne er tegnet halvt så brede som i virkeligheden). Klik på et bed for at vælge op til 3 afgrøder.</p>
    <div class="layout-actions">
      <button id="exportLayoutBtn">Eksportér garden-data.json</button>
      <button id="importLayoutBtn" class="ghost">Importér…</button>
      <input type="file" id="importLayoutInput" accept="application/json,.json" hidden>
    </div>
    <div class="garden-scroll"><div id="gardenGrid" class="garden-grid"></div></div>
  </div>`);
document.body.insertAdjacentHTML("beforeend", `
  <dialog id="bedDialog">
    <h3 id="bedDialogTitle">Bed</h3>
    <label>Afgrøde 1 <select id="bedCrop1"></select></label>
    <label>Afgrøde 2 <select id="bedCrop2"></select></label>
    <label>Afgrøde 3 <select id="bedCrop3"></select></label>
    <div class="dialog-actions">
      <button id="bedCancel" class="ghost">Annullér</button>
      <button id="bedSave">Gem</button>
    </div>
  </dialog>`);

// Find the main plant profile for a bed entry like "Kartofler" or "Kartofler – Sava"
function plantForCrop(crop) {
  return PLANTS.find(p => p.name === crop) ||
    PLANTS.find(p => (p.variants || []).some(v => crop === p.name + VARIANT_SEP + v));
}

// All choices for the bed dialog: each plant, followed by its variants
function cropOptions() {
  const out = [];
  PLANTS.slice().sort((a, b) => a.name.localeCompare(b.name, "da")).forEach(p => {
    out.push(p.name);
    (p.variants || []).forEach(v => out.push(p.name + VARIANT_SEP + v));
  });
  return out;
}

// Beds hold a list of crops; older saves/data may hold a single string
function normalizeLayout(raw) {
  const out = {};
  Object.entries(raw).forEach(([id, v]) => {
    const list = Array.isArray(v) ? v : (v ? [v] : []);
    out[id] = list.filter(Boolean).slice(0, MAX_CROPS_PER_BED);
  });
  return out;
}

function emptyLayout() {
  const out = {};
  for (let c = 1; c <= BED_COLS; c++) for (let r = 1; r <= BED_ROW_LENGTHS.length; r++) out[`${c}-${r}`] = [];
  return out;
}

// garden-data.json is the saved layout. It can only be fetched over http(s),
// so when the page is opened from a file the empty layout is used instead
// (use "Importér" on the layout page there).
async function loadGardenFile() {
  try {
    const res = await fetch(GARDEN_FILE, { cache: "no-cache" });
    if (!res.ok) return;
    const data = await res.json();
    baseLayout = normalizeLayout({ ...emptyLayout(), ...(data.layout || {}) });
    layout = loadLayout();
    renderLayout();
  } catch (e) { /* file:// or offline — keep the empty layout */ }
}

function loadLayout() {
  const base = { ...baseLayout };
  try {
    const saved = localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (saved) Object.assign(base, JSON.parse(saved));
  } catch (e) { /* storage unavailable — use data.js */ }
  return normalizeLayout(base);
}

function saveLayout() {
  try {
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layout));
    setStatus("Layout gemt i denne browser — eksportér garden-data.json for at gøre det permanent");
  } catch (e) {
    setStatus("Kunne ikke gemme i browseren — brug Eksportér for at beholde ændringer");
  }
}


// ------------------------------------------------------------
// GARDEN LAYOUT
// ------------------------------------------------------------
function renderLayout() {
  const grid = document.getElementById("gardenGrid");
  // bed rows alternate with path rows (shown at half the real 1 m for readability)
  grid.style.gridTemplateRows = BED_ROW_LENGTHS.map(l => `calc(var(--m) * ${l})`).join(" var(--gap) ");
  let html = "";
  let n = 0;
  for (let r = 1; r <= BED_ROW_LENGTHS.length; r++) {
    for (let c = 1; c <= BED_COLS; c++) {
      n++;
      const id = `${c}-${r}`;
      const crops = layout[id] || [];
      const cropHtml = !crops.length ? `<span class="bed-empty">Tom</span>`
        : `<div class="bed-crops">` + crops.map(crop => plantForCrop(crop)
          ? `<a class="bed-crop" href="#plant=${encodeURIComponent(plantForCrop(crop).name)}" title="Se ${esc(crop)} under Efter plante">${esc(crop)}</a>`
          : `<span class="bed-crop">${esc(crop)}</span>`).join("") + `</div>`;
      html += `<div class="bed${crops.length ? " filled" : ""}" data-bed="${id}" style="grid-column:${c * 2 - 1};grid-row:${r * 2 - 1}" role="button" tabindex="0" aria-label="Bed ${n}">
        <span class="bed-num">Bed ${n} · ${BED_ROW_LENGTHS[r - 1]} m</span>
        ${cropHtml}
      </div>`;
    }
  }
  grid.innerHTML = html;
}

function exportGardenFile() {
  const content = JSON.stringify({ layout }, null, 2) + "\n";
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([content], { type: "application/json" }));
  link.download = GARDEN_FILE;
  link.click();
  URL.revokeObjectURL(link.href);
  setStatus("garden-data.json downloadet — erstat den gamle fil for at gøre layoutet permanent");
}

function importGardenFile(file) {
  if (!file) return;
  file.text().then(text => {
    const data = JSON.parse(text);
    layout = normalizeLayout({ ...emptyLayout(), ...(data.layout || {}) });
    saveLayout();
    renderLayout();
  }).catch(() => setStatus("Kunne ikke læse filen — er det en garden-data.json?"));
}

function bedNumber(id) {
  const [c, r] = id.split("-").map(Number);
  return (r - 1) * BED_COLS + c;
}

function openBedDialog(id) {
  editingBed = id;
  document.getElementById("bedDialogTitle").textContent = `Bed ${bedNumber(id)}`;
  const names = cropOptions();
  const current = layout[id] || [];
  current.forEach(c => { if (!names.includes(c)) names.push(c); });
  ["bedCrop1", "bedCrop2", "bedCrop3"].forEach((selId, i) => {
    document.getElementById(selId).innerHTML =
      `<option value="">— Ingen —</option>` +
      names.map(n => `<option value="${esc(n)}"${n === current[i] ? " selected" : ""}>${esc(n)}</option>`).join("");
  });
  document.getElementById("bedDialog").showModal();
}

function saveBed() {
  if (!editingBed) return;
  const picked = ["bedCrop1", "bedCrop2", "bedCrop3"].map(id => document.getElementById(id).value).filter(Boolean);
  layout[editingBed] = [...new Set(picked)];
  document.getElementById("bedDialog").close();
  editingBed = null;
  saveLayout();
  renderLayout();
}

function setupLayout() {
  const grid = document.getElementById("gardenGrid");
  grid.addEventListener("click", e => {
    if (e.target.closest("a")) return; // crop link navigates instead
    const bed = e.target.closest(".bed");
    if (bed) openBedDialog(bed.dataset.bed);
  });
  grid.addEventListener("keydown", e => {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("bed")) {
      e.preventDefault();
      openBedDialog(e.target.dataset.bed);
    }
  });
  document.getElementById("exportLayoutBtn").addEventListener("click", exportGardenFile);
  const importInput = document.getElementById("importLayoutInput");
  document.getElementById("importLayoutBtn").addEventListener("click", () => importInput.click());
  importInput.addEventListener("change", () => { importGardenFile(importInput.files[0]); importInput.value = ""; });
  document.getElementById("bedSave").addEventListener("click", saveBed);
  document.getElementById("bedCancel").addEventListener("click", () => document.getElementById("bedDialog").close());
}


PAGES.layout = { id: "pageLayout", title: "Garden Layout", menuLabel: "Garden Layout", onShow: renderLayout };

document.addEventListener("garden:reset", () => {
  try { localStorage.removeItem(LAYOUT_STORAGE_KEY); } catch (e) {}
  layout = normalizeLayout(baseLayout);
  renderLayout();
});

setupLayout();
renderLayout();
loadGardenFile();
