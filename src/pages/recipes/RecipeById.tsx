import { useParams } from "@tanstack/react-router";
import Back from "../../components/Back";
import { useResolveApi } from "../../hooks/useResolveApi";
import { useEffect, useState } from "react";
import { useSession } from "../../auth/SessionContext";
import type { Recipe } from "../../model/Recipe";
import Loader from "../../components/Loader";
import CurrentRecipe from "../CurrentRecipe";

const RecipeById = () => {
  const { recipeId } = useParams({
    from: "/$recipeId",
  });
  const { getApi } = useResolveApi();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { userSession } = useSession();
  useEffect(() => {
    if (userSession) {
      getApi(`recipes/${recipeId}/user/${userSession._id}`)
        .then((response) => {
          if (response?.success) {
            setRecipe(response.message);
          }
        })
        .catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession]);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <Back />
      {recipe ? <CurrentRecipe currentRecipe={recipe} /> : <Loader />}
    </section>
  );
};

export default RecipeById;
