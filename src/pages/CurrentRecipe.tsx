import styled from "@emotion/styled";
import Badge from "../components/Badge";
import { Recipe } from "../model/Recipe";
import {
  IconCategory,
  IconDumpling,
  IconFlame,
  IconStopwatch,
  IconUsersGroup,
} from "@tabler/icons-react";

type CurrentRecipeProps = {
  currentRecipe: Recipe;
};

const RecipeContainer = styled.section`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  gap: 0.3rem;
  align-items: center;
  margin: 0 auto;
  border: 1px solid var(--theme-white);
  padding: 2rem;
  height: 85vh;
  width: 100%;
  max-width: 1024px;
  position: relative;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--accent-color) var(--bg-color);

  @media (max-width: 768px) {
    padding: 1.5rem;
    ul {
      list-style-type: none;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;
    ul {
      list-style-type: none;
    }
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  width: 100%;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    max-width: 400px; /* Optional: Limit max width */
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Description = styled.p`
  width: 100%;
  max-width: 25rem;
  margin: 0;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const IngredientsList = styled.ul`
  width: 100%;
  padding-left: 1rem;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const InstructionsList = styled.ul`
  width: 100%;
  padding-left: 1rem;

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const CurrentRecipe = ({ currentRecipe }: CurrentRecipeProps) => {
  return (
    <RecipeContainer id="current-recipe">
      <Header>
        <img
          src={currentRecipe.backgroundImg}
          alt={`Image of ${currentRecipe.title}`}
          onError={(e) => {
            e.currentTarget.src = "/soup.svg";
          }}
        />
        <div>
          {currentRecipe.title ? (
            <Title>{currentRecipe.title}</Title>
          ) : (
            <Title>Recipe Title</Title>
          )}
          {currentRecipe.description ? (
            <Description>{currentRecipe.description}</Description>
          ) : (
            <Description>Recipe Description</Description>
          )}
        </div>
      </Header>
      <BadgeContainer>
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
      </BadgeContainer>
      <h2>Ingredients</h2>
      <IngredientsList>
        {currentRecipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </IngredientsList>
      <h2>Instructions</h2>
      <InstructionsList>
        {currentRecipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </InstructionsList>
      {currentRecipe.sauceInstructions && (
        <>
          <h2>Sauce</h2>
          <InstructionsList>
            {currentRecipe.sauceInstructions.map((sauce, index) => (
              <li key={index}>{sauce}</li>
            ))}
          </InstructionsList>
        </>
      )}
      {currentRecipe.sideDishesRecommendations && (
        <>
          <h2>Side Dishes</h2>
          <InstructionsList>
            {currentRecipe.sideDishesRecommendations.map((sideDish, index) => (
              <li key={index}>{sideDish}</li>
            ))}
          </InstructionsList>
        </>
      )}
    </RecipeContainer>
  );
};

export default CurrentRecipe;
