import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-06-24.dahlia",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  return totalPrice;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorzed" }, { status: 401 });
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;
  const totalDollars = calculateOrderAmount(items);
  const totalCents = totalDollars * 100;

  if (totalCents < 1000) {
    return NextResponse.json({ error: "Order amount is too low (minimum 10 THB)" }, { status: 400 });
  }
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: totalDollars,
    currency: "thb",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (current_intent) {
      const updateed_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: totalCents }
      );

      // update the order

      const existing_order = await prisma.order.findFirst({
        where: { paymentIntentId: payment_intent_id },
      });

      if (!existing_order) {
        return NextResponse.json(
          { error: "Invalid Payment Intent" },
          { status: 400 }
        );
      }

      await prisma.order.update({
        where: { paymentIntentId: payment_intent_id },
        data: {
          amount: totalDollars,
          products: items,
        },
      });

      return NextResponse.json({ paymentIntent: updateed_intent });
    }
  } else {
    //create the intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: "thb",
      automatic_payment_methods: { enabled: true },
    });

    //create the order
    orderData.paymentIntentId = paymentIntent.id;
    await prisma.order.create({
      data: orderData,
    });

    return NextResponse.json({ paymentIntent });
  }
}
