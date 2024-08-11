import { css } from "@emotion/css";
import React from "react";
import { PageInfo } from "../model/PageInfo";
import { RecipePage } from "./RecipePage";
import { RecipeInfo } from "./RecipeInfo";
import { mockPage } from "./mockData";
import { RecipeLoader } from "./RecipeLoader";

export const RecipeBook = () => {
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
      //  @ts-expect-error: I had a expect error for this but i forgot what was it
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
                transition: {
                  ease: "easeOut",
                  duration: 0.3,
                },
              },
              onClick: () => handlePageRangeIncrement(),
              animate: {
                x: [-120, 0, -20],
                duration: 2,
              },
            }
          : {
              whileHover: {
                translateX: 20,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                rotate: -1,
                transition: {
                  ease: "easeOut",
                  duration: 0.5,
                },
              },
              onClick: () => handlePageRangeDecrement(),
            })}
      >
        <div>
          <p className="pageNumber">{page.pageNumber}</p>
        </div>
        {page.recipeDetail ? (
          <RecipeInfo pageInfo={page.recipeDetail} />
        ) : (
          page.pageNumber % 2 === 0 && <RecipeLoader />
        )}
      </RecipePage>
    );
  };
  return (
    <div
      id="recipe-book"
      className={css(`
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        position: relative;
      `)}
    >
      {/* It should display the page range based on mockPage */}
      {mockPage.slice(pageRange.start - 1, pageRange.end).map((page, index) => (
        <Page key={index} {...page} />
      ))}
    </div>
  );
};
