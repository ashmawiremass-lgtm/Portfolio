import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/adminAuth";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const FILE_PATH = "data/content.json";

function readLocalContent() {
  const raw = fs.readFileSync(path.join(process.cwd(), FILE_PATH), "utf-8");
  return JSON.parse(raw);
}

export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  return NextResponse.json(readLocalContent());
}

export async function POST(req: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const updated = await req.json();
  const jsonString = JSON.stringify(updated, null, 2) + "\n";

  const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH } = process.env;

  // Production path: commit straight to the repo via the GitHub API.
  // This is what makes edits actually persist once deployed on Vercel —
  // serverless functions can't write to the local filesystem permanently,
  // but they CAN push a commit, and Vercel auto-redeploys on push.
  if (GITHUB_TOKEN && GITHUB_REPO) {
    const branch = GITHUB_BRANCH || "main";
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;

    const getRes = await fetch(`${apiUrl}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });
    if (!getRes.ok) {
      const err = await getRes.text();
      return NextResponse.json(
        { error: "Could not read current file from GitHub: " + err },
        { status: 500 }
      );
    }
    const { sha } = await getRes.json();

    const putRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        message: "Update portfolio content via /admin",
        content: Buffer.from(jsonString, "utf8").toString("base64"),
        sha,
        branch,
      }),
    });
    if (!putRes.ok) {
      const err = await putRes.text();
      return NextResponse.json(
        { error: "Could not commit to GitHub: " + err },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true, mode: "github" });
  }

  // Local dev fallback: write the file directly on disk.
  try {
    fs.writeFileSync(path.join(process.cwd(), FILE_PATH), jsonString);
    return NextResponse.json({ ok: true, mode: "local-file" });
  } catch (e) {
    return NextResponse.json(
      { error: "Could not write file locally: " + String(e) },
      { status: 500 }
    );
  }
}
