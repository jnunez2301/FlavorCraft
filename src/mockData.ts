import { Recipe } from "./model/Recipe";

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
  backgroundImg: "",
};
const recipeExample2: Recipe = {
  title: "Tteokbokki",
  description: "A spicy korean rice cake dish",
  ingredients: [
    "200g of Tteokbokki",
    "2 slice of bacon",
    "Sausage",
    "1/2 Onion",
    "1 Garlic clove",
    "1 spoon of Gochujang",
    "1 spoon of Sugar",
    "1 spoon of Soy sauce",
    "Water"
  ],
  instructions: [
    "Cut the bacon and sausage in small pieces then put in the pan and cook it till it's crispy",
    "After the bacon and sausage are cooked add the onion and the sauce",
    "Then add a little bit of water, the tteokbokki and let it cook for 5 minutes",
    "And to make it a little bit sweat add some milk",
    "Then wait till the sauce is thick and the tteokbokki is soft",
    "At the end add some cheese and let it melt",
  ],
  sideDishesReeccomendations: ["Egg", "Sesame leaves", "Kimchi"],
  sauceInstructions: [
    "Add the garlic previously sliced, add a spoon of sugar, a spoon of soy sauce, a spoon of gochujang and water mixit all together",
  ],
  category: "Dinner",
  typeOfCousine: "Korean",
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
export const mockPage: Recipe[] = [ramenExample, recipeExample, recipeExample2];