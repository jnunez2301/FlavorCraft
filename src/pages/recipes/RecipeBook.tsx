import { useEffect, useState } from "react";
import { Recipe } from "../../model/Recipe";
import { useResolveApi } from "../../hooks/useResolveApi";
import { useSession } from "../../auth/SessionContext";
import RecipeList from "./RecipeList";

const RecipeBook = () => {
  const { getApi } = useResolveApi();
  const { userSession } = useSession();
  const [recipeList, setRecipeList] = useState<Recipe[] | null>([]);

  useEffect(() => {
    if (userSession) {
      getApi(`recipes/${userSession._id}`)
        .then((response) => {
          if (response?.success) {
            setRecipeList(response.message);
          }
        })
        .catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession]);
  return (
    <section>
      <header>
        <h1
          style={{
            marginBottom: ".6rem",
            fontSize: "1.8rem",
          }}
        >
          Cooking Recipes
        </h1>
        <p
          style={{
            marginBottom: "1rem",
          }}
        >
          Here you will find all your cooking recipes and books that you have
          made
        </p>
        <hr />
      </header>
      {recipeList && <RecipeList recipes={recipeList} />}
    </section>
  );
};

export default RecipeBook;
