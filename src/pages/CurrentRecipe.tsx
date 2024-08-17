import styled from "@emotion/styled";
import Badge from "../components/Badge";
import { Recipe } from "../model/Recipe";
import { IconCategory, IconDumpling, IconFlame, IconStopwatch, IconUsersGroup } from "@tabler/icons-react";

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
  padding: 3rem;
  height: 85vh;
  width: fit-content;
  position: relative;

`;

const CurrentRecipe = ({ currentRecipe }: CurrentRecipeProps) => {
  return (
    <RecipeContainer id="current-recipe">
      {currentRecipe.title ? (
        <h1>{currentRecipe.title}</h1>
      ) : (
        <h2>Recipe Title</h2>
      )}
      {currentRecipe.description ? (
        <p>{currentRecipe.description}</p>
      ) : (
        <p>Recipe Description</p>
      )}
      {/* <img
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
      /> */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          margin: "1rem 0",
        }}
      >
        {currentRecipe.category ? (
          <Badge>
            <IconCategory size={20} />
            {currentRecipe.category}
          </Badge>
        ) : (
          <Badge>Category</Badge>
        )}
        {currentRecipe.typeOfCuisine ? (
          <Badge>
            <IconDumpling size={20} />
            {currentRecipe.typeOfCuisine}
          </Badge>
        ) : (
          <Badge>Cuisine</Badge>
        )}
        {currentRecipe.caloriesPerServing ? (
          <Badge>
            <IconFlame size={20} />
            {currentRecipe.caloriesPerServing} kcal
          </Badge>
        ) : (
          <Badge>Calories</Badge>
        )}
        {currentRecipe.servings ? (
          <Badge>
            <IconUsersGroup size={20} />
            {currentRecipe.servings} servings
          </Badge>
        ) : (
          <Badge>Servings</Badge>
        )}
        {currentRecipe.prepTime ? (
          <Badge>
            <IconStopwatch size={20} />
            {currentRecipe.prepTime} min
          </Badge>
        ) : (
          <Badge>Prep Time</Badge>
        )}
      </div>
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
