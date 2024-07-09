"use server";

import { db } from "@/app/lib/prisma";

export const searchForRestaurants = async (searchFor: string) => {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: searchFor,
        mode: "insensitive",
      },
    },
  });

  return restaurants;
};
