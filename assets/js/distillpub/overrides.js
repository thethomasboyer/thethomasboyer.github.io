// Robust dark-theme fixes for Distill footnotes and citations, including nested shadow DOM and late-added nodes.
(function () {
  const panelCSS = `
    .panel, #panel, .tooltip, #tooltip, .popover, .container, .content {
      background-color: var(--global-bg-color) !important;
      color: var(--global-text-color) !important;
      border-color: var(--global-divider-color) !important;
    }
    a { color: var(--global-text-color) !important; text-decoration: none; }
    a:hover { color: var(--global-theme-color) !important; }
  `;

  function injectStyle(root) {
    if (!root) return;
    // Ensure a style tag we own exists; avoid relying on existing <style>.sheet which may be missing/not ready.
    let tag = root.querySelector("style[data-dfix]");
    if (!tag) {
      tag = document.createElement("style");
      tag.setAttribute("data-dfix", "");
      root.appendChild(tag);
    }
    // Append our rules (idempotent enough for our use; repeated runs will duplicate once per session at most).
    if (!tag.textContent || !tag.textContent.includes(".panel")) {
      tag.textContent = (tag.textContent || "") + panelCSS;
    }
  }

  function patchFootnote(el) {
    if (!el || !el.shadowRoot) return;
    // Colorize the inline marker if present.
    try {
      const marker = el.shadowRoot.querySelector("sup > span, div > span");
      if (marker) marker.setAttribute("style", "color: var(--global-theme-color);");
    } catch {}

    // Style inside the footnote shadow root.
    injectStyle(el.shadowRoot);

    // Style the nested d-hover-box when available.
    const hb = el.shadowRoot.querySelector("d-hover-box");
    if (hb && hb.shadowRoot) injectStyle(hb.shadowRoot);

    // When the hover box is created/opened later, re-apply styles.
    const ensureHoverPatched = () => {
      const hb2 = el.shadowRoot && el.shadowRoot.querySelector("d-hover-box");
      if (hb2 && hb2.shadowRoot) injectStyle(hb2.shadowRoot);
    };
    el.addEventListener("mouseenter", ensureHoverPatched, { passive: true });
    el.addEventListener("focus", ensureHoverPatched, { passive: true, capture: true });
    el.addEventListener("click", ensureHoverPatched, { passive: true });
  }

  function patchCite(el) {
    if (!el || !el.shadowRoot) return;
    // Colorize inline cite marker.
    try {
      const marker = el.shadowRoot.querySelector("div > span");
      if (marker) marker.setAttribute("style", "color: var(--global-theme-color);");
    } catch {}
    injectStyle(el.shadowRoot);
    const hb = el.shadowRoot.querySelector("d-hover-box");
    if (hb && hb.shadowRoot) injectStyle(hb.shadowRoot);
    const ensureHoverPatched = () => {
      const hb2 = el.shadowRoot && el.shadowRoot.querySelector("d-hover-box");
      if (hb2 && hb2.shadowRoot) injectStyle(hb2.shadowRoot);
    };
    el.addEventListener("mouseenter", ensureHoverPatched, { passive: true });
    el.addEventListener("focus", ensureHoverPatched, { passive: true, capture: true });
    el.addEventListener("click", ensureHoverPatched, { passive: true });
  }

  function patchAllIn(root) {
    (root || document).querySelectorAll("d-footnote").forEach(patchFootnote);
    (root || document).querySelectorAll("d-cite").forEach(patchCite);
  }

  function removeDistillChrome(root) {
    const scope = root || document;
    scope.querySelectorAll("body > distill-footer, body > d-appendix").forEach((el) => el.remove());
  }

  function start() {
    patchAllIn(document);
    removeDistillChrome(document);
    // Observe for late-added nodes (e.g., content hydrated after load)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          if (n.matches && (n.matches("body > distill-footer") || n.matches("body > d-appendix"))) {
            n.remove();
            return;
          }
          if (n.matches && n.matches("d-footnote")) patchFootnote(n);
          if (n.matches && n.matches("d-cite")) patchCite(n);
          if (n.querySelectorAll) {
            removeDistillChrome(n);
            n.querySelectorAll("d-footnote").forEach(patchFootnote);
            n.querySelectorAll("d-cite").forEach(patchCite);
          }
        });
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
