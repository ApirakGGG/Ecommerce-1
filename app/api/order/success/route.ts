import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if(!currentUser) return NextResponse.error()

  const body = await request.json();
  const { paymentIntentId } = body;

  const order = await prisma.order.findUnique({
    where: { paymentIntentId: paymentIntentId },
  });

  if (!order) return NextResponse.error();

  if (order.status === "complete") {
    // Already processed
    return NextResponse.json(order);
  }

  // Update order status
  const updatedOrder = await prisma.order.update({
    where: { paymentIntentId: paymentIntentId },
    data: { status: "complete" },
  });

  // Decrement products stock
  for (const item of updatedOrder.products) {
    const product = await prisma.product.findUnique({
      where: { id: item.id }
    });
    
    if (product) {
      const newQuantity = Math.max(0, product.quantity - item.quantity);
      await prisma.product.update({
        where: { id: product.id },
        data: {
          quantity: newQuantity,
          inStock: newQuantity > 0,
        }
      });
    }
  }

  return NextResponse.json(updatedOrder);
}
