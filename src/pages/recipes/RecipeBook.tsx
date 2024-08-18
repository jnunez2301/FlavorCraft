import { useEffect, useState } from "react";
import { Recipe } from "../../model/Recipe";
import { useResolveApi } from "../../hooks/useResolveApi";
import { useSession } from "../../auth/SessionContext";
import RecipeList from "./RecipeList";
import AddRecipe from "./AddRecipe";
import { useNavigate } from "@tanstack/react-router";

const RecipeBook = () => {
  const { getApi } = useResolveApi();
  const { userSession } = useSession();
  const navigate = useNavigate();
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
    <section style={{
      backgroundColor: "var(--bg-color)",
    }}>
      <header>
        <h2
          style={{
            marginBottom: ".6rem",
            fontSize: "1.8rem",
          }}
        >
          Cooking Recipes
        </h2>
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
      <nav
        style={{
          display: "flex",
          margin: "1rem 0",
        }}
      >
        <AddRecipe onClick={() => {
          navigate({
            to: "/editor",
          });
        }}/>
      </nav>
      {recipeList && <RecipeList recipes={recipeList} />}
    </section>
  );
};

export default RecipeBook;
