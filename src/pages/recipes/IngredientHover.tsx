import { useEffect } from "react";
import useImageSearch from "../../hooks/useImageSearch";
import styled from "@emotion/styled";
import Loader from "../../components/Loader";

const HoverContainer = styled.div<{ $showImages?: boolean }>`
  display: ${({ $showImages }) => ($showImages ? "flex" : "none")};
  position: absolute; /* Changed to absolute */
  max-width: 350px;
  width: fit-content;
  overflow-x: hidden;
  gap: .3rem;
  background-color: var(--info-hover-color);
  top: 50%;
  left: 0;
  z-index: 100;
  pointer-events: none; /* Prevents the hover container from blocking hover events */
  
  img {
    width: 200px;
    height: 100px;
  }
`;
const IngredientHover = ({
  searchQuery,
  showImages = false,
}: {
  searchQuery: string;
  showImages: boolean;
}) => {
  const { images, searchImage } = useImageSearch();
  useEffect(() => {
    searchImage(searchQuery);
    console.log("searchQuery", searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <HoverContainer 
    id="ingredient-hover-container"
     $showImages={showImages}>
      {images && images.length ?
       images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="Recipe"
          onError={(e) => {
            e.currentTarget.src = "/soup.svg";
          }}
        />
      )): <Loader />}
    </HoverContainer>
  );
};

export default IngredientHover;
