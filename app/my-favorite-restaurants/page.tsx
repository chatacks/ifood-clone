import { getServerSession } from "next-auth";
import { db } from "../lib/prisma";
import { authOptions } from "../lib/auth";
import { notFound } from "next/navigation";
import Header from "../components/header";
import RestaurantItem from "../components/restaurant-item";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Meus Restaurantes Favoritos
        </h2>
        <div className="flex w-full flex-col gap-6">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <div className="text-left font-semibold">
              <h2>Você ainda não favoritou nenhum restaurante.</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;
