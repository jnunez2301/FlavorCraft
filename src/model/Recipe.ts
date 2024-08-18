export type Recipe = {
  _id?: string;
  userId?: string;
  title: string;
  description: string;
  category: string;
  typeOfCuisine: string;
  caloriesPerServing: number | string;
  servings: number | string;
  prepTime: number | string;
  ingredients: string[];
  sauceInstructions?: string[];
  instructions: string[];
  sideDishesRecommendations?: string[];
  backgroundImg?: string;
  publicRecipe?: boolean;
};