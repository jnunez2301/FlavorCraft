export type Recipe = {
  _id?: string;
  userId?: string;
  title: string;
  description: string;
  category: string;
  typeOfCuisine: string;
  caloriesPerServing: number;
  servings: number;
  prepTime: number;
  ingredients: string[];
  sauceInstructions?: string[];
  instructions: string[];
  sideDishesRecommendations?: string[];
  backgroundImg?: string;
};