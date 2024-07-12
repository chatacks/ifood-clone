"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../lib/utils";
import {
  favoriteRestaurant,
  unfavoriteRestaurant,
} from "../actions/restaurant";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

type RestaurantItemProps = {
  restaurant: Restaurant;
  className?: string;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
};

const RestaurantItem = ({
  restaurant,
  className,
  userFavoriteRestaurants,
}: RestaurantItemProps) => {
  const isFavorite = userFavoriteRestaurants.some(
    (fav) => fav.restaurantId === restaurant.id,
  );

  const { data } = useSession();

  const handleFavoriteClick = async () => {
    if (!data?.user.id) return;
    try {
      if (isFavorite) {
        await unfavoriteRestaurant(data?.user.id, restaurant.id);
        return toast.success("Restaurante removido dos favoritos com sucesso!");
      }

      await favoriteRestaurant(data?.user.id, restaurant.id);
      toast.success("Restaurante adicionado aos favoritos com sucesso!", {
        description:
          'Você pode ver os restaurantes favoritados em "Restaurantes Favoritos". ',
      });
    } catch (error) {
      toast.error("O restaurante selecionado ja foi favoritado");
    }
  };

  return (
    <div className={cn("min-w-[266px] max-w-[266px]", className)}>
      <div className="w-full space-y-3">
        <div className="relative h-[136px] w-full">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-lg object-cover"
            />
          </Link>

          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary bg-white px-2 py-[2px]">
            <StarIcon className="fill-yellow-400 text-yellow-400" size={12} />
            <span className="text-xs font-semibold">5.0</span>
          </div>

          {data?.user.id && (
            <Button
              size="icon"
              className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
              onClick={handleFavoriteClick}
            >
              <HeartIcon size={16} className="fill-white" />
            </Button>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
