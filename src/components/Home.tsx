import { css } from "@emotion/css";
import RecipeBook from "../pages/recipes/RecipeBook";

export const Home = () => {
  
  return (
    <section className={css(`padding: 1rem;`)}>
      <RecipeBook />
    </section>
  );
};
