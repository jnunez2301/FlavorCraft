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
export const RecipeInfo = ({ pageInfo }: RecipeInfoProps) => {
  return (
    <div>
      <h2>{pageInfo.title}</h2>
      <h3>Ingredients</h3>
      <p>{pageInfo.prepTime} minutes</p>
      <ul>
        {pageInfo.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      {pageInfo.sauceInstructions && (
        <>
          <h3>Sauce Instructions</h3>
          <ol>
            {pageInfo.sauceInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </>
      )}
      {pageInfo.sideDishesReeccomendations && (
        <>
          <h3>Side Dishes Recommendations</h3>
          <ul>
            {pageInfo.sideDishesReeccomendations.map((sideDish, index) => (
              <li key={index}>{sideDish}</li>
            ))}
          </ul>
        </>
      )}
      {
        <div>
          <h3>Nutritional Information</h3>
          <p>
            Category <br />
            {pageInfo.category}
          </p>
          <p>
            Servings <br /> {pageInfo.servings}
          </p>
          <p>{pageInfo.caloriesPerServing} kcal/serving</p>
          <p>Cousine <br />{pageInfo.typeOfCousine}</p>
        </div>
      }
      <h3>Instructions</h3>
      <ol>
        {pageInfo.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
};
