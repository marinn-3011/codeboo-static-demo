const $ = (id) => document.getElementById(id);
const LEVEL_TITLE = { 1: "Wisp", 2: "Little ghost", 3: "Haunting", 4: "Specter", 5: "Phantom" };
const URGENCY = { 1: "Whenever", 2: "Tidy up", 3: "Plan it", 4: "Fix soon", 5: "Fix today" };
const SIZE = { 1: 62, 2: 70, 3: 80, 4: 92, 5: 106 };

const NAMES = ["Balthazar", "Barnaby", "Casper", "Grimm", "Lucius", "Mortimer", "Onyx", "Poe", "Salem", "Silas", "Thorne", "Vlad", "Waverly", "Zephyr", "Beatrice", "Elvira", "Hazel", "Lenore", "Lilith", "Luna", "Minerva", "Ophelia", "Raven", "Sabrina", "Winifred", "Zelda", "Boo", "Spooky", "Pip", "Wisp", "Shadow", "Ash", "Ember", "Frost"];

let ghosts = [];

function ghostSVG(level, size) {
  const body = "M15 110 L15 50 C15 22 32 8 50 8 C68 8 85 22 85 50 L85 110 ";
  const bottoms = {
    1: "Q76.25 122 67.5 110 Q58.75 98 50 110 Q41.25 122 32.5 110 Q23.75 98 15 110 Z",
    2: "Q76.25 122 67.5 110 Q58.75 98 50 110 Q41.25 122 32.5 110 Q23.75 98 15 110 Z",
    3: "L85 112 Q76 126 67 108 Q58 94 50 112 Q42 128 33 108 Q24 94 15 112 Z",
    4: "L85 112 L77 100 L70 118 L62 100 L54 120 L46 100 L38 118 L30 100 L23 116 L15 100 Z",
    5: "L85 112 L78 98 L72 122 L64 100 L56 124 L48 100 L40 122 L32 100 L24 120 L17 98 Z",
  };
  const ink = level >= 4 ? "#0a1122" : "#1a2542";
  let eyes = "", mouth = "", extra = "";

  if (level === 1) {
    eyes = `<ellipse cx="38" cy="50" rx="5.5" ry="7" fill="${ink}"/><ellipse cx="62" cy="50" rx="5.5" ry="7" fill="${ink}"/><circle cx="36.2" cy="47" r="1.9" fill="#fff"/><circle cx="60.2" cy="47" r="1.9" fill="#fff"/>`;
    mouth = `<path d="M44 65 Q50 71 56 65" fill="none" stroke="${ink}" stroke-width="2.2" stroke-linecap="round"/>`;
  } else if (level === 2) {
    eyes = `<ellipse cx="38" cy="50" rx="5.2" ry="6.2" fill="${ink}"/><ellipse cx="62" cy="50" rx="5.2" ry="6.2" fill="${ink}"/><circle cx="36.4" cy="47.6" r="1.6" fill="#fff"/><circle cx="60.4" cy="47.6" r="1.6" fill="#fff"/>`;
    mouth = `<path d="M43 64 Q50 77 57 64 Z" fill="${ink}"/>`;
  } else if (level === 3) {
    eyes = `<ellipse cx="38" cy="52" rx="5" ry="4" fill="#141d33"/><ellipse cx="62" cy="52" rx="5" ry="4" fill="#141d33"/><path d="M32 49 H44 M56 49 H68" stroke="#141d33" stroke-width="2.4" stroke-linecap="round"/>`;
    mouth = `<path d="M43 69 Q47 66 50 69 Q53 72 57 69" fill="none" stroke="#141d33" stroke-width="2.2" stroke-linecap="round"/>`;
  } else if (level === 4) {
    eyes = `<path d="M31 45 Q38 50 45 54 Q43 60 36 59 Q30 57 31 45 Z" fill="${ink}"/><path d="M69 45 Q62 50 55 54 Q57 60 64 59 Q70 57 69 45 Z" fill="${ink}"/><circle cx="38" cy="55" r="2.3" fill="#ffb454"/><circle cx="62" cy="55" r="2.3" fill="#ffb454"/>`;
    mouth = `<path d="M38 68 L43 63 L47 69 L50 63 L53 69 L57 63 L62 68" fill="none" stroke="${ink}" stroke-width="2.4" stroke-linejoin="round"/>`;
  } else {
    eyes = `<ellipse cx="37" cy="52" rx="7.5" ry="10" fill="#060914"/><ellipse cx="63" cy="52" rx="7.5" ry="10" fill="#060914"/><circle cx="37" cy="53" r="3.3" fill="#ff5d7a"/><circle cx="63" cy="53" r="3.3" fill="#ff5d7a"/><path d="M28 37 L45 44 M72 37 L55 44" stroke="#060914" stroke-width="2.6" stroke-linecap="round"/>`;
    mouth = `<path d="M34 64 Q50 94 66 64 Q50 70 34 64 Z" fill="#060914"/><path d="M38 66 L41 71 L44 67.5 L47 72 L50 68 L53 72 L56 67.5 L59 71 L62 66 Z" fill="#fff"/>`;
  }

  const w = size || SIZE[level];
  return `<svg viewBox="-10 -6 120 136" width="${w}" height="${Math.round(w * 136 / 120)}" aria-hidden="true" focusable="false">
    <ellipse cx="50" cy="62" rx="54" ry="62" fill="url(#au${level})"/>
    <path d="${body}${bottoms[level]}" fill="url(#gh${level})" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-linejoin="round"/>
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

const CAT = { secret: "Leaked secret", danger: "Risky code", weak: "Weak spot", leak: "Possible leak", sloppy: "Quiet failure", todo: "Forgotten promise" };
const EXT = {};
Object.entries({ js: "js jsx ts tsx mjs cjs vue svelte", py: "py", rb: "rb", php: "php", java: "java kt scala", go: "go", c: "c h cpp cc hpp cs", rs: "rs", sh: "sh bash", web: "html htm", swift: "swift" })
  .forEach(([l, s]) => s.split(" ").forEach((e) => (EXT[e] = l)));
const SKIP_DIR = /(^|\/)(node_modules|dist|build|\.git|vendor|third_party|bower_components|coverage|__pycache__|\.next|\.venv|venv|site-packages)\//;
const SKIP_FILE = /\.min\.|\.d\.ts$|\.map$|\.bundle\.|-lock\.|\.generated\./;
const TEST_PATH = /(^|\/)(tests?|__tests__|specs?|examples?|docs?|fixtures?|mocks?|samples?|demo|e2e)\/|\.(test|spec)\.\w+$|_test\.\w+$|(^|\/)test_[^/]*$/;
const DECOY = /example|changeme|placeholder|your[_-]?(key|token|secret|pass)|x{4,}|dummy|sample|test|fake|redacted|<.*>|\$\{|\{\{|process\.env|os\.environ|getenv|todo/i;
const TODO = /(?:^|\s)(?:\/\/+|#+|\/\*+|\*|--|<!--)\s*@?(TODO|FIXME|HACK|XXX|BUG)\b(?:\([^)]*\))?[:\s-]*(.*)$/;
const MAX_FILES = 500, MAX_SHOWN = 60;

function entropy(s) { const f = {}; for (const c of s) f[c] = (f[c] || 0) + 1; return -Object.values(f).reduce((a, n) => a + (n / s.length) * Math.log2(n / s.length), 0); }
function looksSecret(v) { return !DECOY.test(v) && entropy(v) >= 3 && (/\d/.test(v) || /[^\w]/.test(v)) && /[a-z]/i.test(v) && !/^[\w.\-/]+\.(js|ts|py|json|txt|md)$/.test(v); }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function hide(line, v) { return line.replace(v, v.slice(0, 4) + "••••"); }
const SQLBAD = "(?:f[\"'][^\"']*\\{|`[^`]*\\$\\{|[\"'][^\"']*[\"']\\s*(?:\\+\\s*\\w|%\\s*[\\w(])|[\"'][^\"']*[\"']\\.format\\()";
const KEYFIX = "Revoke it now, replace it, and load secrets from environment variables or a secret manager.";

// Line rules. any:1 = also checked inside comments. langs omitted = every language. absent = only flag if the file never contains this.
const R = [
  { id: "pk", cat: "secret", sev: 5, any: 1, rx: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY(?: BLOCK)?-----/, plain: "A private key is pasted into the code.", fix: KEYFIX },
  { id: "aws", cat: "secret", sev: 5, any: 1, rx: /\b((?:AKIA|ASIA)[0-9A-Z]{16})\b/, plain: "An AWS access key ID is written in the code.", fix: KEYFIX },
  { id: "gh", cat: "secret", sev: 5, any: 1, rx: /\b(gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{50,})\b/, plain: "A GitHub token is written in the code.", fix: KEYFIX },
  { id: "svc", cat: "secret", sev: 5, any: 1, rx: /\b(xox[baprs]-[A-Za-z0-9-]{10,}|[sr]k_live_[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{35})\b/, plain: "A Slack, Stripe or Google key is written in the code.", fix: KEYFIX },
  { id: "pw", cat: "secret", sev: 3, any: 1, rx: /(?:pass(?:word|wd)?|pwd|secret|api[_-]?key|auth[_-]?token|access[_-]?token|private[_-]?key)["']?\s*[:=]\s*["']([^"'\s]{8,})["']/i, ok: (m) => looksSecret(m[1]), plain: "A password or key looks hard-coded.", fix: KEYFIX },
  { id: "eval", cat: "danger", sev: 4, langs: ["js", "py", "php", "rb"], rx: /(?<![\w.$])eval\s*\(\s*(?=\S)(?!["'`][^"'`]*["'`]\s*\))/, plain: "Runs text as code, so attacker-controlled text could take over the app.", fix: "Use a real parser such as JSON.parse or ast.literal_eval." },
  { id: "newfn", cat: "danger", sev: 4, langs: ["js"], rx: /\bnew Function\s*\(/, plain: "Builds code from text at runtime, which is eval in disguise.", fix: "Replace it with a normal function or a lookup table." },
  { id: "pyexec", cat: "danger", sev: 4, langs: ["py"], rx: /(?<![\w.])exec\s*\(\s*(?=\S)(?!["'][^"']*["']\s*\))/, plain: "Runs text as Python code.", fix: "Avoid exec; call functions directly." },
  { id: "shell", cat: "danger", sev: 4, langs: ["py", "js", "php", "go"], rx: /\bos\.(?:system|popen)\s*\(|\bsubprocess\.\w+\([^)]*shell\s*=\s*True|\bchild_process\.exec(?:Sync)?\s*\(|(?<![\w.])execSync\s*\(|\b(?:shell_exec|passthru|proc_open)\s*\(|exec\.Command\(\s*"(?:sh|bash)"\s*,\s*"-c"/, plain: "Runs a command through the shell, so odd characters in the input can run extra commands.", fix: "Pass the command and its arguments as a list (spawn, execFile, subprocess without shell)." },
  { id: "pickle", cat: "danger", sev: 4, langs: ["py"], rx: /\b(?:pickle|cPickle|marshal|dill)\.loads?\s*\(|\byaml\.(?:unsafe_load|load\s*\((?![^)]*(?:Safe|Base)Loader))/, plain: "Loads saved data in a way that can run code hidden inside it.", fix: "Use json, or yaml.safe_load." },
  { id: "html", cat: "danger", sev: 3, langs: ["js", "web"], rx: /\.(?:innerHTML|outerHTML)\s*\+?=\s*(?=\S)(?!["'`][^"'`$]*["'`]\s*;?\s*$)|\bdocument\.write(?:ln)?\s*\(|dangerouslySetInnerHTML/, plain: "Puts text into the page as HTML, which allows script injection if it comes from users.", fix: "Use textContent, or sanitize the HTML first." },
  { id: "sql", cat: "danger", sev: 4, langs: ["py", "js", "java", "php", "rb", "go"], rx: new RegExp("\\.(?:execute|executemany|query|raw|exec)\\s*\\(\\s*" + SQLBAD + "|\\bmysqli?_query\\s*\\([^,]*,\\s*[\"'][^\"']*[\"']\\s*\\.\\s*\\$"), plain: "Builds a database question by gluing text together, which allows SQL injection.", fix: "Use placeholders (parameterized queries)." },
  { id: "jwt", cat: "weak", sev: 4, rx: /verify_signature["']?\s*[:=]\s*False|algorithms?\s*[:=]\s*\[?\s*["']none["']/i, plain: "Login tokens are accepted without checking their signature.", fix: "Always verify signatures and pin the allowed algorithm." },
  { id: "tls", cat: "weak", sev: 3, rx: /rejectUnauthorized\s*:\s*false|\bverify\s*=\s*False|InsecureSkipVerify\s*:\s*true|NODE_TLS_REJECT_UNAUTHORIZED["']?\s*[\]=:]+\s*["']?0|CURLOPT_SSL_VERIFYPEER\s*,\s*(?:false|0)/, plain: "Certificate checking is switched off, so connections can be intercepted.", fix: "Turn verification back on; trust a custom CA if you need to." },
  { id: "hash", cat: "weak", sev: 2, rx: /createHash\(\s*["'](?:md5|sha1)["']|hashlib\.(?:md5|sha1)\s*\(|MessageDigest\.getInstance\(\s*"(?:MD5|SHA-?1)"/i, plain: "Uses an old hash. Fine for checksums, unsafe for passwords or signatures.", fix: "Use SHA-256, or bcrypt/argon2 for passwords." },
  { id: "debug", cat: "weak", sev: 3, langs: ["py"], rx: /\.run\([^)]*debug\s*=\s*True|^\s*DEBUG\s*=\s*True\b/, plain: "Debug mode is on, which can expose internals to visitors.", fix: "Read it from an environment variable and keep it off in production." },
  { id: "cors", cat: "weak", sev: 2, rx: /Access-Control-Allow-Origin["'\s:,=\]]+\*|\bcors\(\s*\{[^}]*origin\s*:\s*["']\*["']|allow_origins\s*=\s*\[\s*["']\*["']/i, plain: "Any website may read this server's responses.", fix: "List the specific origins you trust." },
  { id: "rand", cat: "weak", sev: 3, langs: ["js", "py"], rx: /Math\.random\s*\(|\brandom\.(?:random|randint|choice|choices)\s*\(/, ok: (m, l) => /token|secret|passw|session|nonce|salt|\bkey\b/i.test(l), plain: "Uses predictable random numbers for something security-related.", fix: "Use crypto.getRandomValues or Python's secrets module." },
  { id: "chmod", cat: "weak", sev: 2, langs: ["py", "sh", "js", "go"], rx: /\bchmod\s+(?:-R\s+)?0?777\b|\bchmod\([^)]*0o?777/, plain: "Gives everyone full access to a file or folder.", fix: "Grant only the permissions that are needed (for example 640 or 750)." },
  { id: "fopen", cat: "leak", sev: 2, langs: ["py"], rx: /^\s*\w[\w.]*\s*=\s*open\(/, absent: /\.close\s*\(/, plain: "A file is opened here and this file never closes anything.", fix: "Use `with open(...) as f:` so it always closes." },
  { id: "cfile", cat: "leak", sev: 2, langs: ["c"], rx: /\bfopen\s*\(/, absent: /\bfclose\s*\(/, plain: "A file is opened here and nothing in this file closes one.", fix: "Call fclose on every path out." },
  { id: "malloc", cat: "leak", sev: 2, langs: ["c"], rx: /\b(?:malloc|calloc)\s*\(/, absent: /\bfree\s*\(/, plain: "Memory is allocated here and this file never frees any.", fix: "Free it when done, on every path." },
  { id: "timer", cat: "leak", sev: 1, langs: ["js"], rx: /\bsetInterval\s*\(/, absent: /\bclearInterval\s*\(/, plain: "A repeating timer is started and this file never stops one.", fix: "Keep the id and call clearInterval when finished." },
];

// Multi-line rules run over the whole file.
const ML = [
  { id: "catch", cat: "sloppy", langs: ["js", "java", "c", "php", "rs", "swift"], rx: /\bcatch\s*(?:\([^)]*\))?\s*\{\s*(?:(?:\/\/[^\n]*|\/\*[\s\S]*?\*\/)\s*)*\}|\.catch\(\s*(?:\(\s*\w*\s*\)|\w+)?\s*=>\s*\{\s*\}\s*\)/g, lvl: (m) => (/\/[/*]/.test(m[0]) ? 1 : 2), plain: "An error is caught and thrown away, so failures happen silently.", fix: "Log it, handle it, or explain in a comment why ignoring it is safe." },
  { id: "bare", cat: "sloppy", langs: ["py"], rx: /^[ \t]*except\s*:/gm, lvl: () => 2, plain: "A bare `except:` hides every error, even Ctrl-C.", fix: "Catch the specific exception you expect." },
  { id: "pass", cat: "sloppy", langs: ["py"], rx: /^[ \t]*except(?:\s+(?:Exception|BaseException))?(?:\s+as\s+\w+)?\s*:[ \t]*(?:#.*)?\n[ \t]*(?:pass|\.\.\.)\b/gm, lvl: () => 3, plain: "Every error is caught and silently ignored.", fix: "Catch the specific exception and log or handle it." },
  { id: "goerr", cat: "sloppy", langs: ["go"], rx: /if\s+err\s*!=\s*nil\s*\{\s*\}/g, lvl: () => 3, plain: "An error is checked and then ignored.", fix: "Return it or log it." },
];
const lineNo = (c, i) => { let n = 1; for (let k = 0; k < i; k++) if (c.charCodeAt(k) === 10) n++; return n; };

function scanFile(path, content) {
  const lang = EXT[path.split(".").pop().toLowerCase()];
  if (!lang) return [];
  const lines = content.split("\n"), out = [], test = TEST_PATH.test(path);
  const add = (cat, lvl, line, text, plain, fix, rule) => out.push({ cat, rule, level: test ? Math.max(1, lvl - 2) : lvl, file: path, line, snippet: text.trim().slice(0, 220), plain, fix, test });
  let inBlock = false;
  lines.forEach((raw, i) => {
    const t = raw.trim();
    if (!t || raw.length > 400) return;
    let com = inBlock || /^(?:\/\/|#|\*(?:\s|\/|$)|--|<!--)/.test(t);
    if (inBlock) { if (t.includes("*/")) inBlock = false; }
    else if (t.startsWith("/*")) { com = true; if (!t.includes("*/")) inBlock = true; }
    const m = raw.match(TODO);
    if (m) {
      const w = m[1], txt = m[2].replace(/\*\/|-->/g, "").trim();
      let lv = /BUG|FIXME/.test(w) ? 3 : /HACK|XXX/.test(w) ? 2 : 1;
      if (/secur|passw|auth|vulnerab|inject|leak|crypt/i.test(txt)) lv = Math.max(lv, 4);
      add("todo", lv, i + 1, raw, txt ? `A note-to-self nobody came back to: “${txt.slice(0, 120)}”` : `A ${w} marker with no explanation.`, "Do it, delete it, or turn it into a tracked issue.", "todo");
    }
    for (const r of R) {
      if ((r.langs && !r.langs.includes(lang)) || (com && !r.any)) continue;
      const mm = raw.match(r.rx);
      if (!mm || (r.ok && !r.ok(mm, raw)) || (r.absent && r.absent.test(content))) continue;
      if (r.cat === "secret" && r.id !== "pw" && DECOY.test(mm[1] || mm[0])) continue;
      add(r.cat, r.sev, i + 1, r.cat === "secret" && mm[1] ? hide(raw, mm[1]) : raw, r.plain, r.fix, r.id);
    }
  });
  for (const r of ML) {
    if (!r.langs.includes(lang)) continue;
    r.rx.lastIndex = 0;
    let m;
    while ((m = r.rx.exec(content))) { const ln = lineNo(content, m.index); add(r.cat, r.lvl(m), ln, lines[ln - 1] || "", r.plain, r.fix, r.id); if (m[0] === "") r.rx.lastIndex++; }
  }
  return out;
}

function finalize(all) {
  const seen = new Set(), per = {}, res = [];
  all.sort((a, b) => b.level - a.level);
  for (const f of all) {
    const k = f.file + ":" + f.line + ":" + f.cat;
    if (seen.has(k)) continue;
    seen.add(k);
    const pk = f.file + "|" + f.rule, cap = f.cat === "todo" ? 5 : 3;
    per[pk] = (per[pk] || 0) + 1;
    if (per[pk] > cap && f.cat !== "secret") continue;
    res.push(f);
  }
  return res;
}

async function gh(url, tok) {
  const r = await fetch(url, { headers: { Accept: "application/vnd.github+json", ...(tok ? { Authorization: "Bearer " + tok } : {}) } });
  if (r.status === 403 || r.status === 429) throw new Error("GitHub's anonymous rate limit was reached. Wait a while, or add a token under “Rate-limited?”.");
  if (r.status === 404) throw new Error("Repository not found. Check that it is public and the link is right.");
  if (!r.ok) throw new Error("GitHub answered with status " + r.status + ".");
  return r.json();
}

async function processRepository(owner, repo, ref, tok) {
  $("busy").hidden = false; $("error").hidden = true;
  $("busy-text").textContent = "Looking up the repository…";
  const root = document.documentElement.style;
  ["--moon-cover","--fog-opacity","--sky-darkness","--in","--web"].forEach((v) => root.setProperty(v, 0)); growWebs(0);
  try {
    const base = `https://api.github.com/repos/${owner}/${repo}`;
    if (!ref) ref = (await gh(base, tok)).default_branch;
    $("busy-text").textContent = "Reading the file tree…";
    const tree = await gh(`${base}/git/trees/${encodeURI(ref)}?recursive=1`, tok);
    let files = tree.tree.filter((f) => f.type === "blob" && EXT[f.path.split(".").pop().toLowerCase()] && !SKIP_DIR.test("/" + f.path) && !SKIP_FILE.test(f.path) && (f.size || 0) <= 300000);
    files.sort((a, b) => TEST_PATH.test(a.path) - TEST_PATH.test(b.path));
    const notes = [];
    if (files.length > MAX_FILES) { notes.push(`only the first ${MAX_FILES} of ${files.length} code files were searched`); files = files.slice(0, MAX_FILES); }
    if (tree.truncated) notes.push("GitHub returned a partial file list for this huge repo");
    const found = []; let done = 0;
    for (let i = 0; i < files.length; i += 10) {
      await Promise.all(files.slice(i, i + 10).map(async (f) => {
        try {
          const r = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${encodeURI(ref)}/${f.path.split("/").map(encodeURIComponent).join("/")}`);
          if (r.ok) found.push(...scanFile(f.path, await r.text()));
        } catch (e) { /* skip unreadable file */ }
        $("busy-text").textContent = `Searching ${++done} of ${files.length} files…`;
      }));
    }
    ghosts = finalize(found).map((f, i) => ({ ...f, id: "g" + i, name: NAMES[Math.floor(Math.random() * NAMES.length)] }));
    renderResults(`${owner}/${repo}`, done, notes);
  } catch (err) {
    $("error").textContent = err.message; $("error").hidden = false;
  } finally {
    $("busy").hidden = true; $("go").disabled = false;
  }
}

function renderResults(name, files, notes) {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  ghosts.forEach((g) => counts[g.level]++);
  const score = counts[1] * 2 + counts[2] * 5 + counts[3] * 15 + counts[4] * 40 + counts[5] * 85, ratio = Math.min(score / 100, 1);
  setTimeout(() => {   // calm if nothing was found; otherwise the night closes in with severity
    const s = document.documentElement.style, on = ghosts.length > 0;
    s.setProperty("--fog-opacity", on ? 0.3 + ratio * 0.7 : 0); s.setProperty("--in", on ? 0.4 + ratio * 0.6 : 0);
    s.setProperty("--moon-cover", ratio * 96); s.setProperty("--sky-darkness", ratio * 0.7);
    const wv = on ? 0.15 + ratio * 0.85 : 0; s.setProperty("--web", wv); growWebs(wv);
  }, 100);
  $("s-title").textContent = counts[5] ? "Properly cursed" : counts[4] ? "Seriously haunted" : ghosts.length ? "A restless graveyard" : "A peaceful graveyard";
  $("s-repo").textContent = `${name} · ${files} code files searched` + (notes.length ? ` (${notes.join("; ")})` : "") + ".";
  const row = $("s-counts"); row.replaceChildren();
  [5, 4, 3, 2, 1].forEach((lv) => { const d = document.createElement("div"); d.className = "count"; d.innerHTML = `${ghostSVG(lv, 34)}<b>${counts[lv]}</b><span>${LEVEL_TITLE[lv]}</span>`; row.appendChild(d); });
  $("summary").hidden = false;
  renderList();
}

function renderList() {
  const list = ghosts.filter((g) => !$("scary-only").checked || g.level >= 4), shown = list.slice(0, MAX_SHOWN), holder = $("ghosts");
  holder.replaceChildren();
  $("toolbar-text").textContent = list.length ? `Showing ${shown.length} of ${list.length} ghosts, scariest first` : "No ghosts here. Suspiciously quiet.";
  shown.forEach((g, i) => {
    const el = document.createElement("article");
    el.className = `card l${g.level}`;
    el.innerHTML = `<div class="figure" data-cat="${g.cat}">${ghostSVG(g.level)}</div><div><div class="tags"><span class="level">${g.name}, the ${LEVEL_TITLE[g.level].toLowerCase()}</span><span class="kind">${CAT[g.cat]}</span><span class="urgency">${URGENCY[g.level]}</span></div><p class="where">${esc(g.file)} : L${g.line}${g.test ? " (test or example code)" : ""}</p><p class="plain">${esc(g.plain)}</p><p class="fix"><b>Fix:</b> ${esc(g.fix)}</p><details><summary>See code</summary><pre>${esc(g.snippet)}</pre></details></div>`;
    const d = Math.min(i, 12) * 0.4;
    el.style.animationDelay = 0.8 + d + "s"; el.firstChild.style.animationDelay = 1.4 + d + "s";
    holder.appendChild(el);
  });
  $("list-wrap").hidden = false;
}

function buildWebs() {
  const spider = (s) => `<g class="spider"><path d="M${40 * s} -90V30" stroke="#cfe0ff" stroke-width=".6"/><path d="M${35 * s} 34l${-8 * s} -5M${35 * s} 37l${-9 * s} 1M${45 * s} 34l${8 * s} -5M${45 * s} 37l${9 * s} 1" stroke="#9db6dc" stroke-width="1"/><circle cx="${40 * s}" cy="36" r="5" fill="#1b2a4d" stroke="#9db6dc" stroke-width=".6"/></g>`;
  const strands = (s) => {   // irregular spokes and sagging rings, different every time; s = -1 mirrors the web for the right corner
    const P = (r, t) => [s * r * Math.cos(t), r * Math.sin(t)].map((n) => n.toFixed(1)).join(" ");
    const R = 170, A = [0, 1, 2, 3, 4, 5].map((i) => (i * Math.PI) / 10 + (i % 5 ? (Math.random() - 0.5) * 0.09 : 0));
    let h = A.map((t, i) => `<path class="sp" pathLength="1" style="--i:${i}" d="M0 0L${P(R * (0.96 + Math.random() * 0.06), t)}"/>`).join("");
    for (let r = 1; r <= 6; r++) {
      let d = `M${P(((R * r) / 6) * (0.94 + Math.random() * 0.08), A[0])}`;
      for (let i = 0; i < 5; i++) { const rr = ((R * r) / 6) * (0.94 + Math.random() * 0.08); d += `Q${P(rr * (0.72 + Math.random() * 0.12), (A[i] + A[i + 1]) / 2)} ${P(rr, A[i + 1])}`; }
      h += `<path class="rg" pathLength="1" data-r="${r}" style="--r:${r}" d="${d}"/>`;
    }
    return h + spider(s);
  };
  const web = (cls, s) => `<div class="web ${cls}"><div class="fl"><svg viewBox="${s < 0 ? -170 : 0} 0 170 190">${strands(s)}</svg></div></div>`;
  $("webs").innerHTML = web("tl", 1) + web("tr", -1);
}
function growWebs(w) {   // the web itself is sized by --web in CSS; this only toggles the spider
  $("webs").classList.toggle("on", w > 0);
}
try { buildWebs(); } catch (e) {}

function startHunt() {
  const src = $("source").value.trim();
  const m = src.match(/github\.com\/([^/\s]+)\/([^/\s?#]+)(?:\/tree\/([^?#\s]+))?/) || src.match(/^([\w.-]+)\/([\w.-]+)$/);
  if (!m) { $("error").textContent = "Paste a public GitHub link such as https://github.com/owner/repo"; $("error").hidden = false; return; }
  $("go").disabled = true;
  processRepository(m[1], m[2].replace(/\.git$/, ""), m[3], $("token").value.trim());
}
$("go").addEventListener("click", startHunt);
$("source").addEventListener("keydown", (e) => { if (e.key === "Enter") startHunt(); });
$("scary-only").addEventListener("change", renderList);
