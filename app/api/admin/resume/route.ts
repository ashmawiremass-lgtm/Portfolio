import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/adminAuth";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const FILE_PATH = "public/resume.pdf";

export async function POST(req: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { base64 } = await req.json();
  if (!base64 || typeof base64 !== "string") {
    return NextResponse.json({ error: "No file data received." }, { status: 400 });
  }

  const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH } = process.env;

  if (GITHUB_TOKEN && GITHUB_REPO) {
    const branch = GITHUB_BRANCH || "main";
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;

    // Look up the current file's sha (needed to update an existing file).
    // A 404 here just means resume.pdf doesn't exist in the repo yet —
    // that's fine, we create it instead of updating it.
    let sha: string | undefined;
    const getRes = await fetch(`${apiUrl}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    } else if (getRes.status !== 404) {
      const err = await getRes.text();
      return NextResponse.json(
        { error: "Could not read current résumé from GitHub: " + err },
        { status: 500 }
      );
    }

    const putRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        message: "Update résumé via /admin",
        content: base64,
        sha,
        branch,
      }),
    });
    if (!putRes.ok) {
      const err = await putRes.text();
      return NextResponse.json(
        { error: "Could not commit résumé to GitHub: " + err },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true, mode: "github" });
  }

  // Local dev fallback: write straight to /public.
  try {
    fs.writeFileSync(path.join(process.cwd(), FILE_PATH), Buffer.from(base64, "base64"));
    return NextResponse.json({ ok: true, mode: "local-file" });
  } catch (e) {
    return NextResponse.json(
      { error: "Could not write résumé locally: " + String(e) },
      { status: 500 }
    );
  }
}
