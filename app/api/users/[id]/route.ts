import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

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

  const user = await prisma?.user.delete({
    where: {id: id}
  })

  return NextResponse.json(user)
}
