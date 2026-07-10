import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { color, colorCode } = body;

  if (!color || !colorCode) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existingColor = await prisma.color.findUnique({
    where: { color },
  });

  if (existingColor) {
    return NextResponse.json({ error: "Color already exists" }, { status: 400 });
  }

  const newColor = await prisma.color.create({
    data: {
      color,
      colorCode,
    },
  });

  return NextResponse.json(newColor);
}

export async function GET() {
  try {
    const colors = await prisma.color.findMany({
      orderBy: { color: "asc" },
    });
    return NextResponse.json(colors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch colors" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing color ID" }, { status: 400 });

  try {
    await prisma.color.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete color" }, { status: 500 });
  }
}
