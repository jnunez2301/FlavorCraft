import { css } from "@emotion/css";
import { RecipeMaker } from "./RecipeMaker";

export const Home = () => {
  return (
    <section className={css(`padding: 1rem;`)}>
      <RecipeMaker />
    </section>
  );
};
