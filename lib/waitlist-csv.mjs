import fs from "fs/promises";
import path from "path";
import { list, put } from "@vercel/blob";

const CSV_HEADER = "email,source,joinedAt\n";
const LOCAL_FILE = path.join(process.cwd(), "data", "waitlist.csv");
const BLOB_PATHNAME = "waitlist.csv";

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
    const text = await fs.readFile(LOCAL_FILE, "utf8");
    return text.includes("email,") ? text : CSV_HEADER + text;
  } catch (e) {
    if (e.code === "ENOENT") return CSV_HEADER;
    throw e;
  }
}

async function readBlobCsv() {
  const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 5 });
  const existing = blobs.find((b) => b.pathname === BLOB_PATHNAME);
  if (!existing) return CSV_HEADER;
  const res = await fetch(existing.url);
  if (!res.ok) throw new Error("No s'ha pogut llegir el CSV");
  const text = await res.text();
  return text.includes("email,") ? text : CSV_HEADER + text;
}

export async function readWaitlistCsv() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return readBlobCsv();
  if (!process.env.VERCEL) return readLocalCsv();
  throw new Error("Blob store no configurat a Vercel");
}

async function writeLocalCsv(content) {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, content, "utf8");
}

async function writeBlobCsv(content) {
  await put(BLOB_PATHNAME, content, {
    access: "public",
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
