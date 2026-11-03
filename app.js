const $ = (id) => document.getElementById(id);
const LEVEL_TITLE = { 1: "Wisp", 2: "Little ghost", 3: "Haunting", 4: "Specter", 5: "Phantom" };
const URGENCY = { 1: "Whenever", 2: "Tidy up", 3: "Plan it", 4: "Fix soon", 5: "Fix today" };
const SIZE = { 1: 62, 2: 70, 3: 80, 4: 92, 5: 106 };

let ghosts = [];

// Base UI utilities preserved from original Python templating mapping
function ghostSVG(level, size) {
  const body = "M15 110 L15 50 C15 22 32 8 50 8 C68 8 85 22 85 50 L85 110 ";
  const bottoms = {
    1: "Q76.25 122 67.5 110 Q58.75 98 50 110 Q41.25 122 32.5 110 Q23.75 98 15 110 Z",
    2: "Q76.25 122 67.5 110 Q58.75 98 50 110 Q41.25 122 32.5 110 Q23.75 98 15 110 Z",
    3: "L85 112 Q76 126 67 108 Q58 94 50 112 Q42 128 33 108 Q24 94 15 112 Z",
    4: "L85 112 L77 100 L70 118 L62 100 L54 120 L46 100 L38 118 L30 100 L23 116 L15 100 Z",
    5: "L85 112 L78 98 L72 122 L64 100 L56 124 L48 100 L40 122 L32 100 L24 120 L17 98 Z",
  };
  const ink = level >= 4 ? "#1a1030" : "#2b2350";
  let eyes = "", mouth = "", extra = "";

  if (level === 1) {
    eyes = `<ellipse cx="38" cy="50" rx="5.5" ry="7" fill="${ink}"/><ellipse cx="62" cy="50" rx="5.5" ry="7" fill="${ink}"/><circle cx="36.2" cy="47" r="1.9" fill="#fff"/><circle cx="60.2" cy="47" r="1.9" fill="#fff"/>`;
    mouth = `<path d="M44 65 Q50 71 56 65" fill="none" stroke="${ink}" stroke-width="2.2" stroke-linecap="round"/>`;
  } else if (level === 2) {
    eyes = `<ellipse cx="38" cy="50" rx="5.2" ry="6.2" fill="${ink}"/><ellipse cx="62" cy="50" rx="5.2" ry="6.2" fill="${ink}"/><circle cx="36.4" cy="47.6" r="1.6" fill="#fff"/><circle cx="60.4" cy="47.6" r="1.6" fill="#fff"/>`;
    mouth = `<path d="M43 64 Q50 77 57 64 Z" fill="${ink}"/>`;
  } else if (level === 3) {
    eyes = `<ellipse cx="38" cy="52" rx="5" ry="4" fill="#241c45"/><ellipse cx="62" cy="52" rx="5" ry="4" fill="#241c45"/><path d="M32 49 H44 M56 49 H68" stroke="#241c45" stroke-width="2.4" stroke-linecap="round"/>`;
    mouth = `<path d="M43 69 Q47 66 50 69 Q53 72 57 69" fill="none" stroke="#241c45" stroke-width="2.2" stroke-linecap="round"/>`;
  } else if (level === 4) {
    eyes = `<path d="M31 45 Q38 50 45 54 Q43 60 36 59 Q30 57 31 45 Z" fill="${ink}"/><path d="M69 45 Q62 50 55 54 Q57 60 64 59 Q70 57 69 45 Z" fill="${ink}"/><circle cx="38" cy="55" r="2.3" fill="#ffb454"/><circle cx="62" cy="55" r="2.3" fill="#ffb454"/>`;
    mouth = `<path d="M38 68 L43 63 L47 69 L50 63 L53 69 L57 63 L62 68" fill="none" stroke="${ink}" stroke-width="2.4" stroke-linejoin="round"/>`;
  } else {
    eyes = `<ellipse cx="37" cy="52" rx="7.5" ry="10" fill="#12071c"/><ellipse cx="63" cy="52" rx="7.5" ry="10" fill="#12071c"/><circle cx="37" cy="53" r="3.3" fill="#ff5d7a"/><circle cx="63" cy="53" r="3.3" fill="#ff5d7a"/><path d="M28 37 L45 44 M72 37 L55 44" stroke="#12071c" stroke-width="2.6" stroke-linecap="round"/>`;
    mouth = `<path d="M34 64 Q50 94 66 64 Q50 70 34 64 Z" fill="#12071c"/><path d="M38 66 L41 71 L44 67.5 L47 72 L50 68 L53 72 L56 67.5 L59 71 L62 66 Z" fill="#fff"/>`;
  }

  const w = size || SIZE[level];
  return `<svg viewBox="-10 -6 120 136" width="${w}" height="${Math.round(w * 136 / 120)}" aria-hidden="true" focusable="false">
    <ellipse cx="50" cy="62" rx="54" ry="62" fill="url(#au${level})"/>
    <path d="${body}${bottoms[level]}" fill="url(#gh${level})" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" stroke-linejoin="round"/>
    ${eyes}${mouth}${extra}</svg>`;
}

