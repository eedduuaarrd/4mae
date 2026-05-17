import fs from "fs/promises";
import path from "path";
import { get, put } from "@vercel/blob";

const CSV_HEADER = "email,source,joinedAt\n";
const CSV_BOM = "\uFEFF";
const LOCAL_FILE = path.join(process.cwd(), "data", "waitlist.csv");
const BLOB_PATHNAME = "waitlist.csv";

function stripBom(text) {
  return text.replace(/^\uFEFF/, "");
}

function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

export function parseWaitlistCsv(content) {
  const lines = stripBom(content)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) return [];

  const entries = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    if (cols.length < 3) continue;
    entries.push({
      email: cols[0],
      source: cols[1],
      joinedAt: cols[2],
    });
  }

  return entries.sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt));
}

export async function getWaitlistEntries() {
  const csv = await readWaitlistCsv();
  return parseWaitlistCsv(csv);
}

function withBom(content) {
  const body = stripBom(content);
  return body.startsWith(CSV_BOM) ? body : CSV_BOM + body;
}

function escapeCsv(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function rowLine({ email, source, joinedAt }) {
  return `${escapeCsv(email)},${escapeCsv(source)},${joinedAt}\n`;
}

function parseEmailColumn(line) {
  if (!line || line.startsWith("email,")) return null;
  const col = line.split(",")[0]?.trim();
  if (!col) return null;
  if (col.startsWith('"') && col.endsWith('"')) return col.slice(1, -1).replace(/""/g, '"').toLowerCase();
  return col.toLowerCase();
}

export function emailExistsInCsv(content, email) {
  const norm = email.trim().toLowerCase();
  return content.split("\n").some((line) => parseEmailColumn(line) === norm);
}

async function readLocalCsv() {
  try {
    const text = stripBom(await fs.readFile(LOCAL_FILE, "utf8"));
    return text.includes("email,") ? text : CSV_HEADER + text;
  } catch (e) {
    if (e.code === "ENOENT") return CSV_HEADER;
    throw e;
  }
}

async function readBlobCsv() {
  const result = await get(BLOB_PATHNAME, { access: "private" });
  if (!result?.stream) return CSV_HEADER;
  const text = stripBom(await new Response(result.stream).text());
  return text.includes("email,") ? text : CSV_HEADER + text;
}

export async function readWaitlistCsv() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return readBlobCsv();
  if (!process.env.VERCEL) return readLocalCsv();
  throw new Error("Blob store no configurat a Vercel");
}

async function writeLocalCsv(content) {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, withBom(content), "utf8");
}

async function writeBlobCsv(content) {
  await put(BLOB_PATHNAME, withBom(content), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function appendWaitlistRow({ email, source, joinedAt }) {
  const norm = email?.trim().toLowerCase();
  if (!norm) throw new Error("Email obligatori");

  const row = {
    email: norm,
    source: source || "landing",
    joinedAt: joinedAt || new Date().toISOString(),
  };

  let content;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    content = await readBlobCsv();
  } else if (!process.env.VERCEL) {
    content = await readLocalCsv();
  } else {
    throw new Error("Configura Vercel Blob per guardar correus en producció");
  }

  if (emailExistsInCsv(content, norm)) {
    const err = new Error("Duplicate email");
    err.code = "DUPLICATE";
    throw err;
  }

  const next = content.endsWith("\n") ? content + rowLine(row) : `${content}\n${rowLine(row)}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await writeBlobCsv(next);
  } else {
    await writeLocalCsv(next);
  }

  return row;
}
