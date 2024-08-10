import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React from "react";

const RecipePage = styled.div<{ $backgroundImg?: string; $pageNumber: number }>`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  height: 96dvh;
  width: 50%;
  position: absolute;
  left: ${(props) => (props.$pageNumber % 2 === 0 ? "50%" : "0")};
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(255, 255, 255, 0.1) 100%
    ),
    url(${(props) => props.$backgroundImg});
  background-size: cover;
  background-position: center;
  border-top-right-radius: ${(props) =>
    props.$pageNumber % 2 === 0 ? ".3rem" : "0"};
  border-bottom-right-radius: ${(props) =>
    props.$pageNumber % 2 === 0 ? ".3rem" : "0"};
  border-bottom-left-radius: ${(props) =>
    props.$pageNumber % 2 !== 0 ? ".3rem" : "0"};
  border-top-left-radius: ${(props) =>
    props.$pageNumber % 2 !== 0 ? ".3rem" : "0"};

  .text {
    mix-blend-mode: difference;
    color: white;
  }

  @media (max-width: 1024px) {
    width: 100%;
    gap: 1rem;
    border-radius: 0.3rem;
  }
`;
// https://picsum.photos/1080/1920
export const RecipeMaker = () => {
  const mockPage = [
    {
      backgroundImg: "https://picsum.photos/id/301/1080/1920",
      pageNumber: 1,
    },
    {
      backgroundImg: "https://picsum.photos/id/302/1080/1920",
      pageNumber: 2,
    },
    {
      backgroundImg: "https://picsum.photos/id/303/1080/1920",
      pageNumber: 3,
    },
    {
      backgroundImg: "https://picsum.photos/id/304/1080/1920",
      pageNumber: 4,
    },
    {
      backgroundImg: "https://picsum.photos/id/305/1080/1920",
      pageNumber: 5,
    },
    {
      backgroundImg: "https://picsum.photos/id/306/1080/1920",
      pageNumber: 6,
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
    if(pageRange.end >= mockPage.length) return;
    setPageRange((prev) => ({
      start: prev.start + 2,
      end: prev.end + 2,
    }));
  };
  const handlePageRangeDecrement = () => {
    if(pageRange.start === 1) return;
    setPageRange((prev) => ({
      start: prev.start - 2,
      end: prev.end - 2,
    }));}
    console.log(pageRange);
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
          {mockPage.slice(pageRange.start - 1, pageRange.end).map((page, index) => (
            <RecipePage
              key={index}
              $backgroundImg={page.backgroundImg}
              $pageNumber={index + 1}
            >
              <p className="text">{page.pageNumber}</p>
            </RecipePage>
          ))}
        </div>
      </>
    );
  };
