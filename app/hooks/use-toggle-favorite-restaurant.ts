import { toast } from "sonner";
import {
  favoriteRestaurant,
  unfavoriteRestaurant,
} from "../actions/restaurant";
import { useRouter } from "next/navigation";

type UseToggleFavoriteRestaurant = {
  userId?: string;
  restaurantId: string;
  restaurantIsCurrentlyFavorite?: boolean;
};

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsCurrentlyFavorite,
}: UseToggleFavoriteRestaurant) => {
  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!userId) return;
    try {
      if (restaurantIsCurrentlyFavorite) {
        await unfavoriteRestaurant(userId, restaurantId);
        return toast.success("Restaurante removido dos favoritos com sucesso!");
      }

      await favoriteRestaurant(userId, restaurantId);
      toast.success("Restaurante adicionado aos favoritos com sucesso!", {
        description:
          'Você pode ver os restaurantes favoritados em "Restaurantes Favoritos". ',
        action: {
          label: "Ver favoritos",
          onClick: () => router.push("/my-favorite-restaurants"),
        },
      });
    } catch (error) {
      toast.error("O restaurante selecionado ja foi favoritado");
    }
  };
  return { handleFavoriteClick };
};

export default useToggleFavoriteRestaurant;
