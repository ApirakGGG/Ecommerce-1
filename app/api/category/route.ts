import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { label, icon } = body;

  if (!label) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existingCategory = await prisma.category.findUnique({
    where: { label },
  });

  if (existingCategory) {
    return NextResponse.json({ error: "Category already exists" }, { status: 400 });
  }

  const category = await prisma.category.create({
    data: {
      label,
      icon,
    },
  });

  return NextResponse.json(category);
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { label: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing category ID" }, { status: 400 });

  try {
    await prisma.category.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
