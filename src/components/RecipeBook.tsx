import { css } from "@emotion/css";
import React from "react";
import { PageInfo } from "../model/PageInfo";
import { RecipePage } from "./RecipePage";
import { Recipe, RecipeInfo } from "./RecipeInfo";

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
export const RecipeBook = () => {
  const mockPage: PageInfo[] = [
    {
      backgroundImg: "https://picsum.photos/id/301/1080/1920",
      pageNumber: 1,
    },
    {
      pageNumber: 2,
      component: () => <RecipeInfo pageInfo={recipeExample} />,
    },
    {
      backgroundImg: "https://picsum.photos/id/310/1080/1920",
      pageNumber: 3,
    },
    {
      pageNumber: 4,
      component: () => <h1>Component 2</h1>,
    },
    {
      backgroundImg: "https://picsum.photos/id/307/1080/1920",
      pageNumber: 5,
    },
    {
      pageNumber: 6,
      component: () => <h1>Component 3</h1>,
    },
    {
      backgroundImg: "https://picsum.photos/id/307/1080/1920",
      pageNumber: 7,
    },
  ];
  const [pageRange, setPageRange] = React.useState({
    start: 1,
    end: 2,
  });
  const handlePageRangeIncrement = () => {
    if (pageRange.end >= mockPage.length) return;
    setPageRange((prev) => ({
      start: prev.start + 2,
      end: prev.end + 2,
    }));
  };
  const handlePageRangeDecrement = () => {
    if (pageRange.start === 1) return;
    setPageRange((prev) => ({
      start: prev.start - 2,
      end: prev.end - 2,
    }));
  };
  const Page = (page: PageInfo) => {
    return (
      <RecipePage
        $backgroundImg={page.backgroundImg}
        $pageNumber={page.pageNumber}
        $customColor={page.pageNumber % 2 === 0 ? "white" : "inherit"}
        {...(page.pageNumber % 2 === 0
          ? {
              whileHover: {
                translateX: -20,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                rotate: 1,
              },
              transition: {
                ease: "easeOut",
                duration: 0.3,
              },
              onClick: () => handlePageRangeIncrement(),
            }
          : {
              whileHover: {
                translateX: 20,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                rotate: -1,
              },
              transition: {
                ease: "easeOut",
                duration: 0.3,
              },
              onClick: () => handlePageRangeDecrement(),
            })}
      >
        <p className="text">{page.pageNumber}</p>
        {page.component && <page.component />}
      </RecipePage>
    );
  };
  return (
    <>
      <button onClick={handlePageRangeDecrement}>Previous</button>
      <button onClick={handlePageRangeIncrement}>Next</button>
      <div
        className={css(`
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        position: relative;
      `)}
      >
        {/* It should display the page range based on mockPage */}
        {mockPage
          .slice(pageRange.start - 1, pageRange.end)
          .map((page, index) => (
            <Page key={index} {...page} />
          ))}
      </div>
    </>
  );
};
