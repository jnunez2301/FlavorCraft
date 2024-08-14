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
  backgroundImg?: string;
};