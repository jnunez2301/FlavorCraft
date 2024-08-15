import { css } from "@emotion/css";
import RecipeBook from "../pages/recipes/RecipeBook";
import { Avatar } from "./Avatar";

export const Home = () => {
  return (
    <section className={css(`padding: 1rem;`)}>
      <div
        className={css({
          display: "flex",
          justifyContent: "flex-end",
        })}
      >
        <Avatar avatarImg="" fallback="Jhonata Núñez" />
      </div>
      <RecipeBook />
    </section>
  );
};
