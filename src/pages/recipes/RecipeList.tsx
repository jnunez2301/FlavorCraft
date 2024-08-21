import { css } from "@emotion/css";
import { Recipe } from "../../model/Recipe";
import styled from "@emotion/styled";
import { useNavigate } from "@tanstack/react-router";
import Loader from "../../components/Loader";
import Badge from "../../components/Badge";
import {
  IconCategory,
  IconDumpling,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

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
  const initialFilter = recipes;
  const [categories, setCategories] = useState<string[] | null>([]);
  const [cousine, setCousine] = useState<string[] | null>([]);
  const [currentRecipes, setCurrentRecipes] = useState<Recipe[]>(initialFilter);
  const [filter, setFilter] = useState<string | null>(null);
  useEffect(() => {
    if(recipes){
      setCategories(recipes.map((recipe) => recipe.category));
      setCousine(recipes.map((recipe) => recipe.typeOfCuisine));
      setCurrentRecipes(recipes);
    }
  }, [recipes])
  if (!recipes) {
    return <Loader />;
  }
  if (recipes.length === 0) {
    return <p>No recipes found</p>;
  }
  const handleBadgeFilter = (query: string) => {
    if(query === filter){
      setFilter(null);
      setCurrentRecipes(recipes);
      return;
    }
    setFilter(query);
    setCurrentRecipes(recipes.filter((recipe) => recipe.category === query || recipe.typeOfCuisine === query));
  };
  return (
    <>
    <div style={{
      display: "flex",
      gap: ".5rem",
      padding: ".5rem",
    }}>
      {cousine && cousine.map((cousine) => <Badge $isActive={filter === cousine} key={cousine} onClick={() => handleBadgeFilter(cousine)}><IconDumpling />{cousine}</Badge>)}
      {categories && categories.map((category) => <Badge $isActive={filter === category} key={category} onClick={() => handleBadgeFilter(category)}><IconCategory/>{category}</Badge>)}
      </div>
    <RecipeSection id="recipe-list">
      
      {currentRecipes.map((recipe) => (
        <div
          key={recipe._id}
          className={css({
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: ".3rem",
            height: "100%",
            transition: "all 0.2s ease-in",
            border: "1px solid var(--info-color)",
            ":hover": {
              color: "var(--accent-color)",
              boxShadow: "10px 10px 0px var(--accent-color)",
            },
          })}
          onClick={() => {
            navigate({
              to: `/${recipe._id}`,
            });
          }}
        >
          <article
            className={css({
              minHeight: "310px",
              height: "100%",
              backgroundImage: `url(${recipe.backgroundImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100%",
            })}
          ></article>
          <h2 style={{ padding: ".5rem" }}>{recipe.title}</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: ".5rem",
              padding: ".5rem",
            }}
          >
            <Badge>
              <IconCategory />
              {recipe.category}
            </Badge>
            <Badge>
              <IconDumpling />
              {recipe.typeOfCuisine}
            </Badge>
          </div>
          <p style={{ padding: ".5rem" }}>{recipe.description}</p>
        </div>
      ))}
    </RecipeSection>
    </>
  );
};

export default RecipeList;
