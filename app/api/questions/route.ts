import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  try {
    // Récupération de la catégorie dans l'URL
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    if (!category) {
      return NextResponse.json({ error: "Category not specified" }, { status: 400 });
    }

    // Vérification du fichier de questions correspondant
    const filePath = path.join(process.cwd(), "public", "data", `${category}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: `Category "${category}" not found` }, { status: 404 });
    }

    // Lecture et parsing du fichier JSON
    const data = fs.readFileSync(filePath, "utf8");
    const questions = JSON.parse(data);

    return NextResponse.json(questions, { status: 200 });

  } catch (error) {
    console.error("API ERROR:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Internal Server Error", message: errorMessage }, { status: 500 });
  }
}