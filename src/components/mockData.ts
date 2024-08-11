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
const ramenExample: Recipe = {
  title: "Ramen de Pavo",
  description: "Un ramen de pavo con huevo y verduras",
  ingredients: [
    "200g Fideos",
    "4 Cucharadas de salsa Tare",
    "1 Cucharada de Salsa de Soja",
    "1/4 Jengibre",
    "1/4 Cebolla",
    "1 Huevo",
    "1 Cebollín",
    "1/2 Alga Nori",
    "2 Tajadas de Naruto",
    "80-120g de Pavo",
    "Caldo de Pollo"
  ],
  caloriesPerServing: 475,
  category: "Almuerzo/Cena",
  typeOfCousine: "Japonesa",
  prepTime: 30,
  servings: 1,
  instructions: [
    "Cocinar los fideos en agua hirviendo al gusto",
    "Hervir el huevo por 6-8 minutos y luego sumergirlo en agua fría",
    "Mientras reposa el huevo, cortar el cebollín, la cebolla y el jengibre en rodajas finas",
    "En una olla, cocinar el pavo con la salsa de soja y la salsa tare",
    "Agregar el caldo de pollo y dejar hervir",
    "En un bowl, colocar los fideos cocidos y agregar el caldo con el pavo",
    "Itadakimasu!",
  ],
  sideDishesReeccomendations: ["Gyoza", "Tempura", "Sushi"],
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
    backgroundImg:
      "https://sabor.eluniverso.com/wp-content/uploads/2023/12/IMG_0836-1024x768.jpeg",
    pageNumber: 5,
  },
  {
    pageNumber: 6,
    recipeDetail: ramenExample,
  },
  {
    backgroundImg: "https://picsum.photos/id/307/1080/1920",
    pageNumber: 7,
  },
];
