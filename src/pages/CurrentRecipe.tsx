import { Recipe } from "../model/Recipe";

type CurrentRecipeProps = {
  currentRecipe: Recipe;
};

const CurrentRecipe = ({ currentRecipe }: CurrentRecipeProps) => {
  return (
    <section id="current-recipe">
      <h2>Title</h2>
      <h2>{currentRecipe.title}</h2>
      <h2>Description</h2>
      <p>{currentRecipe.description}</p>
      <h2>Ingredients</h2>
      <p>{currentRecipe.ingredients}</p>
      <h2>Instructions</h2>
      <ul>
        {currentRecipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
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
