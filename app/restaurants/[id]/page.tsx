import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "../components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/components/delivery-info";
import ProductList from "@/app/components/product-list";
import CartBanner from "../components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

type RestaurantPageProps = {
  params: {
    id: string;
  };
};

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const session = await getServerSession(authOptions);

  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          name: "asc",
        },
        include: {
          Product: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div>
      <RestaurantImage
        restaurant={restaurant}
        userFavoriteRestaurants={userFavoriteRestaurants}
      />

      <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-2xl rounded-tr-2xl bg-white px-5 py-5 pt-5">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="rounded-full object-cover"
              fill
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className="flex items-center gap-[3px] rounded-full bg-foreground px-3 py-[6px] text-white">
          <StarIcon className="fill-yellow-400 text-yellow-400" size={12} />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[167px] rounded-lg bg-[#F4F4F4] text-center"
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {/* TODO mostrar produtos mais pedidos quando implementar realização de pedido*/}
        <h2 className="px-5 font-semibold">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div key={category.id} className="mt-6 space-y-4">
          {/* TODO mostrar produtos mais pedidos quando implementar realização de pedido*/}
          <h2 className="px-5 font-semibold">{category.name}</h2>
          <ProductList products={category.Product} />
        </div>
      ))}

      <CartBanner restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;
