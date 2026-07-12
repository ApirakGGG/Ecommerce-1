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

  const order = await prisma?.order.delete({
    where: {id: id}
  })

  return NextResponse.json(order)
}
