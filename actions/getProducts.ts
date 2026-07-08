import prisma from "@/libs/prismadb";

export interface IproductParams {
  category?: string | null;
  searchTerm?: string | null;
  searchParams?: { query: string };
}

export default async function getProducts(params: IproductParams) {
  try {
    const { category, searchTerm } = params;
    let searchString = searchTerm;

    if (!searchTerm) {
      searchString = "";
    }

    let query: any = {};

    if (category) {
      query.category = category;
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          { name:        { contains: searchString, mode: "insensitive" } },
          { description: { contains: searchString, mode: "insensitive" } },
          { brand:       { contains: searchString, mode: "insensitive" } },
          { category:    { contains: searchString, mode: "insensitive" } },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    return products;
  } catch (error: any) {
    console.error("Error in getProducts:", error);
    throw new Error(error.message || "An error occurred in getProducts");
  }
}
