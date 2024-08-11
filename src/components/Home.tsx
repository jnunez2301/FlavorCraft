import { css } from "@emotion/css";
import { RecipeBook } from "./RecipeBook";

export const Home = () => {
  
  return (
    <section className={css(`padding: 1rem;`)}>
      <RecipeBook />
    </section>
  );
};
