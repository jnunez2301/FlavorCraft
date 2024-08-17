import { css } from "@emotion/css";
import { Recipe } from "../../model/Recipe";
import styled from "@emotion/styled";
import { useNavigate } from "@tanstack/react-router";
import Loader from "../../components/Loader";

const RecipeSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 19rem));
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding: 1rem 0;
  align-items: center;
  cursor: pointer;
`;

const RecipeList = ({ recipes = [] }: { recipes: Recipe[] }) => {
  const navigate = useNavigate();
  if (!recipes) {
    return <Loader />;
  }
  if(recipes.length === 0) {
    return <p>No recipes found</p>
  }
  return (
    <RecipeSection>
      {recipes.map((recipe) => (
          <article
            key={recipe._id}
            className={css({
              minHeight: "310px",
              height: "100%",
              display: "grid",
              padding: "1rem",
              justifyItems: "center",
              alignContent: "space-between",
              border: "1px solid var(--info-color)",
              transition: "all 0.2s ease-in",
              textAlign: "center",
              ":hover": {
                color: "var(--accent-color)",
                boxShadow: "10px 10px 0px var(--accent-color)",
              },
            })}
            onClick={() => {
              navigate({
                to: `/${recipe._id}`,
              })
            }}
          >
            <h2>{recipe.title}</h2>
            <img
              style={{
                minWidth: "200px",
                width: "100%",
                maxWidth: "300px",
                height: "auto",
                marginBottom: "1rem",
              }}
              src={recipe.backgroundImg}
              onError={(e) => {
                e.currentTarget.src = "/soup.svg";
              }}
              alt={`Image of ${recipe.title}`}
              />
              <p>{recipe.description}</p>
          </article>
        ))}
    </RecipeSection>
  );
};

export default RecipeList;