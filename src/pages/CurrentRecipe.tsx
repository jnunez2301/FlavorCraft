import { Recipe } from "../model/Recipe";

type CurrentRecipeProps = {
  currentRecipe: Recipe;
};

const CurrentRecipe = ({ currentRecipe }: CurrentRecipeProps) => {
  console.log(currentRecipe);
  return (
    <section id="current-recipe">
      <h1>{currentRecipe.title}</h1>
      <p>{currentRecipe.description}</p>
      <p>{currentRecipe.ingredients}</p>
      <p>{currentRecipe.instructions}</p>
      {currentRecipe.sauceInstructions && (
        <ul>
          {currentRecipe.sauceInstructions.map((sauce, index) => (
            <li key={index}>{sauce}</li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CurrentRecipe;