function buildStars() {
  const sky = $("sky");
  const scale = Math.min(1, (innerWidth * innerHeight) / 1400000);
  const colors = ["#ffffff", "#d6d7ff", "#ffe9b8"];
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  [["a", Math.round(70 * scale) + 20, [0, 0.5]], ["b", Math.round(40 * scale) + 12, [0.6, 1.1]]].forEach((cfg) => {
    const el = document.createElement("div");
    el.className = "stars " + cfg[0];
    const shadows = [];
    for (let i = 0; i < cfg[1]; i++) shadows.push(`${(Math.random() * 100).toFixed(2)}vw ${(Math.random() * 100).toFixed(2)}vh 0 ${pick(cfg[2])}px ${pick(colors)}`);
    el.style.boxShadow = shadows.join(",");
    sky.appendChild(el);
  });
}
try { buildStars(); $("hero").innerHTML = ghostSVG(1, 80); } catch (e) {}

// Rules Engine ported from Python to JS, enhanced for higher accuracy
const RULES = [
  { id: "private-key", cat: "secret", sev: 5, rx: /-----BEGIN [A-Z ]*PRIVATE KEY-----/, plain: "A private key is written directly in the code.", fix: "Revoke the key immediately and move it to environment variables." },
  { id: "cloud-token", cat: "secret", sev: 5, rx: /\b(AKIA[0-9A-Z]{16})\b|\b(gh[pousr]_[A-Za-z0-9]{36,})\b/, plain: "A high-risk access token is hardcoded.", fix: "Revoke the token and inject it via secure configuration." },
  { id: "eval", cat: "danger", sev: 4, rx: /(?<![\w.])eval\s*\(/, plain: "Executes dynamic strings as code, leading to code injection risks.", fix: "Use strict parsers (e.g., JSON.parse) instead of eval." },
  { id: "shell", cat: "danger", sev: 4, rx: /\bos\.system\s*\(|\bchild_process\.exec\s*\(/, plain: "Runs commands through the system shell securely.", fix: "Pass arguments as an array avoiding shell interpolation." },
  { id: "sql", cat: "danger", sev: 4, rx: /\.(execute|query)\s*\(\s*(`[^`]*\$\{)/, plain: "Constructs SQL queries using string interpolation.", fix: "Use parameterized queries or prepared statements." },
  { id: "tls-off", cat: "weak", sev: 3, rx: /rejectUnauthorized\s*:\s*false|verify\s*=\s*False/, plain: "TLS certificate validation is disabled.", fix: "Re-enable secure certificate checking." },
  { id: "weak-hash", cat: "weak", sev: 2, rx: /createHash\(\s*["'](md5|sha1)["']/, plain: "Uses obsolete cryptography algorithms.", fix: "Upgrade to modern algorithms like SHA-256." },
  { id: "cors-wildcard", cat: "weak", sev: 3, rx: /Access-Control-Allow-Origin["'\s:,=]+\*/, plain: "Wildcard CORS policy allows any domain to read responses.", fix: "Restrict CORS to explicit, trusted origins." },
  { id: "swallow", cat: "sloppy", sev: 2, rx: /catch\s*\(\s*\w*\s*\)\s*\{\s*\}/, plain: "Errors are swallowed silently.", fix: "Log the error appropriately instead of an empty catch block." },
];

const TODO_RX = /\b(TODO|FIXME|HACK|XXX|BUG)\b:?(.*)/i;
const TODO_HOT = /secur|passw|auth|leak|vulnerab/i;
const IGNORE_DIRS = ["node_modules", "dist", "build", ".git", "vendor"];
const DECOYS = ["EXAMPLE", "CHANGEME", "PLACEHOLDER", "YOUR_KEY", "AKIAIOSFODNN7EXAMPLE"];

function isDecoy(text) { return DECOYS.some(d => text.toUpperCase().includes(d)); }
function escapeHtml(str) { return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

function scanContent(path, content) {
  const findings = [];
  const lines = content.split('\n');
  
  lines.forEach((line, i) => {
    if (line.trim().length === 0 || line.trim().startsWith('//') || line.length > 500) return;

    // TODO check
    const todoMatch = line.match(TODO_RX);
    if (todoMatch) {
      let sev = (todoMatch[1].toUpperCase() === 'BUG') ? 3 : 2;
      if (TODO_HOT.test(line)) sev = 4;
      findings.push({ cat: "todo", level: sev, file: path, line: i + 1, snippet: line.trim(), plain: `Abandoned comment: ${todoMatch[2].trim() || todoMatch[1]}`, fix: "Resolve the tracked technical debt." });
    }

    RULES.forEach(r => {
      if (r.rx.test(line) && !isDecoy(line)) {
        findings.push({ cat: r.cat, level: r.sev, file: path, line: i + 1, snippet: line.trim(), plain: r.plain, fix: r.fix, rule: r.id });
      }
    });
  });
  return findings;
}

async function processRepository(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/zipball`;
  $("busy").hidden = false;
  $("busy-text").textContent = "Fetching repository archive...";
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Repository not found or rate limited.");
    const blob = await response.blob();
    $("busy-text").textContent = "Parsing contents...";
    
    const zip = await JSZip.loadAsync(blob);
    let allFindings = [];
    let fileCount = 0;

    for (const [path, file] of Object.entries(zip.files)) {
      if (file.dir || IGNORE_DIRS.some(d => path.includes(`/${d}/`)) || path.endsWith('.min.js')) continue;
      const content = await file.async("string");
      allFindings.push(...scanContent(path, content));
      fileCount++;
    }

    allFindings.sort((a, b) => b.level - a.level);
    ghosts = allFindings.map((f, i) => ({ ...f, id: `g${i}`, name: `Ghost ${i+1}` }));
    
    renderResults(owner + "/" + repo, fileCount);
  } catch (err) {
    $("error").textContent = err.message;
    $("error").hidden = false;
  } finally {
    $("busy").hidden = true;
    $("go").disabled = false;
  }
}

function renderResults(repoName, files) {
  const counts = { 1:0, 2:0, 3:0, 4:0, 5:0 };
  ghosts.forEach(g => counts[g.level]++);
  
  $("s-title").textContent = counts[5] > 0 ? "Properly cursed" : (counts[4] > 0 ? "Seriously haunted" : "A peaceful graveyard");
  $("s-repo").textContent = `${repoName} · ${files} files searched.`;
  
  const row = $("s-counts");
  row.replaceChildren();
  [5, 4, 3, 2, 1].forEach(level => {
    const div = document.createElement("div"); div.className = "count";
    div.innerHTML = `${ghostSVG(level, 34)}<b>${counts[level]}</b><span>${LEVEL_TITLE[level]}</span>`;
    row.appendChild(div);
  });
  
  $("summary").hidden = false;
  renderList();
}

function renderList() {
  const scaryOnly = $("scary-only").checked;
  const list = ghosts.filter(g => !scaryOnly || g.level >= 4);
  const holder = $("ghosts");
  holder.replaceChildren();
  
  list.forEach((g, i) => {
    const el = document.createElement("article");
    el.className = `card l${g.level}`;
    el.innerHTML = `
      <div class="figure" style="--delay: -${(i % 4)}s; --bob: ${3 + (i % 3)}s">${ghostSVG(g.level)}</div>
      <div>
        <div class="tags"><span class="level">${g.name}, the ${LEVEL_TITLE[g.level].toLowerCase()}</span><span class="urgency">${URGENCY[g.level]}</span></div>
        <p class="where">${escapeHtml(g.file)} : L${g.line}</p>
        <p class="plain">${g.plain}</p>
        <p class="fix"><b>Fix:</b> ${g.fix}</p>
        <details><summary>See code</summary><pre>${escapeHtml(g.snippet)}</pre></details>
      </div>`;
    holder.appendChild(el);
  });
  $("list-wrap").hidden = false;
}

$("go").addEventListener("click", () => {
  const source = $("source").value.trim();
  const match = source.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return $("error").textContent = "Provide a valid GitHub repository URL.", $("error").hidden = false;
  
  $("error").hidden = true;
  $("go").disabled = true;
  processRepository(match[1], match[2].replace('.git', ''));
});

$("scary-only").addEventListener("change", renderList);
