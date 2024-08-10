import { css } from "@emotion/css";
import React from "react";
import { PageInfo } from "../model/PageInfo";
import { RecipePage } from "./RecipePage";

export const RecipeMaker = () => {
  const mockPage: PageInfo[] = [
    {
      backgroundImg: "https://picsum.photos/id/301/1080/1920",
      pageNumber: 1,
    },
    {
      pageNumber: 2,
      component: () => <h1>Component 1</h1>,
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
        $customColor={page.pageNumber % 2 === 0 ? "inherit" : "blue"}
        {...page.pageNumber % 2 === 0 ? { 
          whileHover: { 
            translateX: -50,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            rotate: 1
           },
           transition: { 
            ease: "easeOut",
            duration: 0.5,
           },
           onClick: () => handlePageRangeIncrement(),
         } : {
          whileHover: { 
            translateX: 50,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            rotate: -1
           },
           transition: { 
            ease: "easeOut",
            duration: 0.5,
           },
           onClick: () => handlePageRangeDecrement(),
         }
        }
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
