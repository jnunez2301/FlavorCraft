import styled from "@emotion/styled";
import Badge from "../components/Badge";
import { Recipe } from "../model/Recipe";

type CurrentRecipeProps = {
  currentRecipe: Recipe;
};

const RecipeContainer = styled.section`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  gap: 0.3rem;
  align-items: end;
  margin: 0 auto;
  border: 1px solid var(--theme-white);
  padding: 1rem;
  min-height: 80vh;
  min-width: 50vw;
  position: relative;
`;

const CurrentRecipe = ({ currentRecipe }: CurrentRecipeProps) => {
  return (
    <RecipeContainer id="current-recipe">
      <h2>Title</h2>
      <h2>{currentRecipe.title}</h2>
      <h2>Description</h2>
      <img
        src={currentRecipe.backgroundImg}
        alt={`Image of ${currentRecipe.title}`}
        style={{
          width: "10rem",
          height: "auto",
          position: "absolute",
          top: "2rem",
          left: "3rem",
        }}
        onError={(e) => {
          e.currentTarget.src = "/soup.svg";
        }}
      />
      <div
        style={{
          display: "flex",
          gap: "1rem",
          margin: "1rem 0",
        }}
      >
        <Badge>{currentRecipe.category}</Badge>
        <Badge>{currentRecipe.typeOfCuisine}</Badge>
        <Badge>{currentRecipe.caloriesPerServing} cal</Badge>
        <Badge>{currentRecipe.servings} servings</Badge>
        <Badge>{currentRecipe.prepTime} min</Badge>
      </div>
      <p>{currentRecipe.description}</p>
      <h2>Ingredients</h2>
      <ul>
        {currentRecipe.ingredients.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <ul>
        {currentRecipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
      <h2>Sauce</h2>
      {currentRecipe.sauceInstructions && (
        <ul>
          {currentRecipe.sauceInstructions.map((sauce, index) => (
            <li key={index}>{sauce}</li>
          ))}
        </ul>
      )}
      <h2>Side Dishes</h2>
      {currentRecipe.sideDishesRecommendations && (
        <ul>
          {currentRecipe.sideDishesRecommendations.map((sideDish, index) => (
            <li key={index}>{sideDish}</li>
          ))}
        </ul>
      )}
    </RecipeContainer>
  );
};

export default CurrentRecipe;
