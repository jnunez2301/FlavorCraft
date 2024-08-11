import { Recipe } from "../components/RecipeInfo";

export type PageInfo = {
  backgroundImg?: string;
  pageNumber: number;
  customColor?: string;
  recipeDetail?: Recipe;
}