import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function PUT(
  request: Request,
  { params }: { params: { reviewId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reviewId } = params;

  if (!reviewId || typeof reviewId !== "string") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { comment, rating, image } = body;

  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    return NextResponse.error();
  }

  // Only the creator or an admin can edit the review
  if (review.userId !== currentUser.id && currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const updatedReview = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      comment,
      rating,
      image,
    },
  });

  return NextResponse.json(updatedReview);
}

export async function DELETE(
  request: Request,
  { params }: { params: { reviewId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reviewId } = params;

  if (!reviewId || typeof reviewId !== "string") {
    return NextResponse.error();
  }

  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    return NextResponse.error();
  }

  if (review.userId !== currentUser.id && currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const deletedReview = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return NextResponse.json(deletedReview);
}
