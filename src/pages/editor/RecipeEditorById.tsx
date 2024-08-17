import RecipeEditor from "./RecipeEditor";
import { useParams } from "@tanstack/react-router";

const RecipeEditorById = () => {
  const { recipeId } = useParams({
    from: "/editor/$recipeId",
  });
  return <RecipeEditor recipeId={recipeId} />;
};

export default RecipeEditorById;
