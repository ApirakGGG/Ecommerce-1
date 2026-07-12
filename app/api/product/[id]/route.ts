import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const currentUser = await getCurrentUser();
const {id} = await params
  
  if(!currentUser) return NextResponse.error()

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const product = await prisma?.product.delete({
    where: {id: id}
  })

  return NextResponse.json(product)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const currentUser = await getCurrentUser();
  const { id } = await params;

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  try {
    const body = await request.json();
    const { name, description, price, brand, category, inStock, images } = body;

    const product = await prisma.product.update({
      where: { id: id },
      data: {
        name,
        description,
        brand,
        category,
        inStock,
        images,
        price: parseFloat(price),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.error();
  }
}
