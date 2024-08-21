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
import { fadeIn } from "../util/animation";

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
  height: 85vh;
  width: 100%;
  max-width: 1024px;
  position: relative;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--accent-color) var(--bg-color);
  animation: ${fadeIn} 0.3s ease-in-out;
  ul {
    list-style-type: none;
  }
  @media (max-width: 768px) {
    padding: 1.5rem;
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

const Title = styled.h2`
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
  display: grid;
  gap: 1.3rem;
  li{
    cursor: pointer;
    width: fit-content;
    &:hover{
      text-decoration: underline;
    }
  }
  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const InstructionsList = styled.ul`
  width: 100%;
  padding-left: 1rem;
  padding-bottom: 1rem;
  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;
const RecipeImage = styled.div<{$backgroundImg?: string}>`
  background-image: url(${(props) => props.$backgroundImg || "/soup.svg"});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 300px;
  margin-bottom: 1rem;
`;
const SubTitle = styled.h2`
  padding-left: 1rem;
  margin-bottom: .5rem;
`
const CurrentRecipe = ({ currentRecipe }: CurrentRecipeProps) => {
  /* const [isHovered, setIsHovered] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const handleHover = (query: string) => {
    setSearchQuery(query);
    setIsHovered(true);
  }
  const handleLeave = () => {
    setIsHovered(false);
    setSearchQuery("");
  } */

  return (
    <RecipeContainer id="current-recipe">
      <Header>
        <RecipeImage $backgroundImg={currentRecipe.backgroundImg} />
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
      <SubTitle>Ingredients</SubTitle>
      <IngredientsList>
        {/* {searchQuery && searchQuery.length > 0 && <IngredientHover searchQuery={searchQuery} showImages={isHovered} />} */}
        {currentRecipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </IngredientsList>
      <SubTitle>Instructions</SubTitle>
      <InstructionsList>
        {currentRecipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </InstructionsList>
      {currentRecipe.sauceInstructions && (
        <>
          <SubTitle>Sauce</SubTitle>
          <InstructionsList>
            {currentRecipe.sauceInstructions.map((sauce, index) => (
              <li key={index}>{sauce}</li>
            ))}
          </InstructionsList>
        </>
      )}
      {currentRecipe.sideDishesRecommendations && (
        <>
          <SubTitle>Side Dishes</SubTitle>
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
