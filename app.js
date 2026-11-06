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

// ======================================================================
//  CodeBoo engine v2
//  1. a small lexer blanks out comments and string contents, so rules only look at real code
//  2. rules run on the whole file (so multi-line statements work) and know about context
//  3. a light taint tracker follows user input into dangerous calls
//  4. structure checks catch things that crash: bad brackets, await outside async, missing imports...
//  5. the results are scored, de-duplicated and grouped so the page stays readable
// ======================================================================
const CAT = { secret: "Leaked secret", danger: "Risky code", weak: "Weak spot", leak: "Possible leak", sloppy: "Quiet failure", todo: "Forgotten promise", broken: "Will break" };
const ANIM = { broken: "danger" };   // which existing ghost animation a new category borrows
const LANG_EXT = { js: "js jsx ts tsx mjs cjs mts cts vue svelte", py: "py pyw", rb: "rb", php: "php", java: "java", kt: "kt kts scala groovy", go: "go", c: "c h cpp cc cxx hpp hxx", cs: "cs", rs: "rs", sh: "sh bash zsh", web: "html htm", swift: "swift", cfg: "yml yaml toml ini cfg conf properties tf tfvars env json" };
const EXT = {};
Object.entries(LANG_EXT).forEach(([l, s]) => s.split(" ").forEach((e) => (EXT[e] = l)));
const SPECIAL = /(^|\/)(dockerfile[\w.-]*|\.env(\.[\w.-]+)?|\.npmrc|\.pypirc|\.htpasswd|id_(?:rsa|dsa|ecdsa|ed25519)|[\w.-]+\.(?:pem|key|p12|pfx|jks|keystore|ppk))$/i;
function langOf(path) {
  if (SPECIAL.test(path)) return "cfg";
  const base = path.split("/").pop().toLowerCase(), dot = base.lastIndexOf(".");
  return dot >= 0 ? EXT[base.slice(dot + 1)] : undefined;
}
const SKIP_DIR = /(^|\/)(node_modules|dist|build|out|target|obj|\.git|vendors?|third[_-]?party|bower_components|coverage|__pycache__|\.next|\.nuxt|\.svelte-kit|\.venv|venv|site-packages|Pods|\.terraform|\.tox|\.gradle|\.idea|\.vscode|\.cache|generated)\//;
const SKIP_FILE = /\.min\.|\.d\.ts$|\.map$|\.bundle\.|\.chunk\.|-lock\.|\.lock$|package-lock\.json$|(^|\/)(composer|tsconfig[\w.-]*|jsconfig|angular|nx|lerna|renovate|manifest|\.eslintrc[\w.]*|\.prettierrc[\w.]*|\.babelrc)\.json$|\.generated\.|\.pb\.go$|_pb2\.py$|(^|\/)(jquery[\w.-]*|bootstrap[\w.-]*|lodash[\w.-]*|moment[\w.-]*|angular[\w.-]*|three[\w.-]*|d3[\w.-]*|react(?:-dom)?[\w.-]*|vue[\w.-]*)\.js$|(^|\/)(locales?|i18n|translations?|lang)\/[^/]*\.json$/i;
const TEST_PATH = /(^|\/)(tests?|__tests__|specs?|examples?|docs?|fixtures?|mocks?|__mocks__|samples?|demos?|e2e|cypress|playground|testdata|testing|stories|storybook)\/|\.(test|spec|stories)\.\w+$|_test\.\w+$|(^|\/)test_[^/]*$|(^|\/)conftest\.py$/i;
const SEC_PATH = /auth|login|passw|session|token|secret|crypt|admin|payment|billing|upload|server|route|controller|handler|api|db|sql|query|middleware|config|settings|security|user|account|main|index|app/i;
const DECOY = /example|changeme|placeholder|your[_-]?(key|token|secret|pass)|x{4,}|dummy|sample|test|fake|redacted|<.*>|\$\{|\{\{|process\.env|os\.environ|getenv|todo|\*{3,}|\.{3,}|insert[_-]|replace[_-]?me/i;
const WEAKV = /^(?:pass(?:word|wd)?|pwd|secret|token|changeme|admin|root|user(?:name)?|test|foo|bar|default|null|none|true|false|string|\*+|x+|\.+|\w{0,3})$/i;
const MAX_FILES = 3000, MAX_SHOWN = 40, TIME_BUDGET = 150000, FETCH_CONC = 24;

// ---------- small helpers ----------
function entropy(s) { const f = {}; for (const c of s) f[c] = (f[c] || 0) + 1; return -Object.values(f).reduce((a, n) => a + (n / s.length) * Math.log2(n / s.length), 0); }
function looksSecret(v) { return !DECOY.test(v) && !WEAKV.test(v) && entropy(v) >= 3 && (/\d/.test(v) || /[^\w]/.test(v)) && /[a-z]/i.test(v) && !/^[\w.\-/]+\.(js|ts|py|json|txt|md)$/.test(v); }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function hide(line, v) { return line.replace(v, v.slice(0, 4) + "••••"); }
const indentOf = (s) => s.length - s.trimStart().length;
function lineIndex(src) { const st = [0]; for (let i = 0; i < src.length; i++) if (src.charCodeAt(i) === 10) st.push(i + 1); return st; }
function lineOf(starts, idx) { let lo = 0, hi = starts.length - 1; while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (starts[mid] <= idx) lo = mid; else hi = mid - 1; } return lo + 1; }

// ---------- lexer: blank out comments and the insides of strings, keep every offset and newline ----------
// code = comments blanked, string contents blanked (but ${...} / f"{...}" interpolations stay visible)
// text = only comments blanked (string contents intact)
const LEX = {
  js: { slash: 1, sq: 1, bt: "tpl", rx: 1 }, java: { slash: 1, sq: 1, tq: 1 }, kt: { slash: 1, sq: 1, tq: 1, dollar: 1 },
  c: { slash: 1, sq: 1 }, cs: { slash: 1, sq: 1, csi: 1 }, go: { slash: 1, sq: 1, bt: "raw" }, rs: { slash: 1, rsq: 1 },
  swift: { slash: 1, tq: 1 }, php: { slash: 1, hash: 1, sq: 1 }, py: { hash: 1, sq: 1, tq: 1, fstr: 1 }, rb: { hash: 1, sq: 1, rbi: 1 },
  sh: { only: 1, hash: 1 }, cfg: { only: 1, hash: 1 }, web: { only: 1, html: 1 },
};
function lex(src, lang) {
  const L = LEX[lang] || { only: 1 }, n = src.length, code = src.split(""), text = src.split(""), comments = [];
  let bad = 0;
  const blank = (arr, a, b) => { for (let k = a; k < b; k++) { const ch = arr[k]; if (ch !== "\n" && ch !== "\r") arr[k] = " "; } };
  const cmt = (a, b) => { comments.push({ a, b }); blank(code, a, b); blank(text, a, b); };
  const done = () => ({ code: code.join(""), text: text.join(""), comments, bad });
  if (L.only) {
    let m;
    if (L.hash) { const re = /(^|[ \t])(#[^\n]*)/gm; while ((m = re.exec(src))) cmt(m.index + m[1].length, m.index + m[0].length); }
    if (L.html) { const re = /<!--[\s\S]*?-->/g; while ((m = re.exec(src))) cmt(m.index, m.index + m[0].length); }
    return done();
  }
  const isRx = (last) => {
    if (last < 0) return true;
    const p = src[last];
    if (/[(,=:[!&|?{};+\-*%<>~^]/.test(p)) return true;
    if (/[\w$]/.test(p)) { let s = last; while (s > 0 && /[\w$]/.test(src[s - 1])) s--; return /^(?:return|typeof|case|in|of|delete|void|throw|new|else|do|yield|await)$/.test(src.slice(s, last + 1)); }
    return false;
  };
  const rxEnd = (i) => {
    let j = i + 1, cls = false;
    while (j < n) {
      const ch = src[j];
      if (ch === "\\") j += 2;
      else if (ch === "\n") return -1;
      else if (ch === "[") { cls = true; j++; }
      else if (ch === "]") { cls = false; j++; }
      else if (ch === "/" && !cls) { j++; while (j < n && /[a-z]/i.test(src[j])) j++; return j; }
      else j++;
    }
    return -1;
  };
  function str(i, q) {
    const pre = src.slice(Math.max(0, i - 3), i);
    const tq = L.tq && q !== "`" && src.startsWith(q + q + q, i);
    const isF = L.fstr && /(?:^|[^\w])[rRbBuU]{0,2}[fF][rRbBuU]{0,2}$/.test(pre);
    const csp = L.csi && q === '"' ? src.slice(Math.max(0, i - 2), i) : "";
    const verb = csp.includes("@"), interp = isF || csp.includes("$");
    let j = i + (tq ? 3 : 1), seg = j, ce = j;
    for (;;) {
      if (j >= n) { bad++; ce = n; break; }
      const ch = src[j];
      if (ch === "\\" && !verb && !(q === "`" && L.bt === "raw")) { j += 2; continue; }
      if (tq ? ch === q && src.startsWith(q + q + q, j) : ch === q) {
        if (verb && src[j + 1] === q) { j += 2; continue; }
        ce = j; j += tq ? 3 : 1; break;
      }
      if (ch === "\n" && !tq && q !== "`" && !verb) { bad++; ce = j; break; }   // unterminated (JSX text etc.), recover at end of line
      const tpl = ((q === "`" && L.bt === "tpl") || (L.dollar && q === '"')) && ch === "$" && src[j + 1] === "{";
      const rbi = L.rbi && q === '"' && ch === "#" && src[j + 1] === "{";
      if (tpl || rbi) {
        blank(code, seg, j);
        const e = scan(j + 2, true);
        if (e >= n) { bad++; ce = n; j = n; seg = n; break; }
        j = e + 1; seg = j; continue;
      }
      if (interp && ch === "{") {
        if (src[j + 1] === "{") { j += 2; continue; }
        blank(code, seg, j);
        let d = 1, e = j + 1;
        while (e < n && d > 0) { const c2 = src[e]; if (c2 === "{") d++; else if (c2 === "}") d--; else if (c2 === "\n" && !tq) break; e++; }
        j = e; seg = e; continue;
      }
      j++;
    }
    blank(code, seg, Math.min(ce, n));
    return j;
  }
  function scan(i, inner) {
    let depth = 0, last = -1;
    while (i < n) {
      const c = src[i], d = src[i + 1];
      if (c === " " || c === "\t" || c === "\r" || c === "\n") { i++; continue; }
      if (L.slash && c === "/" && d === "/") { let e = src.indexOf("\n", i); if (e < 0) e = n; cmt(i, e); i = e; continue; }
      if (L.slash && c === "/" && d === "*") { let e = src.indexOf("*/", i + 2); if (e < 0) { bad++; e = n; } else e += 2; cmt(i, e); i = e; continue; }
      if (L.hash && c === "#" && !(L.php && d === "[")) { let e = src.indexOf("\n", i); if (e < 0) e = n; cmt(i, e); i = e; continue; }
      if (inner) { if (c === "{") depth++; else if (c === "}") { if (depth === 0) return i; depth--; } }
      if (c === '"' || (c === "'" && L.sq) || (c === "`" && L.bt)) { i = str(i, c); last = i - 1; continue; }
      if (c === "'" && L.rsq) { const m = /^'(?:\\.[^']*|[^'\\])'/.exec(src.slice(i, i + 12)); if (m) { blank(code, i + 1, i + m[0].length - 1); i += m[0].length; } else i++; last = i - 1; continue; }
      if (c === "/" && L.rx && isRx(last)) { const e = rxEnd(i); if (e > 0) { blank(code, i + 1, e); i = e; last = i - 1; continue; } }
      last = i; i++;
    }
    return n;
  }
  scan(0, false);
  return done();
}

// ---------- bracket structure: matching pairs, and the innermost enclosing { for every offset ----------
function brackets(code) {
  const n = code.length, pair = new Int32Array(n).fill(-1), encl = new Int32Array(n).fill(-1), st = [], bs = [];
  let err = -1;
  for (let i = 0; i < n; i++) {
    const c = code.charCodeAt(i);
    encl[i] = bs.length ? bs[bs.length - 1] : -1;
    if (c === 123 || c === 40 || c === 91) { st.push(i); if (c === 123) bs.push(i); }
    else if (c === 125 || c === 41 || c === 93) {
      const o = st.length ? st[st.length - 1] : -1, oc = o >= 0 ? code.charCodeAt(o) : 0;
      if (o >= 0 && ((oc === 123 && c === 125) || (oc === 40 && c === 41) || (oc === 91 && c === 93))) { st.pop(); if (oc === 123) bs.pop(); pair[o] = i; pair[i] = o; }
      else if (err < 0) err = i;
    }
  }
  return { pair, encl, err, unclosed: st.length ? st[0] : -1 };
}

// ======================================================================
//  Catalogue
//  R(id, category, severity, languages, regex, plain, fix, options)   plain rules, run over a "view" of the file
//     options: view "code" (default) | "text" (strings intact) | "src" (raw, comments too)
//              ok(m, ctx) extra context test   lvl(m, ctx) dynamic severity   absent: skip when the file contains this
//              gate: only when the file contains this   p: path must match   pile: collapse every hit into one ghost
//  S(id, category, sev, sevIfUserInput, languages, regex, plain, plainIfInput, fix, options)   taint sinks
// ======================================================================
const mk = (rx) => new RegExp(rx.source, "gm" + rx.flags.replace(/[gm]/g, ""));
const RULES = [], SINKS = [];
function R(id, cat, sev, langs, rx, plain, fix, o) { RULES.push({ id, cat, sev, langs: langs ? langs.split(" ") : null, re: mk(rx), plain, fix, ...(o || {}) }); }
function S(id, cat, sev, sevT, langs, rx, plain, plainT, fix, o) { SINKS.push({ id, cat, sev, sevT, langs: langs.split(" "), re: mk(rx), plain, plainT, fix, ...(o || {}) }); }
const NOCFG = "js py rb php java kt go c cs rs sh web swift";
const KEYFIX = "Revoke it now, replace it, and load secrets from environment variables or a secret manager.";
const SEC = { view: "src", decoy: 1 };
const SQLBAD = "(?:f[\"'][^\"']*\\{|`[^`]*\\$\\{|[\"'][^\"']*[\"']\\s*(?:\\+\\s*\\w|%\\s*[\\w(])|[\"'][^\"']*[\"']\\.format\\()";
const SQLWORD = /\b(?:select|insert|update|delete|create|drop|alter|where|from|values)\b/i;
const SECCTX = /token|secret|passw|session|nonce|salt|\botp\b|csrf|\bkey\b|auth|reset|api_?key|signature/i;

// ---------- leaked secrets ----------
R("pk", "secret", 5, null, /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY(?: BLOCK)?-----(?:\\n|\s)*[A-Za-z0-9+\/]{20,}/, "A private key is pasted into the code.", KEYFIX, { view: "src" });
R("aws", "secret", 5, null, /\b((?:AKIA|ASIA)[0-9A-Z]{16})\b/, "An AWS access key ID is written in the code.", KEYFIX, SEC);
R("awssecret", "secret", 5, null, /aws_?secret_?(?:access_?)?key["']?\s*[:=]\s*["']?([A-Za-z0-9\/+=]{40})(?![A-Za-z0-9\/+=])/i, "An AWS secret key is written in the code.", KEYFIX, SEC);
R("gh", "secret", 5, null, /\b(gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{50,})\b/, "A GitHub token is written in the code.", KEYFIX, SEC);
R("svc", "secret", 5, null, /\b(xox[baprs]-[A-Za-z0-9-]{10,}|[sr]k_live_[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{35}|SG\.[\w-]{22}\.[\w-]{43}|npm_[A-Za-z0-9]{36}|hf_[A-Za-z0-9]{34,}|GOCSPX-[\w-]{28}|sk-(?:proj-|ant-[a-z0-9]+-)?[A-Za-z0-9_-]{32,}|key-[0-9a-f]{32})(?![\w-])/, "An API key for a third-party service is written in the code.", KEYFIX, { ...SEC, ok: (m) => !/^sk-/.test(m[1]) || (/\d/.test(m[1]) && /[A-Z]/.test(m[1])) });
R("hook", "secret", 4, null, /(https:\/\/hooks\.slack\.com\/services\/T[A-Z0-9]{6,}\/B[A-Z0-9]{6,}\/[A-Za-z0-9]{20,}|https:\/\/(?:ptb\.|canary\.)?discord(?:app)?\.com\/api\/webhooks\/\d{15,}\/[\w-]{40,})/, "A chat webhook address is written in the code, so anyone can post as your bot.", KEYFIX, SEC);
R("urlcred", "secret", 4, null, /\b(?:postgres(?:ql)?|mysql|mariadb|mongodb(?:\+srv)?|redis|rediss|amqps?|mssql|ftps?|https?):\/\/[^\s:\/@"'<>]+:([^\s@"'<>\/]{4,})@(?!(?:localhost|127\.0\.0\.1|0\.0\.0\.0|db|postgres|mysql|redis|mongo)[:\/\s"'])/, "A web or database address has a password built into it.", KEYFIX, { view: "src", ok: (m) => !DECOY.test(m[1]) && !WEAKV.test(m[1]) });
R("jwt", "secret", 3, null, /\b(eyJ[A-Za-z0-9_-]{15,}\.eyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{10,})/, "A login token (JWT) is saved in the code. If it is real, anyone can reuse it.", KEYFIX, SEC);
R("pw", "secret", 3, NOCFG, /(?:pass(?:word|wd)?|pwd|secret|api[_-]?key|auth[_-]?token|access[_-]?token|private[_-]?key)["']?\s*[:=]\s*["']([^"'\s]{8,})["']/i, "A password or key looks hard-coded.", KEYFIX, { view: "src", ok: (m) => looksSecret(m[1]) });
R("cfgpw", "secret", 4, "cfg", /^[ \t]*["']?(?:export[ \t]+)?[\w.-]*(?:pass(?:word|wd)?|secret|api[_-]?key|(?:access|auth|refresh|bearer)?[_-]?token|private[_-]?key|access[_-]?key|client[_-]?secret)[\w.-]*["']?[ \t]*[:=][ \t]*["']?([^\s"'#,{}$<>]{8,})["']?[ \t]*,?[ \t]*(?:#.*)?$/i, "A password or key is written in a settings file that is committed to the repository.", KEYFIX, { view: "src", ok: (m) => looksSecret(m[1]) });

// ---------- Python ----------
R("mutdef", "sloppy", 2, "py", /\bdef\s+\w+\s*\([^)]*?=\s*(?:\[[^\]]*\]|\{[^}]*\}|set\(\s*\)|dict\(\s*\)|list\(\s*\))/, "A default argument is a list or dict. Python makes it once and shares it between every call, so data leaks from one call to the next.", "Default to None and create the list inside the function.");
R("eqnone", "sloppy", 1, "py", /[=!]=\s*None\b/, "Compares with None using == instead of `is`.", "Use `is None` / `is not None`.", { pile: 1, pileText: "comparisons with None use == instead of `is`" });
R("islit", "broken", 2, "py", /\bis\s+(?:not\s+)?(?:["']|-?\d)/, "`is` compares identity, not value, so it can be wrong for strings and numbers (and warns on new Python).", "Use == and !=.");
R("asserttuple", "broken", 3, "py", /^[ \t]*assert[ \t]*\((?:[^()\n]|\([^()\n]*\))*,(?:[^()\n]|\([^()\n]*\))*\)[ \t]*$/, "`assert (x, \"message\")` asserts a non-empty tuple, which is always true, so this check never fails.", "Write `assert x, \"message\"` without the parentheses.");
R("zerodiv", "broken", 3, "py", /[\w)\]][ \t]*(?:\/{1,2}|%)[ \t]*0(?![.\w])/, "Dividing by a literal zero raises ZeroDivisionError.", "Fix the divisor.");
R("py2print", "broken", 4, "py", /^[ \t]*print[ \t]*>>|^[ \t]*print[ \t]+(?!\()["'\w]|^[ \t]*except[ \t]+[\w.()]+[ \t]*,[ \t]*\w+[ \t]*:|^[ \t]*raise[ \t]+\w+[ \t]*,|^[ \t]*exec[ \t]+["'\w]/, "Python 2 syntax. Python 3 refuses to even load this file (SyntaxError).", "Port it to Python 3 (print(), `except X as e`, raise X(...)).");
R("py2names", "broken", 3, "py", /\b(?:xrange|raw_input|unicode|unichr|basestring|execfile|reduce)\s*\(|\.(?:iteritems|itervalues|iterkeys|has_key)\s*\(|\bbasestring\b/, "Python 2 only name. On Python 3 this raises NameError or AttributeError when reached.", "Use range, input, str, dict.items(), `in`.", { absent: /\bsix\b|sys\.version_info|NameError|PY2|PY3|__future__|python_version|\bunicode\s*=|basestring\s*=|xrange\s*=|raw_input\s*=|from functools import[^\n]*reduce|import functools/ });
R("pytabs", "broken", 3, "py", /^(?=[ \t]*\S)[ \t]*(?: \t|\t )[ \t]*/, "Tabs and spaces are mixed in one line's indentation. Python 3 raises TabError for that.", "Indent with spaces only.");
R("pybreak", "sloppy", 3, "py", /\b(?:breakpoint\s*\(\s*\)|pdb\.set_trace\s*\(\s*\)|ipdb\.set_trace\s*\(\s*\))/, "A debugger stop was left in. The program freezes here waiting for someone to type.", "Remove it.");
R("pytemp", "weak", 2, "py", /\btempfile\.mktemp\s*\(/, "mktemp hands out a file name that another program can grab first.", "Use tempfile.mkstemp or NamedTemporaryFile.");
R("jinjaesc", "danger", 3, "py", /\bautoescape\s*=\s*False\b/, "HTML auto-escaping is switched off, so user text can inject script.", "Leave autoescape on.");
R("pyfopen", "leak", 2, "py", /^[ \t]*(\w+)[ \t]*=[ \t]*open\(/, "A file is opened here and never closed.", "Use `with open(...) as f:` so it always closes.", { ok: (m, c) => !new RegExp("\\b" + m[1] + "\\.close\\(|with\\s+" + m[1] + "\\b|closing\\(\\s*" + m[1] + "|return\\s+" + m[1] + "\\b|self\\.\\w+\\s*=\\s*" + m[1] + "\\b").test(c.code) });
R("pydebug", "weak", 3, "py", /\.run\([^)]*debug\s*=\s*True|^\s*DEBUG\s*=\s*True\b|\bapp\.debug\s*=\s*True/, "Debug mode is on, which can expose internals and a code console to visitors.", "Read it from an environment variable and keep it off in production.", { noTest: 1 });
R("pyhosts", "weak", 2, "py", /ALLOWED_HOSTS\s*=\s*\[\s*["']\*["']/, "Every host name is accepted, which allows host-header attacks.", "List your real domains.");
R("pycookie", "weak", 2, "py", /\b(?:SESSION_COOKIE_SECURE|SESSION_COOKIE_HTTPONLY|CSRF_COOKIE_SECURE)\s*=\s*False\b/, "A cookie safety flag is turned off.", "Turn it on.");
R("csrfoff", "weak", 3, "py rb java kt", /@csrf_exempt\b|WTF_CSRF_ENABLED\s*=\s*False|\bcsrf\.exempt\b|skip_before_action\s+:verify_authenticity_token|\bskip_forgery_protection\b|\bcsrf\s*\(\s*\)\s*\.disable\s*\(\s*\)|\bcsrf\s*\(\s*\w+\s*->\s*\w+\.disable\s*\(\s*\)\s*\)|\bAbstractHttpConfigurer::disable\b/, "Cross-site request forgery protection is switched off here.", "Keep CSRF protection on, or protect the route another way.");

// ---------- JavaScript / TypeScript ----------
R("nan", "broken", 3, "js", /[!=]==?\s*NaN\b|\bNaN\s*[!=]==?/, "Nothing is equal to NaN, not even NaN, so this comparison never does what you want.", "Use Number.isNaN(x).");
R("typeoftypo", "broken", 3, "js", /typeof\s+[\w$.\[\]]+\s*[!=]==?\s*["'](?!(?:undefined|object|boolean|number|bigint|string|symbol|function)["'])\w*["']/, "typeof is compared with a word it can never return, so this test never works.", "Use one of: undefined, object, boolean, number, bigint, string, symbol, function.", { view: "text" });
R("assigncond", "broken", 3, "js java cs php", /\bif\s*\(\s*[\w$.\[\]]+\s*=(?![=>])/, "An assignment sits inside an if. This is nearly always a typo for ==.", "Use === for comparing, or add extra parentheses if the assignment is on purpose.", { ok: (m, c) => { const o = m.index + m[0].indexOf("("), close = c.br.pair[o]; if (close < 0) return true; const body = c.code.slice(m.index + m[0].length, close); let d = 0; for (const ch of body) { if ("([{".includes(ch)) d++; else if (")]}".includes(ch)) d--; else if (ch === "," && d === 0) return false; } return !body.includes("("); } });
R("asyncforeach", "broken", 2, "js", /\.forEach\s*\(\s*async\b/, "forEach does not wait for async callbacks, so the code after it runs too early and errors are lost.", "Use a for...of loop with await, or Promise.all(items.map(...)).");
R("asyncpromise", "sloppy", 2, "js", /\bnew\s+Promise\s*\(\s*async\b/, "An async function inside new Promise(...) swallows its own errors.", "Drop the wrapper and return the async function directly.");
R("asynceffect", "broken", 3, "js", /\buseEffect\s*\(\s*async\b/, "React effects cannot be async. React gets a promise instead of a cleanup function.", "Define an async function inside the effect and call it.");
R("expstatic", "danger", 4, "js", /express\.static\s*\(\s*(?:__dirname|["']\.\/?["']|process\.cwd\(\))\s*\)/, "The whole project folder is served over the web, including source code and possibly .env files.", "Serve only a public/ folder.", { view: "text" });
R("reserr", "weak", 2, "js", /\bres\.(?:send|json|end)\s*\(\s*(?:err|error|e)(?:\.stack)?\s*\)/, "The raw error is sent to the visitor, which reveals internals.", "Log it and send a generic message.");
R("debugger", "sloppy", 2, "js", /\bdebugger\s*;/, "A debugger statement was left in.", "Remove it.", { pile: 1, pileText: "left-in debugger statements" });
R("proto", "danger", 2, "js", /\.__proto__\s*=(?!=)|\[\s*["']__proto__["']\s*\]/, "Writes to __proto__, which can poison every object in the app (prototype pollution).", "Block the key or use Object.create(null).", { view: "text" });
R("lstoken", "weak", 2, "js", /\b(?:local|session)Storage\.setItem\s*\(\s*["'`][^"'`]*(?:token|jwt|passw|secret|auth)[^"'`]*["'`]/i, "A login token or secret is kept in web storage, where any injected script can read it.", "Prefer an httpOnly cookie.", { view: "text" });
R("cookieflag", "weak", 2, "js", /\b(?:httpOnly|secure)\s*:\s*false\b/, "A cookie safety flag is turned off.", "Turn it on.");
R("hrefjs", "danger", 2, "js web", /\bhref\s*=\s*["']\s*javascript:/i, "A javascript: link runs code and defeats script-blocking protections.", "Use a button with an event handler.", { view: "text" });
R("postmsgo", "danger", 3, "js", /\.postMessage\s*\([^;]*,\s*["']\*["']\s*\)/, "A message is posted to any website (target \"*\"), including ones that should not see it.", "Name the exact origin.", { view: "text" });
R("msglisten", "danger", 3, "js", /\baddEventListener\s*\(\s*["']message["']/, "Listens for messages from other windows but never checks who sent them.", "Check event.origin before trusting event.data.", { view: "text", ok: (m, c) => !/\.origin\b|\.source\b/.test(c.code.slice(m.index, m.index + 900)) });
R("jwtflag", "weak", 4, null, /verify_signature["']?\s*[:=]\s*False|verify_exp["']?\s*[:=]\s*False|algorithms?\s*[:=]\s*\[?\s*["']none["']|ignoreExpiration\s*:\s*true/i, "Login tokens are accepted without fully checking them.", "Always verify signatures and expiry, and pin the allowed algorithm.", { view: "src" });
R("createcipher", "weak", 3, "js", /\bcrypto\.createCipher(?:iv)?\s*\(\s*(?:["'`](?:des|rc4|rc2|bf)|\s*\w)/i, "Uses the old createCipher / weak cipher, which is insecure and removed from newer Node versions.", "Use createCipheriv with aes-256-gcm and a random IV.", { view: "text", ok: (m) => /createCipher\s*\(|des|rc4|rc2|bf/i.test(m[0]) });
R("newbuffer", "weak", 1, "js", /\bnew\s+Buffer\s*\(/, "new Buffer() is deprecated and can expose old memory.", "Use Buffer.from or Buffer.alloc.", { pile: 1, pileText: "uses of the deprecated new Buffer()" });
R("jsconsole", "weak", 2, "js", /\bconsole\.(?:log|info|debug)\s*\(\s*[^)]*\b(?:password|passwd|secret|token|apiKey|api_key|privateKey)\b/, "A secret value is printed to the log.", "Never log passwords or tokens.");

// ---------- stubs that crash when reached ----------
const STUBP = "A stub: calling this crashes with a \"not implemented\" error.", STUBF = "Write the real code, or remove whatever calls it.";
R("stub", "broken", 2, "js", /\bthrow\s+new\s+Error\s*\(\s*["'`](?:not\s+(?:yet\s+)?implemented|unimplemented|todo)/i, STUBP, STUBF, { view: "text" });
R("stub", "broken", 3, "rs", /\b(?:todo|unimplemented)!\s*[(\[]/, STUBP, STUBF);
R("stub", "broken", 3, "kt", /(?<![\w.])TODO\s*\(/, STUBP, STUBF);
R("stub", "broken", 2, "java", /UnsupportedOperationException\s*\(\s*"Not supported yet/, STUBP, STUBF, { view: "text" });
R("stub", "broken", 2, "cs", /\bthrow\s+new\s+NotImplementedException\b/, STUBP, STUBF);
R("stub", "broken", 3, "swift", /\bfatalError\s*\(\s*"[^"]*(?:not (?:yet )?implemented|unimplemented|todo)/i, STUBP, STUBF, { view: "text" });

// ---------- weak crypto, TLS, hashing, randomness ----------
R("tls", "weak", 3, null, /rejectUnauthorized\s*:\s*false|\bverify\s*=\s*False\b|InsecureSkipVerify\s*:\s*true|NODE_TLS_REJECT_UNAUTHORIZED["']?\s*[\]=:]+\s*["']?0|CURLOPT_SSL_VERIFY(?:PEER|HOST)\s*,\s*(?:false|0)|strictSSL\s*:\s*false|_create_unverified_context|\bssl\.CERT_NONE\b|check_hostname\s*=\s*False|ALLOW_ALL_HOSTNAME_VERIFIER|NoopHostnameVerifier|\btrustAllCerts\b|TrustAllCerts|ServerCertificateValidationCallback\s*[+]?=|insecure-skip-tls-verify:\s*true|--no-check-certificate|\bcurl\b[^\n|;]*\s(?:-k|--insecure)\b/, "Certificate checking is switched off, so connections can be intercepted.", "Turn verification back on; trust a custom CA if you need to.", { noTest: 1 });
R("hash", "weak", 1, "js py java php go cs rb", /createHash\(\s*["'](?:md5|sha1)["']|hashlib\.(?:md5|sha1)\s*\(|MessageDigest\.getInstance\(\s*"(?:MD5|SHA-?1)"|\b(?:md5|sha1)\s*\(|\b(?:md5|sha1)\.(?:New|Sum)\s*\(|\b(?:MD5|SHA1)(?:CryptoServiceProvider)?\.Create\s*\(|Digest::(?:MD5|SHA1)/i, "Uses an old hash. Fine for checksums, unsafe for passwords or signatures.", "Use SHA-256, or bcrypt/argon2 for passwords.", { view: "text", lvl: (m, c) => (/pass|pwd|secret|token|sign|auth|credential/i.test(c.near(m.index)) ? 4 : 1), pile: 1, pileText: "uses of MD5 or SHA-1", pileIf: (f) => f.level <= 1 });
R("ecb", "weak", 3, "py java cs php", /\bAES\.MODE_ECB\b|\bDES\.new\(|\bARC4\.new\(|\bARC2\.new\(|\bBlowfish\.new\(|Cipher\.getInstance\(\s*"(?:DES|DESede|RC4|RC2|Blowfish|AES(?:\/ECB\/[^"]*)?)"\s*\)|\bnew\s+(?:DES|RC2|TripleDES)CryptoServiceProvider\b|\bCipherMode\.ECB\b|\bmcrypt_\w+\s*\(/, "Uses an old or weak cipher mode (ECB, DES, RC4), which leaks patterns in the data.", "Use AES-GCM with a random nonce.", { view: "text" });
R("rand", "weak", 3, "js py java php go cs", /\bMath\.random\s*\(|\brandom\.(?:random|randint|choice|choices|getrandbits)\s*\(|\bnew\s+Random\s*\(|\b(?:mt_)?rand\s*\(|\brand\.(?:Int\w*|Read|Float\w*)\s*\(/, "Uses predictable random numbers for something security-related.", "Use crypto.getRandomValues, Python's secrets module, SecureRandom or crypto/rand.", { ok: (m, c) => SECCTX.test(c.near(m.index)) && (c.lang !== "go" || /math\/rand/.test(c.src)) });
R("cors", "weak", 2, null, /Access-Control-Allow-Origin["'\s:,=\]]+\*|\bcors\(\s*\{[^}]*origin\s*:\s*["']\*["']|allow_origins\s*=\s*\[\s*["']\*["']|@CrossOrigin\s*\(\s*origins\s*=\s*"\*"|allowedOrigins\(\s*"\*"|AllowAllOrigins\s*:\s*true|\bcors\.AllowAll\(\)/i, "Any website may read this server's responses.", "List the specific origins you trust.", { view: "text" });
R("chmod", "weak", 2, "py sh js go php", /\bchmod\s+(?:-R\s+)?(?:0?777|a\+rwx)\b|\bchmod\([^)]*0o?777/, "Gives everyone full access to a file or folder.", "Grant only the permissions that are needed (for example 640 or 750).");
R("logsecret", "weak", 2, "py java kt go cs php rb", /(?<![\w$])(?:print|logging\.\w+|logger\.\w+|log\.\w+|System\.(?:out|err)\.print(?:ln)?|fmt\.Print(?:f|ln)?|puts|error_log|Console\.Write(?:Line)?|Log\.[dviwe])\s*\([^;\n]*?\b(\w*(?:password|passwd|pwd|secret|api_?key|private_?key|access_?token|auth_?token|session_?id|credit_?card)\w*)\b/i, "A password, key or token is written to the log.", "Never log secrets; log an id instead.", { ok: (m) => !/hash|prompt|label|field|length|valid|polic|rule|error|msg|strength|match|confirm|placeholder|type|name|enabled|required/i.test(m[1]) });

// ---------- SQL built from text (no user-input proof needed) ----------
R("sql", "danger", 3, "py js java php rb go cs kt", new RegExp("\\.(?:execute|executemany|query|raw|exec|prepare|createQuery|createNativeQuery|prepareStatement|executeQuery|executeUpdate|queryForList|queryForObject|Query|QueryRow|Exec)\\s*\\(\\s*" + SQLBAD + "|\\bnew\\s+(?:SqlCommand|MySqlCommand|NpgsqlCommand)\\s*\\(\\s*(?:\\$\"|\"[^\"]*\"\\s*\\+\\s*\\w)|\\bmysqli?_query\\s*\\([^,]*,\\s*[\"'][^\"']*[\"']\\s*\\.\\s*\\$"), "Builds a database question by gluing text together, which allows SQL injection.", "Use placeholders (parameterized queries).", { view: "text", ok: (m) => SQLWORD.test(m[0]) });
R("sql", "danger", 3, "go", /\.(?:Query|QueryRow|Exec|QueryContext|ExecContext)\(\s*(?:\w+,\s*)?fmt\.Sprintf\(/, "Builds a database question with Sprintf, which allows SQL injection.", "Use placeholders ($1, ?) and pass the values separately.", { view: "text" });
R("sql", "danger", 4, "php", /(?:\bmysqli?_query\s*\(\s*[^,;]+,|\bpg_query\s*\(\s*[^,;]+,|->(?:query|exec|prepare)\s*\()\s*(?:["'][^"']*(?:\$\w|["']\s*\.\s*\$))/, "Builds a database question by gluing variables into the text, which allows SQL injection.", "Use prepared statements with bound parameters.", { view: "text" });
R("sql", "danger", 3, "rb", /\b(?:where|find_by_sql|execute|exists\?|order|pluck|joins)\s*\(\s*["'][^"']*#\{/, "Builds a database question with string interpolation, which allows SQL injection.", "Use placeholders: where(\"name = ?\", name).", { view: "text" });

// ---------- Ruby ----------
R("htmlsafe", "danger", 2, "rb", /\.html_safe\b/, "html_safe tells Rails not to escape this text, so user text could inject script.", "Remove it, or sanitize first.");
R("rbshell", "danger", 4, "rb", /\b(?:system|exec|spawn|popen)\s*\(?\s*["'][^"'\n]*#\{|%x[({\[][^\n]*#\{/, "Runs a shell command with values pasted in, so odd characters can run extra commands.", "Pass the command and its arguments separately: system(\"ls\", dir).", { view: "text" });
R("permitall", "danger", 3, "rb", /\bparams\.permit!/, "Every submitted field is accepted (mass assignment), including ones like is_admin.", "List only the fields users may set.");
R("rbrescue", "sloppy", 2, "rb", /^[ \t]*rescue(?:[ \t]+[\w:,. ]+)?(?:[ \t]*=>[ \t]*\w+)?[ \t]*\n[ \t]*(?:nil[ \t]*\n[ \t]*)?end\b/, "An error is rescued and thrown away, so failures happen silently.", "Log it, handle it, or rescue the specific error.", { noTest: 1 });

// ---------- PHP ----------
R("phpremoved", "broken", 3, "php", /(?<![\w>:$])(?:mysql_(?:connect|pconnect|query|fetch_\w+|select_db|real_escape_string|close|num_rows|result|error|errno|insert_id|escape_string|affected_rows)|ereg(?:i)?(?:_replace)?|spliti?|create_function|get_magic_quotes_gpc|session_register|money_format)\s*\(/, "Uses a PHP function that was removed. On modern PHP this stops with a fatal error.", "Switch to the modern replacement (mysqli/PDO, preg_*, closures).");
R("phploose", "weak", 3, "php", /\b(?:md5|sha1|crypt|hash)\s*\([^;]*\)\s*==(?!=)/, "A hash is compared with ==. PHP can treat different strings as equal here (\"magic hashes\"), which can bypass logins.", "Use hash_equals() or ===.");
R("phpdisp", "weak", 2, "php", /ini_set\s*\(\s*["']display_errors["']\s*,\s*["']?(?:1|on|true)/i, "Error details are shown to visitors.", "Log errors instead of showing them.", { view: "text" });
R("phpinfo", "weak", 2, "php", /\bphpinfo\s*\(\s*\)/, "phpinfo() shows your whole server setup to anyone who opens it.", "Remove it.");
R("phpupload", "danger", 4, "php", /move_uploaded_file\s*\([^;]*\$_FILES\[[^\]]*\]\s*\[\s*["']name["']\s*\]/, "An uploaded file is saved under the name the visitor chose, so they can upload and run a script.", "Generate your own file name and check the type.", { view: "text" });

// ---------- Java / Kotlin / C# ----------
R("javastr", "broken", 3, "java", /\b\w+(?:\.\w+|\(\))*\s*[!=]=\s*"[^"\n]*"|"[^"\n]*"\s*[!=]=\s*\w/, "Strings are compared with ==, which checks identity, not content.", "Use .equals().", { view: "text" });
R("javaxxe", "weak", 2, "java", /\b(?:DocumentBuilderFactory|SAXParserFactory|XMLInputFactory)\.newInstance\s*\(/, "An XML parser is created with default settings, which can allow external-entity (XXE) attacks.", "Disable DTDs and external entities.", { absent: /disallow-doctype-decl|FEATURE_SECURE_PROCESSING|IS_SUPPORTING_EXTERNAL_ENTITIES|XMLConstants\.ACCESS_EXTERNAL/ });
R("javatrust", "weak", 4, "java kt", /checkServerTrusted\s*\([^)]*\)[^{;]*\{\s*\}|\bverify\s*\([^)]*\)\s*\{\s*return\s+true\s*;/, "A certificate check does nothing, so any certificate is accepted.", "Use the default trust manager.");
R("binfmt", "danger", 4, "cs", /\b(?:BinaryFormatter|NetDataContractSerializer|LosFormatter|SoapFormatter)\b/, "Uses a .NET serializer that can run code hidden in the data it reads.", "Use System.Text.Json.");
R("printstack", "sloppy", 1, "java kt", /\.printStackTrace\s*\(\s*\)/, "An error is printed and then ignored.", "Use a logger and handle the error.", { pile: 1, pileText: "errors are printed and dropped with printStackTrace()" });
R("unwrap", "sloppy", 1, "rs", /\.unwrap\s*\(\s*\)/, "unwrap() crashes the whole program if the value is missing.", "Use ? or match.", { pile: 1, pileText: "unwrap() calls can panic" });
R("bangbang", "sloppy", 1, "kt", /[\w)\]]!!(?!=)/, "!! crashes with a NullPointerException if the value is null.", "Use ?. or ?: instead.", { pile: 1, pileText: "!! operators can crash on null" });
R("swifttry", "sloppy", 2, "swift", /\btry!\s/, "try! crashes the app if the call fails.", "Use try? or do/catch.", { pile: 1, pileText: "try! can crash the app" });

// ---------- C / C++ ----------
R("cfmt", "danger", 3, "c", /\bprintf\s*\(\s*(?!fmt\b|format\b)[A-Za-z_]\w*\s*\)|\bfprintf\s*\(\s*\w+\s*,\s*(?!fmt\b|format\b)[A-Za-z_]\w*\s*\)/, "A variable is used as the format string. If it holds % codes, they can read or write memory.", "Use printf(\"%s\", text).");
R("cscanf", "danger", 4, "c", /\b[fs]?scanf\s*\(\s*(?:[^,"]+,\s*)?"[^"]*%s/, "scanf reads a word with no length limit, so long input overflows the buffer.", "Use a width (%63s) or fgets.", { view: "text" });
R("cmalloc", "leak", 1, "c", /\b(?:malloc|calloc)\s*\(/, "Memory is allocated here and this file never frees any.", "Free it when done, on every path.", { absent: /\bfree\s*\(/, pile: 1, pileText: "files allocate memory but never free any" });
R("cfopen", "leak", 2, "c", /(?:FILE\s*\*\s*)?(\w+)\s*=\s*fopen\s*\(/, "A file is opened here and nothing closes it.", "Call fclose on every path out.", { ok: (m, c) => !new RegExp("fclose\\s*\\(\\s*" + m[1] + "\\b|return\\s+" + m[1] + "\\b|->\\w+\\s*=\\s*" + m[1] + "\\b|\\b\\w+\\.\\w+\\s*=\\s*" + m[1] + "\\b").test(c.code) });

// ---------- Go ----------
R("gohttp", "weak", 2, "go", /\bhttp\.(?:Get|Post|Head|PostForm)\s*\(/, "The default Go HTTP client has no timeout, so a slow server can hang this goroutine forever.", "Use an http.Client with a Timeout.");
R("gobody", "leak", 2, "go", /(\w+)\s*,\s*\w+\s*:?=\s*http\.(?:Get|Post|Head)\s*\(/, "The response body is never closed, which leaks connections.", "Add defer resp.Body.Close() right after the error check.", { ok: (m, c) => !new RegExp(m[1] + "\\.Body\\.Close").test(c.code) });
R("goticker", "leak", 2, "go", /\btime\.NewTicker\s*\(/, "A ticker is created and never stopped, so it keeps running forever.", "Call defer ticker.Stop().", { absent: /\.Stop\s*\(/ });
R("goerr", "sloppy", 3, "go", /if\s+err\s*!=\s*nil\s*\{\s*\}/, "An error is checked and then ignored.", "Return it or log it.", { noTest: 1 });

// ---------- shell, Docker, CI, infrastructure files ----------
R("pipesh", "danger", 3, "sh cfg", /\b(?:curl|wget)\b[^\n|]*\|\s*(?:sudo\s+)?(?:ba|z|da)?sh\b/, "Downloads a script and runs it without looking, so whoever controls that address controls this machine.", "Download, verify a checksum, then run.");
R("rmvar", "danger", 3, "sh", /\brm\s+-[a-zA-Z]*[rR][a-zA-Z]*\s+(?:--\s+)?["']?\$\{?\w+\}?(?:\/\*?)?["']?(?:\s|$)/, "Deletes a folder named by a variable. If the variable is empty this can delete far more than intended.", "Use ${VAR:?} so the script stops when it is empty.", { ok: (m) => !/:\?/.test(m[0]) });
R("dockerfrom", "weak", 1, "cfg", /^\s*FROM\s+(?:[^\s:@]+:latest|[^\s:@]+)\s*(?:AS\s+\w+)?\s*$/im, "A base image has no pinned version, so builds can change without warning.", "Pin a version or digest.", { p: /dockerfile/i, pile: 1, pileText: "Docker base images are not pinned to a version", ok: (m) => !/\bscratch\b/i.test(m[0]) });
R("dockeradd", "weak", 2, "cfg", /^\s*ADD\s+https?:\/\//im, "ADD downloads a remote file without checking it.", "Use curl with a checksum.", { p: /dockerfile/i });
R("dockeruser", "weak", 2, "cfg", /^\s*USER\s+root\s*$/im, "The container is set to run as root.", "Create and switch to a normal user.", { p: /dockerfile/i });
R("ghainject", "danger", 4, "cfg", /\$\{\{\s*github\.(?:event\.(?:issue\.(?:title|body)|pull_request\.(?:title|body|head\.(?:ref|label))|comment\.body|review\.body|head_commit\.message)|head_ref)\s*\}\}/, "Text anyone can write (a title or branch name) is pasted into a workflow, so an attacker can run commands in your CI.", "Pass it through an env: variable and use \"$VAR\" in the script.", { p: /\.github\/workflows\//, view: "src" });
R("ghatarget", "danger", 5, "cfg", /pull_request_target[\s\S]{0,600}?ref:\s*\$\{\{\s*github\.event\.pull_request\.head\.(?:sha|ref)/, "A workflow with write access checks out code from an untrusted pull request, which can leak your secrets.", "Do not check out PR code in pull_request_target workflows.", { p: /\.github\/workflows\//, view: "src" });
R("ghaperm", "weak", 3, "cfg", /permissions:\s*write-all/, "The workflow gets write access to everything.", "Grant only the permissions the job needs.", { p: /\.github\/workflows\//, view: "src" });
R("infra", "weak", 3, "cfg", /\bprivileged:\s*true\b|\bhostNetwork:\s*true\b|\bhostPID:\s*true\b|\ballowPrivilegeEscalation:\s*true\b|\bacl\s*=\s*"public-read(?:-write)?"|\bpublicly_accessible\s*=\s*true\b|"Principal"\s*:\s*"\*"|"Action"\s*:\s*"\*"|\bcidr_blocks\s*=\s*\[\s*"0\.0\.0\.0\/0"\s*\]/, "An infrastructure setting opens things wider than needed (public access, root-level container, wildcard permission).", "Narrow it to what is really needed.", { view: "src" });

R("npmrc", "secret", 5, "cfg", /_authToken\s*=\s*([^\s$"']{8,})/, "A package registry token is written in a settings file.", KEYFIX, { view: "src", ok: (m) => looksSecret(m[1]) });

// ======================================================================
//  Taint tracking: where does user input go?
// ======================================================================
const TSRC = {
  js: /(?<![\w$.])(?:req|request|ctx)\.(?:body|query|params|headers|cookies|files|json\s*\(|text\s*\(|formData\s*\()|(?<![\w$.])(?:window\.|document\.)?location\.(?:search|hash|href|pathname)\b|\bdocument\.(?:cookie|referrer|URL)\b|\bprocess\.argv\b|\bwindow\.name\b|\bURLSearchParams\b|\bsearchParams\b|\b(?:e|ev|event)\.(?:target\.value|data)\b|(?:getElementById|querySelector)\s*\([^)]*\)\.value\b/,
  py: /\brequest\.(?:args|form|values|json|data|cookies|headers|files|GET|POST|REQUEST|body|query_params|get_json)\b|(?<![\w.])input\s*\(|\bsys\.argv\b|\bself\.get_(?:argument|query_argument|body_argument)\s*\(/,
  php: /\$_(?:GET|POST|REQUEST|COOKIE|FILES|SERVER)\b|php:\/\/input/,
  rb: /\bparams\b|\brequest\.(?:params|body|headers|cookies|raw_post)\b|\bARGV\b|(?<![\w.])gets\b/,
  java: /\.(?:getParameter|getHeader|getQueryString|getCookies|getInputStream|getPathInfo|getRequestURI)\s*\(|\bargs\[\d*\]|@(?:RequestParam|PathVariable|RequestBody|QueryParam|PathParam|RequestHeader)\b/,
  go: /\br\.(?:URL\.Query\s*\(|FormValue|PostFormValue|URL\.Path|URL\.RawQuery|Header\.Get|Cookie\s*\(|Body\b)|\bmux\.Vars\b|\bc\.(?:Query|Param|PostForm|DefaultQuery|GetHeader|FormValue|Params\.ByName)\s*\(|\bos\.Args\b|\bchi\.URLParam\s*\(/,
  cs: /\bRequest\.(?:QueryString|Form|Query|Headers|Cookies|Params|Body)\b|\[(?:FromQuery|FromBody|FromRoute|FromForm)\]|\bargs\[\d*\]/,
  c: /\bargv\b|\bgetenv\s*\(|\bfgets\s*\(|(?<![\w.])gets\s*\(|\bscanf\s*\(|\brecv\s*\(|\bgetline\s*\(/,
  sh: /\$(?:[1-9@*]|\{[1-9@*])/,
};
TSRC.kt = TSRC.java;
// text that has been cleaned up on the way (cast to number, escaped, ...) is no longer treated as dangerous
const SAN = /\b(?:escape\w*|sanitiz\w*|shlex\.quote|quote|parseInt|parseFloat|Number|int|float|intval|floatval|encodeURI(?:Component)?|DOMPurify|bleach\.clean|htmlspecialchars|htmlentities|basename|secure_filename|parseLong|Atoi|filepath\.Base|escapeHtml|strip_tags|isNumeric|escapeshellarg|html\.escape|Integer\.parseInt)\s*\(/;
const ASSIGN = /^\s*(?:(?:export|final|const|let|var|val|static|public|private|protected|readonly)\s+)*(?:[\w$<>\[\],.?*&]+\s+)?(\$?[\w$]+)\s*(?:\[[^\]]*\])?\s*(?:[-+|*:]|\?\?|\|\||\.)?=(?![=>~])\s*([\s\S]+)$/;
const DESTR = /^\s*(?:const|let|var)\s*[{\[]([^}\]]*)[}\]]\s*=\s*([\s\S]+)$/;
const TUPLE = /^\s*([\w$]+(?:\s*,\s*[\w$]+)+)\s*:?=(?!=)\s*([\s\S]+)$/;
const reEsc = (s) => s.replace(/[$.*+?^()[\]{}|\\]/g, "\\$&");

function buildTaint(c) {
  const T = TSRC[c.lang];
  if (!T) return null;
  const set = new Set();
  if (c.lang === "java" || c.lang === "kt") {
    for (const m of c.code.matchAll(/@(?:RequestParam|PathVariable|QueryParam|PathParam|RequestHeader|RequestBody)(?:\([^)]*\))?\s+(?:final\s+)?[\w<>\[\],.? ]+?\s+(\w+)\s*[,)]/g)) set.add(m[1]);
    for (const m of c.code.matchAll(/@(?:RequestParam|PathVariable|QueryParam|PathParam|RequestHeader|RequestBody)(?:\([^)]*\))?\s+(?:val\s+)?(\w+)\s*:/g)) set.add(m[1]);
  }
  if (c.lang === "cs") for (const m of c.code.matchAll(/\[From\w+(?:\([^)]*\))?\]\s*[\w<>\[\]?.]+\s+(\w+)/g)) set.add(m[1]);
  const stmts = [];
  let buf = "", d = 0;
  for (const ln of c.clines) {
    buf += (buf ? " " : "") + ln;
    for (let i = 0; i < ln.length; i++) { const ch = ln[i]; if (ch === "(" || ch === "[") d++; else if (ch === ")" || ch === "]") d--; }
    if (d <= 0 || /[{;]\s*$/.test(ln) || buf.length > 700) { if (buf.trim()) stmts.push(buf); buf = ""; d = 0; }
  }
  let re = null;
  const mkRe = () => { re = set.size ? new RegExp((c.lang === "php" ? "(?<![\\w.])" : "(?<![\\w$.])") + "(?:" + [...set].map(reEsc).join("|") + ")(?![\\w$])") : null; };
  mkRe();
  const dirty = (rhs) => !SAN.test(rhs) && (T.test(rhs) || (re && re.test(rhs)));
  for (let pass = 0; pass < 3; pass++) {
    const before = set.size;
    for (const s of stmts) {
      let m;
      if ((m = DESTR.exec(s))) { if (dirty(m[2])) m[1].split(",").forEach((p) => { const nm = p.split(/[:=]/).pop().trim().replace(/^\.\.\./, ""); if (/^[\w$]+$/.test(nm)) set.add(nm); }); }
      else if ((m = TUPLE.exec(s))) { if (dirty(m[2])) m[1].split(",").forEach((p) => set.add(p.trim())); }
      else if ((m = ASSIGN.exec(s))) { if (dirty(m[2])) set.add(m[1]); }
      else if (c.lang === "py" && (m = /^\s*for\s+(\w+)\s+in\s+(.+?):?\s*$/.exec(s))) { if (dirty(m[2])) set.add(m[1]); }
      else if (c.lang === "php" && (m = /^\s*foreach\s*\(\s*(.+?)\s+as\s+(?:(\$\w+)\s*=>\s*)?(\$\w+)/.exec(s))) { if (dirty(m[1])) { set.add(m[3]); if (m[2]) set.add(m[2]); } }
      set.delete("");
    }
    mkRe();
    if (set.size === before) break;
  }
  return re;
}
function nthArg(args, k) {
  let depth = 0, start = 0, idx = 0;
  for (let i = 0; i < args.length; i++) {
    const ch = args[i];
    if (ch === "(" || ch === "[" || ch === "{") depth++;
    else if (ch === ")" || ch === "]" || ch === "}") depth--;
    else if (ch === "," && depth === 0) { if (idx === k) return args.slice(start, i); idx++; start = i + 1; }
  }
  return idx === k ? args.slice(start) : "";
}
function argsAt(c, view, end) {
  if (c.code[end - 1] === "(") { const close = c.br.pair[end - 1]; return c[view].slice(end, close > 0 ? close : end + 300); }
  let e = end; while (e < end + 400 && e < c.code.length && c.code[e] !== ";" && c.code[e] !== "\n") e++;
  return c[view].slice(end, e);
}

// ---------- sinks: calls that become dangerous if user input reaches them ----------
const EVALP = "Runs text as code, so attacker-controlled text could take over the app.", EVALT = "Text that can come from a user is run as code here, so an attacker could take over the app.";
const SHP = "Runs a command through the shell, so odd characters in the input can run extra commands.", SHT = "Request data ends up in a shell command, so an attacker can run their own commands on your server.";
const SQLP = "A database question is built from pieces, which allows SQL injection.", SQLT = "Request data is glued into a database question, so an attacker can read or change your data (SQL injection).", SQLF = "Use placeholders (parameterized queries) and pass the values separately.";
const PATHP = "Opens a file whose path is built from input.", PATHT = "A file path comes from the request, so a visitor can read or overwrite files outside the intended folder (path traversal).", PATHF = "Resolve the path and check it stays inside one allowed folder, or use only the base file name.";
const REDP = "Sends visitors to an address.", REDT = "Visitors are sent to an address taken from the request, which enables phishing redirects.", REDF = "Only redirect to a fixed list of allowed addresses or to paths on your own site.";
const SSRFP = "Fetches an address.", SSRFT = "The server fetches an address taken from the request, so an attacker can make it call internal services (SSRF).", SSRFF = "Allow only known hosts and block private network addresses.";
const XSSP = "Puts text into the page.", XSST = "Request data is written into the page without escaping, so a crafted link can run script in a visitor's browser (XSS).", XSSF = "Escape the text, use textContent, or sanitize the HTML first.";
const DESP = "Loads saved data in a way that can run code hidden inside it.", DEST = "Data that can come from a user is loaded in a way that runs code hidden inside it, which gives an attacker control.", DESF = "Use json, or yaml.safe_load.";
const REGP = "Builds a pattern from text.", REGT = "A pattern is built from request data, so an attacker can freeze the server with a nasty pattern or change what it matches.", REGF = "Escape the text first, or avoid user-built patterns.";
const SERVERISH = /\b(?:express|fastify|koa|hapi|NextRequest|NextApiRequest|createServer|restify)\b|\(\s*req\s*,\s*res\b/;
// JS / TS
S("eval", "danger", 3, 5, "js", /(?<![\w.$])eval\s*\(/, EVALP, EVALT, "Use JSON.parse or a real parser.");
S("newfn", "danger", 3, 5, "js", /\bnew\s+Function\s*\(/, "Builds code from text at runtime, which is eval in disguise.", EVALT, "Replace it with a normal function or a lookup table.");
S("timeoutstr", "danger", 3, 5, "js", /\b(?:setTimeout|setInterval)\s*\(\s*(?=["'`])/, "A string is passed to setTimeout, which runs it like eval.", EVALT, "Pass a function instead.", { lit: 1 });
S("shell", "danger", 3, 5, "js", /(?<![\w.$])(?:exec|execSync)\s*\(|\bchild_process\.(?:exec|execSync)\s*\(/, SHP, SHT, "Use execFile / spawn with the arguments as a list.", { gate: /child_process/ });
S("html", "danger", 3, 5, "js", /[\w$\])]\.(?:innerHTML|outerHTML)\s*\+?=(?!=)/, XSSP + " It is parsed as HTML, so script could be injected.", XSST, XSSF);
S("docwrite", "danger", 3, 5, "js", /\bdocument\.write(?:ln)?\s*\(/, XSSP + " It is parsed as HTML, so script could be injected.", XSST, XSSF);
S("insadj", "danger", 3, 5, "js", /\.insertAdjacentHTML\s*\(/, XSSP + " It is parsed as HTML, so script could be injected.", XSST, XSSF, { all: 1 });
S("dsi", "danger", 2, 5, "js", /\bdangerouslySetInnerHTML\s*=\s*\{\{?\s*__html\s*:/, "React is told to skip escaping here, so injected script would run.", XSST, "Sanitize with DOMPurify, or render it as normal React text.");
S("jqhtml", "danger", 0, 4, "js", /\.(?:html|append|prepend|after|before)\s*\(/, XSSP, XSST, XSSF, { needTaint: 1 });
S("sendxss", "danger", 0, 4, "js", /\bres\.(?:send|write|end)\s*\(/, XSSP, XSST, XSSF, { needTaint: 1 });
S("path", "danger", 0, 4, "js", /\b(?:readFile|readFileSync|createReadStream|sendFile|writeFile|writeFileSync|appendFile|unlink|unlinkSync|readdirSync|readdir|rmSync|download)\s*\(/, PATHP, PATHT, PATHF, { needTaint: 1 });
S("redirect", "danger", 0, 3, "js", /\bres\.redirect\s*\(|(?<![\w$.])(?:window\.|document\.|top\.)?location(?:\.href)?\s*=(?!=)|\blocation\.(?:replace|assign)\s*\(|\bwindow\.open\s*\(/, REDP, REDT, REDF, { needTaint: 1 });
S("ssrf", "danger", 0, 4, "js", /(?<![\w$.])(?:fetch|axios(?:\.(?:get|post|put|delete|request))?|got|needle\.\w+|superagent\.\w+)\s*\(|\bhttps?\.(?:get|request)\s*\(/, SSRFP, SSRFT, SSRFF, { needTaint: 1, gate: SERVERISH });
S("nosql", "danger", 0, 4, "js", /\.(?:find|findOne|findOneAndUpdate|updateOne|updateMany|deleteOne|deleteMany|countDocuments)\s*\(/, "A database filter is built from input.", "The whole request object is used as a database filter, so an attacker can send operators like {\"$ne\": null} to skip checks (NoSQL injection).", "Pick the fields you expect and convert them to strings.", { needTaint: 1, argOk: (a) => /^\s*(?:req\.(?:body|query)\b[\w.]*|[\w$]+)\s*(?:,|$)/.test(a) });
S("protopoll", "danger", 0, 3, "js", /\b(?:Object\.assign|_\.(?:merge|defaultsDeep|extend|set)|deepmerge|\$\.extend|merge)\s*\(/, "Merges objects.", "Request data is merged into another object, which allows prototype pollution (an attacker adding properties to every object).", "Copy only the fields you expect.", { needTaint: 1, all: 1 });
S("jssql", "danger", 0, 5, "js", /\b(?:db|pool|client|conn|connection|knex|sequelize|database|sqlite|mysql|pg)\w*\.(?:query|execute|raw|run|all|get|each|prepare|exec)\s*\(/i, SQLP, SQLT, SQLF, { needTaint: 1 });
S("regexp", "danger", 0, 3, "js", /\bnew\s+RegExp\s*\(/, REGP, REGT, REGF, { needTaint: 1 });
// Python
S("eval", "danger", 3, 5, "py", /(?<![\w.])eval\s*\(/, EVALP, EVALT, "Use ast.literal_eval or json.loads.");
S("pyexec", "danger", 3, 5, "py", /(?<![\w.])exec\s*\(/, "Runs text as Python code.", EVALT, "Avoid exec; call functions directly.");
S("shell", "danger", 3, 5, "py", /\bos\.(?:system|popen)\s*\(|\bsubprocess\.(?:call|run|Popen|check_output|check_call)\s*\(|\bcommands\.getoutput\s*\(/, SHP, SHT, "Pass the command and its arguments as a list, with shell=False.", { all: 1, argOk: (a, m) => !/^subprocess/.test(m[0]) || /shell\s*=\s*True/.test(a) });
S("pickle", "danger", 4, 5, "py", /\b(?:pickle|cPickle|dill|marshal|shelve)\.(?:loads?|open)\s*\(|\byaml\.(?:unsafe_load|load)\s*\(/, DESP, DEST, DESF, { lit: 1, all: 1, argOk: (a, m) => !/^yaml\.load/.test(m[0]) || !/(?:Safe|Base)Loader/.test(a) });
S("pysql", "danger", 0, 5, "py", /\.(?:execute|executemany|executescript|raw)\s*\(/, SQLP, SQLT, SQLF, { needTaint: 1 });
S("path", "danger", 0, 4, "py", /(?<![\w.])open\s*\(|\bos\.(?:remove|unlink|listdir|rmdir|makedirs)\s*\(|\bshutil\.\w+\s*\(|\bsend_file\s*\(|\bFileResponse\s*\(|\bos\.path\.join\s*\(/, PATHP, PATHT, PATHF, { needTaint: 1, all: 1 });
S("redirect", "danger", 0, 3, "py", /(?<![\w.])(?:redirect|HttpResponseRedirect|RedirectResponse)\s*\(/, REDP, REDT, REDF, { needTaint: 1 });
S("ssrf", "danger", 0, 4, "py", /\brequests\.(?:get|post|put|delete|head|patch|request)\s*\(|\burllib\.request\.urlopen\s*\(|(?<![\w.])urlopen\s*\(|\bhttpx\.(?:get|post|request)\s*\(|\baiohttp\.request\s*\(/, SSRFP, SSRFT, SSRFF, { needTaint: 1 });
S("xss", "danger", 0, 4, "py", /(?<![\w.])(?:render_template_string|Markup|mark_safe|HttpResponse)\s*\(/, XSSP, XSST, XSSF, { needTaint: 1 });
S("dynimport", "danger", 0, 4, "py", /(?<![\w.])__import__\s*\(|\bimportlib\.import_module\s*\(/, "Imports a module by name.", "A module name comes from the request, so an attacker can make the app load code they choose.", "Look the name up in a fixed list.", { needTaint: 1 });
S("regexp", "danger", 0, 3, "py", /\bre\.(?:compile|match|search|sub|findall|fullmatch)\s*\(/, REGP, REGT, REGF, { needTaint: 1 });
S("notimeout", "weak", 2, 2, "py", /\brequests\.(?:get|post|put|delete|head|patch|request)\s*\(/, "A web request has no timeout, so one slow server can freeze this program forever.", "A web request has no timeout, so one slow server can freeze this program forever.", "Pass timeout=10 (or similar).", { lit: 1, all: 1, argOk: (a) => !/\btimeout\s*=|\*\*/.test(a) });
// PHP (arguments are read from the text view because "$var" inside double quotes is an interpolation)
const PH = { view: "text" };
S("phpinc", "danger", 0, 5, "php", /\b(?:include|require)(?:_once)?\b\s*\(?\s*/, "Loads a page.", "A page is loaded from a path the visitor controls, which can run attacker code or leak files.", PATHF, { ...PH, needTaint: 1 });
S("eval", "danger", 4, 5, "php", /\beval\s*\(/, EVALP, EVALT, "Remove eval.", PH);
S("shell", "danger", 4, 5, "php", /\b(?:system|exec|shell_exec|passthru|popen|proc_open|pcntl_exec)\s*\(/, SHP, SHT, "Use escapeshellarg on every value, or avoid the shell.", PH);
S("unser", "danger", 4, 5, "php", /\bunserialize\s*\(/, DESP, DEST, "Use json_decode.", { ...PH, lit: 1 });
S("echo", "danger", 0, 4, "php", /\b(?:echo|print)\b[ \t(]*/, XSSP, XSST, "Wrap it in htmlspecialchars().", { ...PH, needTaint: 1 });
S("path", "danger", 0, 4, "php", /\b(?:file_get_contents|fopen|readfile|file_put_contents|unlink|move_uploaded_file|copy|rename|mkdir|rmdir|highlight_file|show_source)\s*\(/, PATHP, PATHT, PATHF, { ...PH, needTaint: 1, all: 1 });
S("phpsql", "danger", 0, 5, "php", /\b(?:mysqli?_query|pg_query|sqlite_query)\s*\(|->(?:query|exec|prepare)\s*\(/, SQLP, SQLT, "Use prepared statements with bound parameters.", { ...PH, needTaint: 1, all: 1 });
S("redirect", "danger", 0, 3, "php", /\bheader\s*\(\s*["']Location:/, REDP, REDT, REDF, { ...PH, needTaint: 1 });
S("extract", "danger", 0, 4, "php", /\bextract\s*\(/, "Turns array keys into variables.", "Request data is turned into variables, so a visitor can overwrite any variable.", "Read the fields you expect one by one.", { ...PH, needTaint: 1 });
// Ruby
S("eval", "danger", 3, 5, "rb", /(?<![\w.])eval\s*\(?/, EVALP, EVALT, "Avoid eval.");
S("rbsend", "danger", 0, 4, "rb", /\b(?:send|public_send|constantize|safe_constantize)\b\s*\(?/, "Calls a method by name.", "A method or class name comes from the request, so an attacker can call things you never meant to expose.", "Look the name up in a fixed list.", { needTaint: 1 });
S("shell", "danger", 3, 5, "rb", /(?<![\w.])(?:system|exec|spawn)\s*\(|\bIO\.popen\s*\(|\bOpen3\.\w+\s*\(/, SHP, SHT, "Pass the command and its arguments separately.", { all: 1 });
S("path", "danger", 0, 4, "rb", /\b(?:File\.(?:read|open|write|delete|foreach)|IO\.read|send_file)\s*\(?/, PATHP, PATHT, PATHF, { needTaint: 1 });
S("redirect", "danger", 0, 3, "rb", /\bredirect_to\b\s*\(?/, REDP, REDT, REDF, { needTaint: 1 });
S("rbdeser", "danger", 3, 5, "rb", /\b(?:Marshal\.load|YAML\.load)\s*\(/, DESP, DEST, "Use YAML.safe_load or JSON.", { lit: 1 });
// Java / Kotlin / C#
S("shell", "danger", 3, 5, "java kt", /\bRuntime\.getRuntime\(\)\.exec\s*\(|\bnew\s+ProcessBuilder\s*\(/, SHP, SHT, "Pass the arguments as a list and never through a shell.", { all: 1 });
S("shell", "danger", 3, 5, "cs", /\bProcess\.Start\s*\(|\bnew\s+ProcessStartInfo\s*\(/, SHP, SHT, "Pass the arguments separately and avoid the shell.", { all: 1 });
S("jsql", "danger", 0, 5, "java kt cs", /\.(?:executeQuery|executeUpdate|execute|createQuery|createNativeQuery|prepareStatement|queryForList|queryForObject|nativeQuery|ExecuteReader|ExecuteNonQuery|ExecuteScalar|FromSqlRaw)\s*\(|\bnew\s+(?:SqlCommand|MySqlCommand|NpgsqlCommand)\s*\(/, SQLP, SQLT, SQLF, { needTaint: 1 });
S("path", "danger", 0, 4, "java kt cs", /\bnew\s+(?:File|FileInputStream|FileReader|FileOutputStream|FileWriter)\s*\(|\bPaths\.get\s*\(|\bFiles\.(?:read\w*|write\w*|delete\w*|newInputStream|newOutputStream|copy|move)\s*\(|\bFile\.(?:ReadAll\w*|WriteAll\w*|Open\w*|Delete|Copy|Move)\s*\(|\bPath\.Combine\s*\(/, PATHP, PATHT, PATHF, { needTaint: 1, all: 1 });
S("redirect", "danger", 0, 3, "java kt cs", /\.sendRedirect\s*\(|\breturn\s+Redirect\s*\(|\bRedirect\s*\(/, REDP, REDT, REDF, { needTaint: 1 });
S("ssrf", "danger", 0, 4, "java kt cs", /\bnew\s+URL\s*\(|\bURI\.create\s*\(|\.getForObject\s*\(|\bnew\s+HttpGet\s*\(|\.GetStringAsync\s*\(|\.GetAsync\s*\(/, SSRFP, SSRFT, SSRFF, { needTaint: 1 });
S("jdeser", "danger", 3, 5, "java kt", /\.readObject\s*\(|\bnew\s+XMLDecoder\s*\(/, DESP, DEST, "Use JSON, or a serialization filter.", { lit: 1 });
S("jeval", "danger", 3, 5, "java kt", /\.eval\s*\(/, EVALP, EVALT, "Avoid script engines for untrusted text.", { gate: /ScriptEngine|Nashorn|GroovyShell/ });
S("jxss", "danger", 0, 4, "java kt", /\.getWriter\(\)\.(?:print|println|write|append)\s*\(|\bout\.print(?:ln)?\s*\(/, XSSP, XSST, XSSF, { needTaint: 1 });
S("classfor", "danger", 0, 4, "java kt", /\bClass\.forName\s*\(/, "Loads a class by name.", "A class name comes from the request, so an attacker can load classes you never meant to expose.", "Look the name up in a fixed list.", { needTaint: 1 });
// Go
S("shell", "danger", 0, 5, "go", /\bexec\.Command(?:Context)?\s*\(/, SHP, SHT, "Run the program directly with its arguments, never through sh -c.", { view: "text", all: 1, argOk: (a) => /["`](?:sh|bash|cmd|powershell)["`]\s*,\s*["`](?:-c|\/c)["`]\s*,\s*[^"`\s)]/.test(a), needTaint: 1 });
S("gosql", "danger", 0, 5, "go", /\.(?:Query|QueryRow|Exec|Raw)\s*\(/, SQLP, SQLT, SQLF, { needTaint: 1 });
S("gosql", "danger", 0, 5, "go", /\.(?:QueryContext|ExecContext|QueryRowContext)\s*\(/, SQLP, SQLT, SQLF, { needTaint: 1, idx: 1 });
S("path", "danger", 0, 4, "go", /\b(?:os\.(?:Open|OpenFile|ReadFile|Create|Remove|RemoveAll|Mkdir)|ioutil\.(?:ReadFile|WriteFile)|http\.ServeFile)\s*\(|\bfilepath\.Join\s*\(/, PATHP, PATHT, PATHF, { needTaint: 1, all: 1 });
S("redirect", "danger", 0, 3, "go", /\bhttp\.Redirect\s*\(/, REDP, REDT, REDF, { needTaint: 1, all: 1 });
S("ssrf", "danger", 0, 4, "go", /\bhttp\.(?:Get|Post|NewRequest(?:WithContext)?)\s*\(/, SSRFP, SSRFT, SSRFF, { needTaint: 1, all: 1 });
S("xss", "danger", 3, 5, "go", /\btemplate\.(?:HTML|JS|URL)\s*\(/, "Marks text as safe HTML, so it is not escaped.", XSST, XSSF);
// C / shell
S("csystem", "danger", 3, 5, "c", /(?<![\w.>])(?:system|popen)\s*\(/, SHP, SHT, "Use execv with an argument list.");
S("cstr", "danger", 3, 5, "c", /(?<![\w.>])(?:strcpy|strcat|sprintf|vsprintf|gets)\s*\(/, "Copies text into a buffer with no size limit, so long input overflows it.", "Input from the user is copied into a buffer with no size limit (buffer overflow).", "Use strncpy / snprintf / fgets with the buffer size.", { lit: 1, all: 1, lv: (a, tw, m) => (/^(?:gets)/.test(m[0]) ? 5 : tw ? 5 : /,\s*["'`][ ]*["'`]\s*$/.test(a) ? 2 : 3) });
S("evalsh", "danger", 0, 4, "sh", /(?<![\w.-])eval\s+/, "Runs text as a shell command.", "An argument given to the script is run as a command, so whoever calls it controls the machine.", "Avoid eval; use arrays or case statements.", { needTaint: 1 });

// ======================================================================
//  Structure checks: things that crash
// ======================================================================
function jsClassify(code, o) {
  const h = code.slice(Math.max(0, o - 300), o).replace(/\s+$/, "");
  if (/=>$/.test(h)) {
    const b = h.slice(0, -2).replace(/\s+$/, "");
    if (b.endsWith(")")) {
      let d = 0, k = b.length - 1;
      for (; k >= 0; k--) { if (b[k] === ")") d++; else if (b[k] === "(") { d--; if (d === 0) break; } }
      if (k < 0) return { t: "u" };
      return { t: "f", a: /\basync\s*$/.test(b.slice(0, k)) };
    }
    const m = /([\w$]+)$/.exec(b);
    if (!m) return { t: "u" };
    const pre = b.slice(0, b.length - m[1].length).replace(/\s+$/, "");
    if (/\basync$/.test(pre)) return { t: "f", a: true };
    return /[=(,]$/.test(pre) ? { t: "f", a: false } : { t: "u" };
  }
  if (!h || /[;{}:=(,?&|!+\-*%~^$]$/.test(h) || /(?:^|[^\w$])(?:else|try|finally|do|catch|return|case|default|typeof|void|await|yield|throw|new)$/.test(h)) return { t: "o" };
  if (/(?:^|[^\w$.])(?:class|interface|enum|namespace|module)\b[^{};]*$/.test(h)) return { t: "o" };
  if (h.endsWith(")")) {
    let d = 0, k = h.length - 1;
    for (; k >= 0; k--) { if (h[k] === ")") d++; else if (h[k] === "(") { d--; if (d === 0) break; } }
    if (k < 0) return { t: "u" };
    const pre = h.slice(0, k).replace(/\s+$/, "");
    if (/(?:^|[^\w$.])(?:for\s+await|if|for|while|switch|catch|with)$/.test(pre)) return { t: "o" };
    if (/\bfunction\s*\*?\s*[\w$]*$/.test(pre)) return { t: "f", a: /\basync\s+function\s*\*?\s*[\w$]*$/.test(pre) };
    if (/[\w$#]$/.test(pre)) return { t: "f", a: /\basync\s+(?:(?:static|get|set|public|private|protected|override)\s+)*\*?\s*[\w$#]+$/.test(pre) };
  }
  return { t: "u" };
}
function chkSyntax(c, add) {
  if (!c.structural || !c.br) return;
  const b = c.br;
  let idx, what;
  if (b.err >= 0) { idx = b.err; what = "This `" + c.code[idx] + "` closes something that was never opened."; }
  else if (b.unclosed >= 0) { idx = b.unclosed; what = "This `" + c.code[idx] + "` is never closed."; }
  else return;
  add({ id: "syntax", cat: "broken", plain: what + " The file will fail to compile or load.", fix: "Find the missing or extra bracket; your editor's bracket matching will show where." }, idx, 4);
}
function arrowOpen(t) {
  let d = 0;
  t = t.replace(/^\s+/, "");
  for (const ch of t) {
    if (ch === "(" || ch === "[") d++;
    else if (ch === ")" || ch === "]") { d--; if (d < 0) return false; }
    else if (ch === "\n" && d === 0) return false;
  }
  return true;
}
function chkAwaitJS(c, add) {
  if (!c.structural || !/\bawait\b/.test(c.code)) return;
  const st = [], re = /[{}]|\bawait\b/g;
  let m, k = 0;
  while ((m = re.exec(c.code)) && k < 3) {
    if (m[0] === "{") st.push(jsClassify(c.code, m.index));
    else if (m[0] === "}") st.pop();
    else {
      const i = m.index;
      if (/[\w$.]/.test(c.code[i - 1] || "") || /^\s*[:=,)]/.test(c.code.slice(i + 5, i + 12))) continue;
      const base = Math.max(0, i - 300), seg = c.code.slice(base, i), ar = seg.lastIndexOf("=>");
      let verdict;
      if (ar >= 0 && !/[;{}]/.test(seg.slice(ar)) && arrowOpen(seg.slice(ar + 2))) { const info = jsClassify(c.code, base + ar + 2); verdict = info.t === "f" ? info.a : null; }
      else for (let s = st.length - 1; s >= 0; s--) { const e = st[s]; if (e.t === "f") { verdict = e.a; break; } if (e.t === "u") { verdict = null; break; } }
      if (verdict === false) { add({ id: "awaitjs", cat: "broken", plain: "`await` is used inside a function that is not marked async. That is a syntax error, so the file will not load.", fix: "Add `async` to the function that contains it." }, i, 4); k++; }
    }
  }
}
function inClassBody(c, idx) {
  const o = c.br.encl[idx];
  return o >= 0 && /(?:^|[^\w$.])class\b[^{};]*$/.test(c.code.slice(Math.max(0, o - 300), o));
}
function chkConstJS(c, add) {
  if (!c.structural) return;
  const re = /\bconst\s+([A-Za-z_$][\w$]*)\s*(?::[^=;]+)?=(?![=>])/g;
  let m, k = 0;
  while ((m = re.exec(c.code)) && k < 3) {
    const name = m[1], from = m.index + m[0].length, o = c.br.encl[m.index], end = o >= 0 && c.br.pair[o] > 0 ? c.br.pair[o] : c.code.length;
    const body = c.code.slice(from, end), n = reEsc(name);
    const shadow = new RegExp("\\b(?:const|let|var|function|class)\\s+" + n + "\\b|\\b(?:const|let|var)\\s*[{\\[][^}\\]]*\\b" + n + "\\b|[(,]\\s*" + n + "\\s*(?:[,=]|\\)\\s*(?:=>|\\{|:))|\\(\\s*\\{[^}]*\\b" + n + "\\s*=(?![=>])");
    if (shadow.test(body)) continue;
    const asg = new RegExp("(?<![\\w$.#])" + n + "\\s*(?:[-+*/%&|^]|\\*\\*|<<|>>>?|&&|\\|\\||\\?\\?)?=(?![=>])|(?<![\\w$.#])" + n + "\\s*(?:\\+\\+|--)|(?:\\+\\+|--)[ \\t]*" + n + "(?![\\w$])").exec(body);
    if (asg && !inClassBody(c, from + asg.index) && !/\b(?:static|public|private|protected|readonly)\s+$/.test(c.code.slice(Math.max(0, from + asg.index - 20), from + asg.index))) { add({ id: "constasg", cat: "broken", plain: "`" + name + "` is declared with const but assigned again here. That throws \"Assignment to constant variable\" when it runs.", fix: "Declare it with let, or stop reassigning it." }, from + asg.index, 4); k++; }
  }
}
function inTry(c, idx) {
  let o = c.br.encl[idx], guard = 0;
  while (o >= 0 && guard++ < 40) {
    if (/\btry\s*$/.test(c.code.slice(Math.max(0, o - 12), o))) return true;
    if (jsClassify(c.code, o).t === "f") return false;
    o = c.br.encl[o];
  }
  return false;
}
function chkJsonParse(c, add) {
  const re = /\bJSON\.parse\s*\(/g;
  let m, k = 0;
  while ((m = re.exec(c.code)) && k < 3) {
    const a = nthArg(argsAt(c, "code", m.index + m[0].length), 0);
    if (!(c.taintRe && c.taintRe.test(a)) && !TSRC.js.test(a) && !/\b(?:localStorage|sessionStorage)\.getItem|\bprocess\.argv\b/.test(a)) continue;
    if (inTry(c, m.index)) continue;
    add({ id: "jsonparse", cat: "sloppy", plain: "JSON.parse throws on malformed input and nothing here catches it, so one bad value crashes this code path.", fix: "Wrap it in try/catch and fall back to a default." }, m.index, 2); k++;
  }
}
function chkUnreach(c, add) {
  const L = c.clines, py = c.lang === "py";
  const term = py ? /^\s*(?:return\b[^\n]*|raise\b[^\n]*|break|continue)\s*$/ : /^\s*(?:return\b[^{}\n]*;|throw\b[^{}\n]*;|break\s*;|continue\s*;)\s*$/;
  const bal = (s) => { let d = 0; for (const ch of s) { if ("([{".includes(ch)) d++; else if (")]}".includes(ch)) d--; } return d === 0; };
  let k = 0;
  for (let i = 0; i < L.length && k < 3; i++) {
    const t = L[i];
    if (!term.test(t) || !bal(t)) continue;
    let p = i - 1; while (p >= 0 && !L[p].trim()) p--;
    if (p >= 0 && !py && /^\s*(?:\}\s*)?(?:if|for|while|else)\b[^{;]*$/.test(L[p]) && !/[{;]\s*$/.test(L[p])) continue;   // brace-less if/else: the return is conditional
    if (p >= 0 && py && /:\s*$/.test(L[p]) === false && /^\s*(?:if|elif|else)\b/.test(L[p])) continue;
    let q = i + 1; while (q < L.length && !L[q].trim()) q++;
    if (q >= L.length) continue;
    const nx = L[q];
    if (indentOf(nx) !== indentOf(t) || /^\s*["'`]/.test(nx) || /("""|\'\'\')/.test(t.replace(/("""|\'\'\')(?:(?!\1)[\s\S])*\1/g, ""))) continue;
    if (py ? /^\s*(?:else|elif|except|finally|case|[)\]}])/.test(nx) : /^\s*(?:[})\]]|case\b|default\b|else\b|catch\b|finally\b|function\b|class\b|async\s+function\b|export\b|@)/.test(nx)) continue;
    add({ id: "unreach", cat: "broken", plain: "This code comes right after a return, throw or break, so it can never run.", fix: "Delete it, or move it before the return." }, c.starts[q], 2); k++;
  }
}
const PYKW = /^(?:if|elif|else|for|while|try|except|finally|with|def|class|async\s+def|async\s+for|async\s+with)\b/;
function pyEnclosing(L, i) {
  let cur = indentOf(L[i]);
  for (let j = i - 1; j >= 0 && cur > 0; j--) {
    const s = L[j];
    if (!s.trim() || /^\s*[)\]}]/.test(s)) continue;
    const ind = indentOf(s);
    if (ind >= cur) continue;
    const m = /^\s*(async\s+def|def|class)\b/.exec(s);
    if (m) return m[1].startsWith("async") ? "adef" : m[1];
    cur = ind;
  }
  return null;
}
function chkPy(c, add) {
  const L = c.clines;
  let depth = 0, kc = 0, ka = 0, ks = 0;
  for (let i = 0; i < L.length; i++) {
    const ln = L[i], t = ln.trim(), sd = depth;
    for (let q = 0; q < ln.length; q++) { const ch = ln[q]; if (ch === "(" || ch === "[" || ch === "{") depth++; else if (ch === ")" || ch === "]" || ch === "}") depth--; }
    if (depth < 0) depth = 0;
    if (!t) continue;
    if (ka < 3 && (/\bawait\b/.test(t) || /^async\s+(?:for|with)\b/.test(t)) && !/^(?:async\s+def|def|class)\b/.test(t)) {
      const e = pyEnclosing(L, i);
      if (e !== "adef") { add({ id: "pyawait", cat: "broken", plain: "`await` is used outside an `async def` function. That is a SyntaxError, so the file will not import.", fix: "Make the enclosing function `async def`, or run the coroutine with asyncio.run()." }, c.starts[i] + ln.indexOf(t), e === null ? 3 : 4); ka++; }
    }
    if (sd > 0 || (i > 0 && /\\\s*$/.test(L[i - 1]))) continue;
    if (kc < 3 && PYKW.test(t)) {
      let d = 0, colon = false;
      for (let j = i; j < L.length && j < i + 15; j++) {
        for (const ch of L[j]) { if ("([{".includes(ch)) d++; else if (")]}".includes(ch)) d--; else if (ch === ":" && d === 0) colon = true; }
        if (d <= 0 && !/\\\s*$/.test(L[j])) break;
      }
      if (!colon && d === 0) { add({ id: "pycolon", cat: "broken", plain: "This statement is missing its colon at the end. That is a SyntaxError, so the file will not import.", fix: "Add the `:`." }, c.starts[i] + ln.indexOf(t), 4); kc++; }
    }
    if (ks < 3 && /^def\s+\w+\s*\(\s*\)/.test(t)) {
      const nm = /^def\s+(\w+)/.exec(t)[1];
      let p = i - 1; while (p >= 0 && !L[p].trim()) p--;
      if (!/^__(?:new|init_subclass|class_getitem)__$/.test(nm) && !(p >= 0 && /^\s*@/.test(L[p])) && pyEnclosing(L, i) === "class") {
        add({ id: "noself", cat: "broken", plain: "This method inside a class takes no `self`, so calling it on an object raises TypeError (\"takes 0 positional arguments but 1 was given\"). That is fine only if it is always called on the class itself.", fix: "Add `self` as the first parameter, or mark it @staticmethod." }, c.starts[i] + ln.indexOf(t), 2); ks++;
      }
    }
  }
}
function chkC(c, add) {
  if (c.lang !== "c") return;
  const L = c.clines;
  let m, k = 0;
  const alloc = /(\w+)\s*=\s*(?:\([^)]*\)\s*)?(?:malloc|calloc)\s*\(/g;
  while ((m = alloc.exec(c.code)) && k < 3) {
    const name = m[1], ln = lineOf(c.starts, m.index), after = L.slice(ln, ln + 6).join("\n"), n = reEsc(name);
    const use = new RegExp("\\*\\s*" + n + "\\b|\\b" + n + "\\s*(?:->|\\[)|\\b(?:memcpy|memset|strcpy|strncpy|strcat|sprintf|snprintf|fread|fgets|read|memmove)\\s*\\(\\s*" + n + "\\b").exec(after);
    if (!use) continue;
    const chk = new RegExp("!\\s*" + n + "\\b|\\b" + n + "\\s*(?:==|!=)\\s*(?:NULL|0|nullptr)|\\bif\\s*\\(\\s*" + n + "\\s*\\)|\\bassert\\s*\\(\\s*" + n + "\\b|(?:NULL|nullptr)\\s*(?:==|!=)\\s*" + n).exec(after);
    if (chk && chk.index < use.index) continue;
    add({ id: "nullchk", cat: "broken", plain: "The result of malloc is used without checking for NULL. If memory runs out, this crashes.", fix: "Check `if (!p) { ... }` right after allocating." }, m.index, 3); k++;
  }
  const fr = /\bfree\s*\(\s*(\w+)\s*\)\s*;/g;
  k = 0;
  while ((m = fr.exec(c.code)) && k < 3) {
    const name = m[1], n = reEsc(name), ln = lineOf(c.starts, m.index);
    for (let j = ln; j < Math.min(L.length, ln + 12); j++) {
      const s = L[j];
      if (/[}]/.test(s) || new RegExp("\\b" + n + "\\s*=(?!=)").test(s) || /\b(?:return|break|continue|goto)\b/.test(s)) break;
      if (new RegExp("\\bfree\\s*\\(\\s*" + n + "\\s*\\)").test(s)) { add({ id: "dblfree", cat: "broken", plain: "`" + name + "` is freed twice. Freeing twice corrupts memory and often crashes.", fix: "Set the pointer to NULL after freeing, and free it only once." }, c.starts[j], 4); k++; break; }
      if (new RegExp("\\b" + n + "\\s*(?:->|\\[)|\\*\\s*" + n + "\\b").test(s)) { add({ id: "uaf", cat: "broken", plain: "`" + name + "` is used after it was freed. That reads freed memory, which can crash or be exploited.", fix: "Do not touch the pointer after free(); set it to NULL." }, c.starts[j], 4); k++; break; }
    }
  }
}
function chkGoDefer(c, add) {
  if (c.lang !== "go" || !/\bdefer\b/.test(c.code)) return;
  const st = [], re = /[{}]|\bdefer\b/g;
  let m, k = 0;
  while ((m = re.exec(c.code)) && k < 3) {
    if (m[0] === "{") { const h = c.code.slice(Math.max(0, m.index - 200), m.index), h2 = h.slice(Math.max(h.lastIndexOf("{"), h.lastIndexOf("}")) + 1); st.push(/^\s*for\b/.test(h2) ? "l" : /\bfunc\b/.test(h2) ? "f" : "o"); }
    else if (m[0] === "}") st.pop();
    else for (let s = st.length - 1; s >= 0; s--) { if (st[s] === "f") break; if (st[s] === "l") { add({ id: "godefer", cat: "leak", plain: "`defer` inside a loop only runs when the whole function ends, so resources pile up until then.", fix: "Move the body into its own function, or close the resource directly." }, m.index, 2); k++; break; } }
  }
}
// relative imports that point at nothing, and packages missing from package.json
const JS_EXT = ["js", "jsx", "ts", "tsx", "mjs", "cjs", "mts", "cts", "json", "vue", "svelte", "node", "css", "scss", "less"];
const NODE_BUILTIN = new Set("assert buffer child_process cluster console constants crypto dgram diagnostics_channel dns domain events fs http http2 https inspector module net os path perf_hooks process punycode querystring readline repl stream string_decoder sys timers tls trace_events tty url util v8 vm wasi worker_threads zlib test".split(" "));
const HOSTED = new Set(["electron", "vscode", "obsidian", "bun", "deno"]);
const GENERATED = /(^|\/)(dist|build|out|generated|gen|\.next|public|static|assets)\//;
function resolveRel(from, spec, repo) {
  const parts = from.split("/").slice(0, -1);
  for (const seg of spec.split("/")) { if (seg === "." || seg === "") continue; if (seg === "..") { if (!parts.length) return true; parts.pop(); } else parts.push(seg); }
  const base = parts.join("/");
  if (GENERATED.test(base + "/")) return true;
  const cands = [base];
  for (const e of JS_EXT) { cands.push(base + "." + e); cands.push(base + "/index." + e); }
  cands.push(base + "/package.json");
  if (/\.[mc]?jsx?$/.test(base)) { const stem = base.replace(/\.[mc]?jsx?$/, ""); ["ts", "tsx", "mts", "cts"].forEach((e) => cands.push(stem + "." + e)); }
  if (cands.some((x) => repo.paths.has(x))) return true;
  return cands.some((x) => repo.lower.has(x.toLowerCase())) ? "case" : false;
}
function chkImports(c, add, repo) {
  if (!repo || repo.truncated || c.test) return;
  if (c.lang === "js") {
    const re = /\b(?:import|export)\s+(?:type\s+)?(?:[^'"`;]*?\s+from\s+)?(["'])([ ]+)\1|\brequire\s*\(\s*(["'])([ ]+)\3\s*\)|\bimport\s*\(\s*(["'])([ ]+)\5\s*\)/dg;
    const pkg = repo.nearestPkg(c.path), seenPk = new Set();
    let m, k = 0;
    while ((m = re.exec(c.code)) && k < 4) {
      const g = m[2] ? 2 : m[4] ? 4 : 6, spec = c.text.slice(m.indices[g][0], m.indices[g][1]);
      if (!spec || /[?!]|\$\{|\s/.test(spec)) continue;
      if (/^\.{1,2}(?:\/|$)/.test(spec)) {
        const r = resolveRel(c.path, spec, repo);
        if (r === false) { add({ id: "badimport", cat: "broken", plain: "Imports \u201c" + spec + "\u201d, but no such file exists in the repository (unless it is generated or git-ignored). Running this will fail with \u201cCannot find module\u201d.", fix: "Fix the path, or add the missing file." }, m.index, 3); k++; }
        else if (r === "case") { add({ id: "caseimport", cat: "broken", plain: "Imports \u201c" + spec + "\u201d, which only matches a file if upper/lower case is ignored. It works on Windows and Mac but breaks on Linux servers.", fix: "Make the capital letters in the path match the real file name." }, m.index, 3); k++; }
      } else if (pkg && pkg.deps.size) {
        if (/^(?:node:|[~#$@]\/|@@|virtual:|astro:|npm:|bun:|https?:|data:|file:)/.test(spec) || /^[~#$]/.test(spec)) continue;
        const name = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0];
        if (NODE_BUILTIN.has(name) || HOSTED.has(name) || pkg.deps.has(name) || name === pkg.name || repo.pkgNames.has(name) || repo.dirNames.has(name.split("/")[0]) || seenPk.has(name) || pkg.skip) continue;
        seenPk.add(name);
        add({ id: "nodep", cat: "broken", plain: "Imports \u201c" + name + "\u201d, but package.json does not list it. On a fresh install this fails with \u201cCannot find module\u201d.", fix: "Run npm install " + name + " to add it to package.json." }, m.index, 3); k++;
      }
    }
  } else if (c.lang === "py") {
    let k = 0;
    for (let i = 0; i < c.clines.length && k < 4; i++) {
      const m = /^\s*from\s+(\.+)([\w.]*)\s+import\b/.exec(c.clines[i]);
      if (!m || !m[2]) continue;
      const parts = c.path.split("/").slice(0, -1);
      let ok = true;
      for (let q = 1; q < m[1].length; q++) { if (!parts.length) { ok = false; break; } parts.pop(); }
      if (!ok) continue;
      const base = [...parts, ...m[2].split(".")].join("/");
      if (repo.paths.has(base + ".py") || repo.paths.has(base + ".pyi") || repo.paths.has(base + "/__init__.py") || repo.dirs.has(base) || GENERATED.test(base + "/")) continue;
      add({ id: "badimport", cat: "broken", plain: "Imports from \u201c" + m[1] + m[2] + "\u201d, but no such module exists in the repository. Importing this file raises ModuleNotFoundError.", fix: "Fix the module name, or add the missing file." }, c.starts[i], 3); k++;
    }
  }
}

// ======================================================================
//  Notes to self (TODO / FIXME / ...): scored, so only the meaningful ones stand alone
// ======================================================================
const TODO_RX = /(?<![\w])(TODO|FIXME|HACK|XXX|BUG|KLUDGE|REFACTOR)(?![\w])\s*(?:\([^)\n]*\))?\s*[:\-\u2013]?\s*([^\n]*)/g;
const SECW = /secur|passw|auth|vulnerab|inject|leak|crypt|token|sanitiz|xss|csrf|sql|permission|privilege|escape/i;
const RISKW = /\b(?:crash(?:es)?|break(?:s)?|broken|wrong|fail(?:s)?|race|deadlock|unsafe|workaround|temporary|temp|hard-?coded|bypass|disabled|insecure|overflow|null|corrupt|data loss|remove before|do not ship|don'?t ship|do not merge|production|prod)\b/i;
const STALE = /\b(?:done|fixed|resolved|solved|no longer|not needed|obsolete|n\/a|nvm|never ?mind|already (?:done|fixed|handled|implemented)|implemented|handled|works now|outdated|wontfix|won'?t fix)\b/i;
const TRACKED = /#\d+|\b[A-Z]{2,}-\d+\b|issues?\/\d+|https?:\/\/\S+/;
const STOP = new Set("implement handle should later something better proper check figure support make need needs really temporary function method class thing things there their which would could about after before other these those using where while without".split(" "));
function addressed(t, c) {
  const words = (t.txt.toLowerCase().match(/[a-z]{6,}/g) || []).filter((w) => !STOP.has(w));
  if (!words.length) return false;
  let seen = 0, got = "";
  for (let i = t.line; i < c.clines.length && seen < 6; i++) if (c.clines[i].trim()) { got += " " + c.clines[i].toLowerCase(); seen++; }
  return words.some((w) => got.includes(w.slice(0, 6)));
}
function collectTodos(c) {
  const out = [];
  for (const cm of c.comments) {
    const body = c.src.slice(cm.a, cm.b);
    TODO_RX.lastIndex = 0;
    let m;
    while ((m = TODO_RX.exec(body)) && out.length < 80) {
      const tag = m[1], txt = m[2].replace(/\*\/|-->/g, "").replace(/^\s*\*+\s*/, "").trim();
      if (tag === "XXX" && (body[m.index + 3] === "-" || /^[X\-\d\s]*$/i.test(txt))) continue;
      const t = { tag, txt: txt.slice(0, 160), line: lineOf(c.starts, cm.a + m.index), file: c.path, test: c.test };
      let s = /BUG|FIXME/.test(tag) ? 3 : /HACK|XXX|KLUDGE/.test(tag) ? 2 : tag === "TODO" ? 1 : 0;
      if (SECW.test(txt)) s += 3;
      if (RISKW.test(txt)) s += 2;
      if (txt.split(/\s+/).filter(Boolean).length >= 4) s += 1;
      if (TRACKED.test(txt)) s -= 2;
      if (STALE.test(txt)) s -= 3;
      if (txt.length < 3) s -= 2;
      if (addressed(t, c)) s -= 2;
      if (c.test) s -= 2;
      t.score = s;
      out.push(t);
    }
  }
  return out;
}

// ======================================================================
//  Scan one file
// ======================================================================
function looksMinified(s) {
  if (s.length < 4000) return false;
  let max = 0, cur = 0, lines = 1;
  for (let i = 0; i < s.length; i++) { if (s.charCodeAt(i) === 10) { if (cur > max) max = cur; cur = 0; lines++; } else cur++; }
  if (cur > max) max = cur;
  if (max > 2500 || s.length / lines > 300) return true;
  return s.length > 60000 && /^\s*\/[*!][\s\S]{0,300}?(?:@license|\bv\d+\.\d+\.\d+|Copyright \(c\))/.test(s);
}
function scanFile(path, content, repo) {
  const res = { out: [], todos: [], skipped: false };
  const lang = langOf(path);
  if (!lang) return res;
  if (looksMinified(content)) { res.skipped = true; return res; }
  const test = TEST_PATH.test(path), lx = lex(content, lang), starts = lineIndex(content), lines = content.split("\n");
  const c = { path, lang, src: content, code: lx.code, text: lx.text, bad: lx.bad, test, starts, lines, comments: lx.comments };
  c.clines = c.code.split("\n");
  c.near = (idx) => { const l = lineOf(starts, idx); return (lines[l - 2] || "") + "\n" + (lines[l - 1] || "") + "\n" + (lines[l] || ""); };
  const jsx = lang === "js" && (/\.(?:jsx|tsx|vue|svelte)$/i.test(path) || /<\/[A-Za-z][\w.]*>|\/>/.test(content));
  c.structural = !lx.bad && !jsx && /^(?:js|java|go|py|kt)$/.test(lang);
  c.br = LEX[lang] && !LEX[lang].only ? brackets(c.code) : { pair: new Int32Array(0), encl: new Int32Array(0), err: -1, unclosed: -1 };
  const snippet = (line) => {
    const o = [];
    for (let l = Math.max(1, line - 1); l <= Math.min(lines.length, line + 1); l++) { const t = (lines[l - 1] || "").replace(/\t/g, "  ").slice(0, 160); if (t.trim() || l === line) o.push(String(l).padStart(4) + (l === line ? " > " : "   ") + t); }
    return o.join("\n").slice(0, 600);
  };
  const add = (r, idx, level, o) => {
    if (res.out.length > 300) return;
    const line = lineOf(starts, idx), keepsAlways = r.cat === "secret" || r.cat === "broken";
    if (test && !keepsAlways && (r.noTest || level < 3)) return;
    const lv = test && r.cat !== "broken" ? Math.max(1, level - 2) : level, raw = lines[line - 1] || "";
    const v = o && o.secret;
    res.out.push({ cat: r.cat, rule: r.id, level: lv, file: path, line, snippet: r.cat === "secret" ? (v ? hide(raw, v) : raw).trim().slice(0, 220) : snippet(line), one: (v ? hide(raw, v) : raw).trim().slice(0, 110), plain: (o && o.plain) || r.plain, fix: r.fix, test, tag: o && o.tag, pile: r.pile, pileText: r.pileText, pileIf: r.pileIf });
  };
  // 1. plain rules, run over the cleaned-up file so comments and strings cannot trigger them
  for (const r of RULES) {
    if ((r.langs && !r.langs.includes(lang)) || (r.p && !r.p.test(path)) || (r.gate && !r.gate.test(content)) || (r.absent && r.absent.test(content))) continue;
    const hay = r.view === "src" ? content : r.view === "text" ? c.text : c.code;
    r.re.lastIndex = 0;
    let m, k = 0;
    while ((m = r.re.exec(hay)) && k < 12) {
      if (m[0] === "") { r.re.lastIndex++; continue; }
      if (r.ok && !r.ok(m, c)) continue;
      if (r.decoy && DECOY.test(m[1] || m[0])) continue;
      add(r, m.index, r.lvl ? r.lvl(m, c) : r.sev, { secret: r.cat === "secret" && m[1] ? m[1] : null }); k++;
    }
  }
  if (lang === "cfg" && /(^|\/)\.env(\.(?!example|sample|template|dist|defaults?|test)[\w.-]+)?$/i.test(path)) {
    const m = /^[ \t]*(?:export[ \t]+)?[A-Z][A-Z0-9_]*[ \t]*=[ \t]*["']?([^\s"'#$]{4,})/m.exec(content);
    if (m && !DECOY.test(m[1]) && !res.out.some((f) => f.cat === "secret")) add({ id: "envfile", cat: "secret", plain: "An environment file with real-looking values is committed. These files usually hold passwords and keys.", fix: "Remove it from the repository, add it to .gitignore, and rotate anything it contained." }, m.index, 3);
  }
  if (!LEX[lang] || LEX[lang].only) { res.todos = collectTodos(c); return res; }
  // 2. taint: does user input reach a dangerous call?
  c.taintRe = buildTaint(c);
  const T = TSRC[lang];
  for (const s of SINKS) {
    if (!s.langs.includes(lang) || (s.gate && !s.gate.test(content))) continue;
    const view = s.view || "code", hay = c[view];
    s.re.lastIndex = 0;
    let m, k = 0;
    while ((m = s.re.exec(hay)) && k < 12) {
      if (m[0] === "") { s.re.lastIndex++; continue; }
      const args = argsAt(c, view, m.index + m[0].length);
      if (s.argOk && !s.argOk(args, m)) continue;
      const a0 = s.all ? args : nthArg(args, s.idx || 0);
      if (!s.lit && !/[A-Za-z_$]/.test(a0.replace(/(["'`])[ ]*\1/g, ""))) continue;
      const tw = !SAN.test(a0) && ((T && T.test(a0)) || (c.taintRe && c.taintRe.test(a0)));
      if (!tw && s.needTaint) continue;
      const lv = s.lv ? s.lv(a0, tw, m) : tw ? s.sevT : s.sev;
      add(s, m.index, lv, { plain: tw ? s.plainT : s.plain, tag: tw ? "user input reaches it" : "" }); k++;
    }
  }
  // 3. structure checks
  for (const fn of [chkSyntax, chkAwaitJS, chkConstJS, chkUnreach, chkPy, chkC, chkGoDefer, chkJsonParse]) {
    if (fn === chkPy && lang !== "py") continue;
    if (fn === chkUnreach && lang !== "py" && !c.structural) continue;
    if ((fn === chkJsonParse || fn === chkConstJS || fn === chkAwaitJS) && lang !== "js") continue;
    fn(c, add);
  }
  chkImports(c, add, repo);
  res.todos = collectTodos(c);
  return res;
}

// ======================================================================
//  Put it all together: dedupe, group, pile up, rank
// ======================================================================
function makeGroup(arr, plain, fix, label) {
  const files = new Set(arr.map((f) => f.file)), first = arr[0];
  const list = arr.slice().sort((a, b) => b.level - a.level).slice(0, 30).map((f) => f.file + ":" + f.line + "  " + (f.one || "")).join("\n");
  return { cat: first.cat, rule: first.rule, level: Math.min(3, Math.max(...arr.map((f) => f.level))), file: label || arr.length + " places in " + files.size + " file" + (files.size === 1 ? "" : "s"), line: 0, group: true, n: arr.length, snippet: list + (arr.length > 30 ? "\n… and " + (arr.length - 30) + " more" : ""), plain, fix, test: arr.every((f) => f.test) };
}
function finalize(found, todos) {
  found.sort((a, b) => b.level - a.level);
  const seen = new Set(), per = {}, kept = [];
  for (const f of found) {
    const k = f.file + ":" + f.line + ":" + f.cat;
    if (seen.has(k)) continue;
    seen.add(k);
    const pk = f.file + "|" + f.rule;
    per[pk] = (per[pk] || 0) + 1;
    if (per[pk] > (f.cat === "secret" ? 20 : 3) && !f.pile) continue;
    kept.push(f);
  }
  const byRule = new Map();
  for (const f of kept) { if (!byRule.has(f.rule)) byRule.set(f.rule, []); byRule.get(f.rule).push(f); }
  let out = [];
  for (const [rule, arr] of byRule) {
    const s = arr[0], pile = s.pile ? arr.filter((f) => !s.pileIf || s.pileIf(f)) : [], rest = arr.filter((f) => !pile.includes(f));
    if (pile.length >= 2) out.push(makeGroup(pile, "At least " + pile.length + " " + (s.pileText || "similar spots") + ". Each one is small, so they are grouped here to keep the list readable.", s.fix));
    else rest.push(...pile);
    if (rest.length > 4 && s.cat !== "secret" && rule !== "syntax") {
      out.push(...rest.slice(0, 3));
      out.push(makeGroup(rest.slice(3), rest[3].plain + " (" + (rest.length - 3) + " more places like this.)", rest[3].fix));
    } else out.push(...rest);
  }
  const hot = new Set(out.filter((f) => f.level >= 3 && f.cat !== "todo").map((f) => f.file));
  todos.forEach((t) => { if (hot.has(t.file)) t.score += 1; });
  todos.sort((a, b) => b.score - a.score);
  const picked = todos.filter((t) => t.score >= 4).slice(0, 8), pickedSet = new Set(picked);
  const rest = todos.filter((t) => !pickedSet.has(t) && t.score >= 1), ignored = todos.length - picked.length - rest.length;
  picked.forEach((t) => out.push({ cat: "todo", rule: "todo", level: t.score >= 7 ? 4 : t.score >= 5 ? 3 : 2, file: t.file, line: t.line, snippet: t.tag + ": " + t.txt, plain: t.txt ? "A note-to-self that sounds important: \u201c" + t.txt.slice(0, 140) + "\u201d" : "A " + t.tag + " marker with no explanation.", fix: "Do it, delete it, or turn it into a tracked issue.", test: t.test }));
  if (rest.length) {
    const files = new Set(rest.map((t) => t.file));
    out.push({ cat: "todo", rule: "todopile", level: rest.length >= 60 ? 3 : rest.length >= 15 ? 2 : 1, file: rest.length + " loose notes in " + files.size + " file" + (files.size === 1 ? "" : "s"), line: 0, group: true, n: rest.length, snippet: rest.slice(0, 30).map((t) => t.file + ":" + t.line + "  " + t.tag + " " + t.txt.slice(0, 80)).join("\n") + (rest.length > 30 ? "\n… and " + (rest.length - 30) + " more" : ""), plain: "TODO, FIXME and HACK notes are normal. They are grouped here so they do not bury the real problems" + (picked.length ? ", and the scariest ones are listed on their own" : "") + ".", fix: "Skim the list, delete the dead ones, and turn the real ones into tracked issues.", test: false });
  }
  out.sort((a, b) => b.level - a.level || (a.test ? 1 : 0) - (b.test ? 1 : 0) || (a.group ? 1 : 0) - (b.group ? 1 : 0));
  return { ghosts: out, ignored };
}
if (typeof module !== "undefined") module.exports = { lex, scanFile, finalize, brackets, langOf, RULES, SINKS };

// ======================================================================
//  Fetching and page logic
// ======================================================================
async function gh(url, tok) {
  const r = await fetch(url, { headers: { Accept: "application/vnd.github+json", ...(tok ? { Authorization: "Bearer " + tok } : {}) } });
  if (r.status === 403 || r.status === 429) throw new Error("GitHub's anonymous rate limit was reached. Wait a while, or add a token under “Rate-limited?”.");
  if (r.status === 404) throw new Error("Repository not found. Check that it is public and the link is right.");
  if (!r.ok) throw new Error("GitHub answered with status " + r.status + ".");
  return r.json();
}

// which files to read first when a repo has more files than we will fetch: settings and secrets-prone files, then
// security-relevant code, then everything else; tests and examples last
function rank(path) {
  const depth = path.split("/").length;
  return (TEST_PATH.test(path) ? 1000 : 0) + (SEC_PATH.test(path) ? 0 : 150) + depth * 8 + (langOf(path) === "cfg" ? -60 : 0);
}

async function loadPackages(blobs, rawUrl, repoCtx) {
  const pk = blobs.filter((f) => /(^|\/)package\.json$/.test(f.path) && !/node_modules/.test(f.path) && (f.size || 0) < 200000).sort((a, b) => a.path.split("/").length - b.path.split("/").length).slice(0, 25);
  await Promise.all(pk.map(async (f) => {
    try {
      const r = await fetch(rawUrl(f.path));
      if (!r.ok) return;
      const j = JSON.parse(await r.text()), deps = new Set();
      ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"].forEach((k) => Object.keys(j[k] || {}).forEach((d) => deps.add(d)));
      const dir = f.path.includes("/") ? f.path.slice(0, f.path.lastIndexOf("/")) : "";
      repoCtx.pkgs.set(dir, { deps, name: j.name, skip: !!j.workspaces || !!j.imports });
      if (j.name) repoCtx.pkgNames.add(j.name);
    } catch (e) { /* unreadable package.json: that check is simply skipped */ }
  }));
}

async function processRepository(owner, repo, ref, tok) {
  $("busy").hidden = false; $("error").hidden = true;
  $("busy-text").textContent = "Looking up the repository…";
  const root = document.documentElement.style;
  ["--moon-cover", "--fog-opacity", "--sky-darkness", "--in", "--web"].forEach((v) => root.setProperty(v, 0)); growWebs(0);
  try {
    const base = `https://api.github.com/repos/${owner}/${repo}`;
    if (!ref) ref = (await gh(base, tok)).default_branch;
    $("busy-text").textContent = "Reading the file tree…";
    const tree = await gh(`${base}/git/trees/${encodeURI(ref)}?recursive=1`, tok);
    const blobs = tree.tree.filter((f) => f.type === "blob");
    const rawUrl = (p) => `https://raw.githubusercontent.com/${owner}/${repo}/${encodeURI(ref)}/${p.split("/").map(encodeURIComponent).join("/")}`;
    // a map of the whole repository lets us notice imports that point at files which do not exist
    const paths = new Set(blobs.map((f) => f.path)), dirs = new Set(), dirNames = new Set();
    for (const p of paths) { const seg = p.split("/"); for (let i = 1; i < seg.length; i++) { dirs.add(seg.slice(0, i).join("/")); dirNames.add(seg[i - 1]); } }
    const repoCtx = {
      paths, dirs, dirNames, truncated: !!tree.truncated, pkgs: new Map(), pkgNames: new Set(),
      lower: new Map([...paths].map((p) => [p.toLowerCase(), true])),
      nearestPkg(path) { let d = path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : ""; for (;;) { if (this.pkgs.has(d)) return this.pkgs.get(d); if (!d) return null; d = d.includes("/") ? d.slice(0, d.lastIndexOf("/")) : ""; } },
    };
    let files = blobs.filter((f) => {
      const lang = langOf(f.path);
      return lang && !SKIP_DIR.test("/" + f.path) && !SKIP_FILE.test(f.path) && (f.size || 0) <= (lang === "cfg" ? 80000 : 300000);
    });
    files.sort((a, b) => rank(a.path) - rank(b.path));
    const notes = [];
    if (files.length > MAX_FILES) { notes.push(`the ${MAX_FILES} most relevant of ${files.length} code files were searched`); files = files.slice(0, MAX_FILES); }
    if (tree.truncated) notes.push("GitHub returned a partial file list for this huge repo, so cross-file checks were skipped");
    $("busy-text").textContent = "Reading package files…";
    await loadPackages(blobs, rawUrl, repoCtx);
    const found = [], todos = [], t0 = Date.now();
    let next = 0, done = 0, minified = 0, timedOut = false;
    async function worker() {
      while (next < files.length) {
        if (Date.now() - t0 > TIME_BUDGET) { timedOut = true; return; }
        const f = files[next++];
        try {
          const r = await fetch(rawUrl(f.path));
          if (r.ok) {
            const res = scanFile(f.path, await r.text(), repoCtx);
            found.push(...res.out); todos.push(...res.todos);
            if (res.skipped) minified++;
          }
        } catch (e) { /* skip unreadable file */ }
        if (++done % 4 === 0 || done === files.length) $("busy-text").textContent = `Searching ${done} of ${files.length} files…`;
      }
    }
    await Promise.all(Array.from({ length: FETCH_CONC }, worker));
    if (timedOut) notes.push(`stopped after ${done} files to keep the page fast`);
    if (minified) notes.push(`${minified} minified or bundled file${minified === 1 ? "" : "s"} skipped`);
    $("busy-text").textContent = "Sorting the ghosts…";
    const out = finalize(found, todos);
    if (out.ignored > 0) notes.push(`${out.ignored} empty or already-resolved note${out.ignored === 1 ? "" : "s"} ignored`);
    ghosts = out.ghosts.map((f, i) => ({ ...f, id: "g" + i, name: NAMES[Math.floor(Math.random() * NAMES.length)] }));
    shownCount = MAX_SHOWN;
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

let shownCount = MAX_SHOWN;
function renderList() {
  const list = ghosts.filter((g) => !$("scary-only").checked || g.level >= 4), shown = list.slice(0, shownCount), holder = $("ghosts");
  holder.replaceChildren();
  $("toolbar-text").textContent = list.length ? `Showing ${shown.length} of ${list.length} ghosts, scariest first` : "No ghosts here. Suspiciously quiet.";
  shown.forEach((g, i) => {
    const el = document.createElement("article");
    el.className = `card l${g.level}`;
    const where = g.group ? esc(g.file) : `${esc(g.file)} : L${g.line}`;
    const kind = CAT[g.cat] + (g.tag ? " · " + g.tag : "");
    el.innerHTML = `<div class="figure" data-cat="${ANIM[g.cat] || g.cat}">${ghostSVG(g.level)}</div><div><div class="tags"><span class="level">${g.name}, the ${LEVEL_TITLE[g.level].toLowerCase()}</span><span class="kind">${esc(kind)}</span><span class="urgency">${URGENCY[g.level]}</span></div><p class="where">${where}${g.test ? " (test or example code)" : ""}</p><p class="plain">${esc(g.plain)}</p><p class="fix"><b>Fix:</b> ${esc(g.fix)}</p><details><summary>${g.group ? "See the list" : "See code"}</summary><pre>${esc(g.snippet)}</pre></details></div>`;
    const d = Math.min(i, 12) * 0.4;
    el.style.animationDelay = 0.8 + d + "s"; el.firstChild.style.animationDelay = 1.4 + d + "s";
    holder.appendChild(el);
  });
  let more = $("more");
  if (!more) { more = document.createElement("button"); more.id = "more"; more.type = "button"; more.className = "go"; more.style.margin = "18px auto"; more.style.display = "block"; more.addEventListener("click", () => { shownCount += MAX_SHOWN; renderList(); }); holder.after(more); }
  more.hidden = list.length <= shown.length;
  more.textContent = `Show ${Math.min(MAX_SHOWN, list.length - shown.length)} more`;
  $("list-wrap").hidden = false;
}

// ======================================================================
//  Cobwebs: every knot is a little spring. Hovering, touching and scrolling push on them, they wobble and settle.
//  The CSS idle breeze and the grow-in animation still run on top of this.
// ======================================================================
const WEB_R = 170, WEB_H = 190, WEB_RINGS = 6, WEB_SPOKES = 6;
// a web as numbers: knots on spokes and rings, plus a sag control point between neighbouring knots on each ring
function makeWebModel(s, rnd) {
  const R = WEB_R, P = (r, t) => [s * r * Math.cos(t), r * Math.sin(t)];
  const A = [0, 1, 2, 3, 4, 5].map((i) => (i * Math.PI) / 10 + (i % 5 ? (rnd() - 0.5) * 0.09 : 0));
  const pt = (x, y, k, rad, w) => ({ rx: x, ry: y, dx: 0, dy: 0, vx: 0, vy: 0, k, rad, nb: [], w });
  const nodes = [], ctrl = [], all = [];
  for (let r = 1; r <= WEB_RINGS; r++) {
    nodes[r] = []; ctrl[r] = [];
    for (let i = 0; i < WEB_SPOKES; i++) {
      const rr = ((R * r) / WEB_RINGS) * (r === WEB_RINGS ? 0.97 + rnd() * 0.05 : 0.94 + rnd() * 0.08), [x, y] = P(rr, A[i]);
      nodes[r][i] = pt(x, y, 46 - r * 3.5, r / WEB_RINGS, 1); all.push(nodes[r][i]);
    }
    for (let i = 0; i < WEB_SPOKES - 1; i++) {
      const a = nodes[r][i], b = nodes[r][i + 1], rr = (Math.hypot(a.rx, a.ry) + Math.hypot(b.rx, b.ry)) / 2 * (0.72 + rnd() * 0.12), [x, y] = P(rr, (A[i] + A[i + 1]) / 2);
      ctrl[r][i] = pt(x, y, 30, r / WEB_RINGS, 0.6); all.push(ctrl[r][i]);
    }
  }
  // neighbours: along a spoke, along a ring; the innermost knots are tied to the fixed corner (null = pinned)
  for (let r = 1; r <= WEB_RINGS; r++) {
    for (let i = 0; i < WEB_SPOKES; i++) {
      const n = nodes[r][i];
      n.nb.push(r > 1 ? nodes[r - 1][i] : null);
      if (r < WEB_RINGS) n.nb.push(nodes[r + 1][i]);
      if (i > 0) n.nb.push(nodes[r][i - 1]);
      if (i < WEB_SPOKES - 1) n.nb.push(nodes[r][i + 1]);
    }
    for (let i = 0; i < WEB_SPOKES - 1; i++) ctrl[r][i].nb.push(nodes[r][i], nodes[r][i + 1]);
  }
  const f = (n) => n.toFixed(1);
  const pos = (p) => f(p.rx + p.dx) + " " + f(p.ry + p.dy);
  return {
    s, A, nodes, ctrl, all, ang: 0, angv: 0, pivotX: 40 * s,
    spoke(i) { let d = "M0 0"; for (let r = 1; r <= WEB_RINGS; r++) d += "L" + pos(nodes[r][i]); return d; },
    ring(r) { let d = "M" + pos(nodes[r][0]); for (let i = 0; i < WEB_SPOKES - 1; i++) d += "Q" + pos(ctrl[r][i]) + " " + pos(nodes[r][i + 1]); return d; },
    // advance the springs; returns how much motion is left (0 means it has settled)
    step(dt) {
      let e = 0;
      for (const p of all) {
        let sx = 0, sy = 0;
        for (const q of p.nb) { if (q) { sx += q.dx; sy += q.dy; } }
        const n = p.nb.length || 1, cx = (sx / n - p.dx) * 26, cy = (sy / n - p.dy) * 26;
        p.vx += (-p.k * p.dx - 4.6 * p.vx + cx) * dt; p.vy += (-p.k * p.dy - 4.6 * p.vy + cy) * dt;
        p.dx += p.vx * dt; p.dy += p.vy * dt;
        e += Math.abs(p.vx) + Math.abs(p.vy) + Math.abs(p.dx) + Math.abs(p.dy);
      }
      this.angv += (-18 * this.ang - 1.5 * this.angv) * dt; this.ang += this.angv * dt;
      e += Math.abs(this.angv) * 0.2 + Math.abs(this.ang) * 0.2;
      return e;
    },
    // finger or mouse at (x, y) in web units, moved by (mx, my) units; also pokes the spider
    touch(x, y, mx, my, radius, push) {
      for (const p of all) {
        const px = p.rx + p.dx, py = p.ry + p.dy, ddx = px - x, ddy = py - y, d = Math.hypot(ddx, ddy);
        if (d >= radius) continue;
        const k = (1 - d / radius) ** 2 * p.w, inv = d > 0.001 ? 1 / d : 0;
        p.vx += (mx * 7 + ddx * inv * push) * k; p.vy += (my * 7 + ddy * inv * push) * k;
        p.vx = Math.max(-140, Math.min(140, p.vx)); p.vy = Math.max(-140, Math.min(140, p.vy));
      }
      const sd = Math.hypot(x - 40 * this.s, y - 40);
      if (sd < radius * 1.3) this.angv += (-mx * 2.5 - (x - 40 * this.s) * 0.03 * push) * (1 - sd / (radius * 1.3));
    },
    // the page slides by dy pixels: the threads trail behind and billow into the screen, the spider swings
    scroll(dy) {
      dy = Math.max(-80, Math.min(80, dy));
      for (const p of all) {
        p.vy += -dy * 0.2 * p.rad * p.rad; p.vx += this.s * Math.abs(dy) * 0.06 * p.rad;
        p.vx = Math.max(-90, Math.min(90, p.vx)); p.vy = Math.max(-90, Math.min(90, p.vy));
      }
      this.angv = Math.max(-90, Math.min(90, this.angv - this.s * Math.abs(dy) * 0.1 + dy * 0.03));
    },
  };
}

let webModels = [];
function buildWebs() {
  const spider = (s) => `<g class="sw"><g class="spider"><path d="M${40 * s} -90V30" stroke="#cfe0ff" stroke-width=".6"/><path d="M${35 * s} 34l${-8 * s} -5M${35 * s} 37l${-9 * s} 1M${45 * s} 34l${8 * s} -5M${45 * s} 37l${9 * s} 1" stroke="#9db6dc" stroke-width="1"/><circle cx="${40 * s}" cy="36" r="5" fill="#1b2a4d" stroke="#9db6dc" stroke-width=".6"/></g></g>`;
  webModels = [makeWebModel(1, Math.random), makeWebModel(-1, Math.random)];
  const web = (cls, m) => {
    const sp = m.A.map((t, i) => `<path class="sp" pathLength="1" style="--i:${i}" d="${m.spoke(i)}"/>`).join("");
    let rg = "";
    for (let r = 1; r <= WEB_RINGS; r++) rg += `<path class="rg" pathLength="1" data-r="${r}" style="--r:${r}" d="${m.ring(r)}"/>`;
    return `<div class="web ${cls}"><div class="fl"><svg viewBox="${m.s < 0 ? -WEB_R : 0} 0 ${WEB_R} ${WEB_H}">${sp}${rg}${spider(m.s)}</svg></div></div>`;
  };
  $("webs").innerHTML = web("tl", webModels[0]) + web("tr", webModels[1]);
  const els = $("webs").querySelectorAll(".web");
  webModels.forEach((m, k) => { const w = els[k]; m.svg = w.querySelector("svg"); m.sp = w.querySelectorAll(".sp"); m.rg = w.querySelectorAll(".rg"); m.sw = w.querySelector(".sw"); });
}
function drawWebs() {
  for (const m of webModels) {
    if (!m.svg) continue;
    m.sp.forEach((el, i) => el.setAttribute("d", m.spoke(i)));
    m.rg.forEach((el, i) => el.setAttribute("d", m.ring(i + 1)));
    m.sw.setAttribute("transform", `rotate(${m.ang.toFixed(2)} ${m.pivotX} -90)`);
  }
}
let webRaf = 0, webPrev = 0;
function webTick(t) {
  const dt = Math.min((t - webPrev) / 1000, 1 / 30);
  webPrev = t;
  let e = 0;
  for (const m of webModels) e += m.step(dt);
  drawWebs();
  webRaf = e > 0.4 && !document.hidden ? requestAnimationFrame(webTick) : 0;
}
function webWake() { if (!webRaf && webModels.length) { webPrev = performance.now(); webRaf = requestAnimationFrame(webTick); } }
// finger or mouse position (screen px) -> web units, for every web
function webTouch(cx, cy, mx, my, push) {
  for (const m of webModels) {
    if (!m.svg) continue;
    const r = m.svg.getBoundingClientRect();
    if (!r.width) continue;
    const u = WEB_R / r.width;
    m.touch((m.s < 0 ? -WEB_R : 0) + (cx - r.left) * u, (cy - r.top) * u, Math.max(-60, Math.min(60, mx)) * u, Math.max(-60, Math.min(60, my)) * u, 64 * u, push);
  }
  webWake();
}
function initWebReactions() {
  if (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let mouse = null, finger = null, lastY = window.scrollY || 0;
  window.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;   // fingers are handled by the touch events below, which keep firing while the page slides
    if (mouse) webTouch(e.clientX, e.clientY, e.clientX - mouse[0], e.clientY - mouse[1], 4);
    mouse = [e.clientX, e.clientY];
  }, { passive: true });
  document.addEventListener("mouseleave", () => { mouse = null; });
  window.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    finger = [t.clientX, t.clientY];
    webTouch(t.clientX, t.clientY, 0, 0, 24);   // a tap pokes the web outward
  }, { passive: true });
  window.addEventListener("touchmove", (e) => {
    const t = e.touches[0];
    if (finger) webTouch(t.clientX, t.clientY, t.clientX - finger[0], t.clientY - finger[1], 4);
    finger = [t.clientX, t.clientY];
  }, { passive: true });
  window.addEventListener("touchend", () => { finger = null; }, { passive: true });
  window.addEventListener("touchcancel", () => { finger = null; }, { passive: true });
  window.addEventListener("scroll", () => {
    const y = window.scrollY || 0, dy = y - lastY;
    lastY = y;
    if (!dy) return;
    for (const m of webModels) m.scroll(dy);
    webWake();
  }, { passive: true });
}
function growWebs(w) {   // the web itself is sized by --web in CSS; this only toggles the spider
  $("webs").classList.toggle("on", w > 0);
}
try { buildWebs(); initWebReactions(); } catch (e) {}
function startHunt() {
  const src = $("source").value.trim();
  const m = src.match(/github\.com\/([^/\s]+)\/([^/\s?#]+)(?:\/tree\/([^?#\s]+))?/) || src.match(/^([\w.-]+)\/([\w.-]+)$/);
  if (!m) { $("error").textContent = "Paste a public GitHub link such as https://github.com/owner/repo"; $("error").hidden = false; return; }
  $("go").disabled = true;
  processRepository(m[1], m[2].replace(/\.git$/, ""), m[3], $("token").value.trim());
}
$("go").addEventListener("click", startHunt);
$("source").addEventListener("keydown", (e) => { if (e.key === "Enter") startHunt(); });
$("scary-only").addEventListener("change", () => { shownCount = MAX_SHOWN; renderList(); });
