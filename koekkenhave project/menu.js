// ============================================================
// BURGER MENU + PAGE ROUTING
// Pages register themselves in PAGES (app.js, layout.js).
// Routes: #wheel (default), #layout, #plant=<name> (årshjul "Efter plante")
// ============================================================

document.body.insertAdjacentHTML("afterbegin", `
  <button id="menuBtn" class="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="sideMenu">☰</button>
  <div id="menuBackdrop" class="menu-backdrop" hidden></div>
  <nav id="sideMenu" class="side-menu" aria-label="Hovedmenu">
    ${Object.entries(PAGES).map(([key, p]) =>
      `<a href="#${key}" class="menu-item" data-page="${key}">${esc(p.menuLabel)}</a>`).join("")}
  </nav>`);

function showPage(name) {
  if (!PAGES[name]) name = "wheel";
  Object.entries(PAGES).forEach(([key, p]) =>
    document.getElementById(p.id).classList.toggle("active", key === name));
  document.getElementById("pageTitle").textContent = PAGES[name].title;
  document.querySelectorAll(".menu-item").forEach(a =>
    a.classList.toggle("active", a.dataset.page === name));
  if (PAGES[name].onShow) PAGES[name].onShow();
}


function setMenuOpen(open) {
  document.getElementById("sideMenu").classList.toggle("open", open);
  document.getElementById("menuBackdrop").hidden = !open;
  document.getElementById("menuBtn").setAttribute("aria-expanded", String(open));
}

function setupMenu() {
  document.getElementById("menuBtn").addEventListener("click", () =>
    setMenuOpen(!document.getElementById("sideMenu").classList.contains("open")));
  document.getElementById("menuBackdrop").addEventListener("click", () => setMenuOpen(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenuOpen(false); });
  document.querySelectorAll(".menu-item").forEach(a =>
    a.addEventListener("click", () => setMenuOpen(false)));
  window.addEventListener("hashchange", routeFromHash);
}

// #wheel (default), #layout, or #plant=<name> (årshjul, "Efter plante")
function routeFromHash() {
  const hash = location.hash.slice(1);
  if (hash.startsWith("plant=")) {
    const name = decodeURIComponent(hash.slice(6));
    if (PLANTS.some(p => p.name === name)) {
      currentPlant = "profile:" + name;
      renderPlantPicker();
      renderPlant();
    }
    showPage("wheel");
    showTab("plantView");
    return;
  }
  showPage(hash === "layout" ? "layout" : "wheel");
}

setupMenu();
routeFromHash();
