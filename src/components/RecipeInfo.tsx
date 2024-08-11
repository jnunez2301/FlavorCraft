import styled from "@emotion/styled";

export type Recipe = {
  title: string;
  description: string;
  category: string;
  typeOfCousine: string;
  caloriesPerServing: number;
  servings: number;
  prepTime: number;
  ingredients: string[];
  sauceInstructions?: string[];
  instructions: string[];
  sideDishesReeccomendations?: string[];
};
type RecipeInfoProps = {
  pageInfo: Recipe;
};
const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: end;
  margin-bottom: 0.5rem;
`;
const SubTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  color: gray;
  text-align: end;
  margin-bottom: .5rem;
`;
const List = styled.ul<{ $alignText?: "start" | "center" | "end" | string }>`
  list-style-type: none;
  text-align: ${({ $alignText }) => $alignText || "end"};
`;
const NutritionalInformation = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  justify-items: end;
`;
const NutritionalLabel = styled.p`
  font-weight: bold;
  color: lightgray;
  span {
    color: black;
  }
`;
export const RecipeInfo = ({ pageInfo }: RecipeInfoProps) => {
  return (
    <div>
      <Title>{pageInfo.title}</Title>
      <SubTitle>Ingredients</SubTitle>
      <List>
        {pageInfo.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </List>
      <SubTitle>Preparation Time</SubTitle>
      <p style={{ textAlign: "end" }}>{pageInfo.prepTime} minutes</p>
      {pageInfo.sauceInstructions && (
        <>
          <SubTitle>Sauce Instructions</SubTitle>
          <List>
            {pageInfo.sauceInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </List>
        </>
      )}
      {pageInfo.sideDishesReeccomendations && (
        <>
          <SubTitle>Side Dishes Recommendations</SubTitle>
          <List>
            {pageInfo.sideDishesReeccomendations.map((sideDish, index) => (
              <li key={index}>{sideDish}</li>
            ))}
          </List>
        </>
      )}
      <SubTitle>Nutritional Information</SubTitle>
      {
        <NutritionalInformation>
          <NutritionalLabel>
            <p>Category</p>
            <span>{pageInfo.category}</span>
          </NutritionalLabel>
          <NutritionalLabel>
            <p>Servings</p>
            <span> {pageInfo.servings}</span>
          </NutritionalLabel>
          <NutritionalLabel>
            <p>Calories</p>
            <span>{pageInfo.caloriesPerServing} kcal</span>
          </NutritionalLabel>
          <NutritionalLabel>
            <p>Cousine</p>
            <span>{pageInfo.typeOfCousine}</span>
          </NutritionalLabel>
        </NutritionalInformation>
      }
      <SubTitle>Instructions</SubTitle>
      <List>
        {pageInfo.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </List>
    </div>
  );
};
