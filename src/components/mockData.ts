import { PageInfo } from "../model/PageInfo";
import { Recipe } from "./RecipeInfo";
const recipeExample: Recipe = {
  title: "Pancake",
  description: "A simple pancake recipe",
  ingredients: ["1 cup flour", "1 cup milk", "1 egg"],
  instructions: [
    "Mix all ingredients together",
    "Pour onto a hot pan",
    "Cook until golden brown",
  ],
  sauceInstructions: ["Mix all ingredients together", "Serve with pancakes"],
  sideDishesReeccomendations: ["Bacon", "Eggs", "Sausage"],
  category: "Breakfast",
  typeOfCousine: "American",
  caloriesPerServing: 200,
  servings: 4,
  prepTime: 10,
};
const recipeExample2: Recipe = {
  title: "Hotcakes",
  description: "A simple hotcake recipe",
  ingredients: ["1 cup flour", "1 cup milk", "1 egg"],
  instructions: [
    "Mix all ingredients together",
    "Pour onto a hot pan",
    "Cook until golden brown",
  ],
  sauceInstructions: ["Mix all ingredients together", "Serve with hotcakes"],
  sideDishesReeccomendations: ["Bacon", "Eggs", "Sausage"],
  category: "Breakfast",
  typeOfCousine: "American",
  caloriesPerServing: 200,
  servings: 4,
  prepTime: 10,
};

export const mockPage: PageInfo[] = [
  {
    backgroundImg: "https://picsum.photos/id/301/1080/1920",
    pageNumber: 1,
  },
  {
    pageNumber: 2,
    recipeDetail: recipeExample,
  },
  {
    backgroundImg: "https://picsum.photos/id/310/1080/1920",
    pageNumber: 3,
  },
  {
    pageNumber: 4,
    recipeDetail: recipeExample2,
  },
  {
    backgroundImg: "https://picsum.photos/id/307/1080/1920",
    pageNumber: 5,
  },
  {
    pageNumber: 6,
    recipeDetail: recipeExample,
  },
  {
    backgroundImg: "https://picsum.photos/id/307/1080/1920",
    pageNumber: 7,
  },
];