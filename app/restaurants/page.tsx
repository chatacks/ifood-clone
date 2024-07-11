import { Suspense } from "react";
import Restaurants from "./components/restaurants";

const RestaurantsPage = () => {
  return (
    <Suspense>
      <Restaurants />
    </Suspense>
  );
};

export default RestaurantsPage;
