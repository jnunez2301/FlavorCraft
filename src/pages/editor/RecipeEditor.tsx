/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useResolveApi } from "../../hooks/useResolveApi";
import Back from "../../components/Back";
import InvisibleInput from "../../components/InvisibleInput";
import InvisibleTextArea from "../../components/InvisibleTextArea";
import { useEffect, useState } from "react";
import FancyButton from "../../components/FancyButton";
import {
  IconBinocularsFilled,
  IconCategory,
  IconCircuitSwitchClosed,
  IconDeviceFloppy,
  IconDumpling,
  IconFlame,
  IconPlus,
  IconStopwatch,
  IconTrash,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Recipe } from "../../model/Recipe";
import CurrentRecipe from "../CurrentRecipe";
import { useSession } from "../../auth/SessionContext";
import Loader from "../../components/Loader";
import { useNavigate } from "@tanstack/react-router";

const RecipeSchema = z.object({
  userId: z.string({
    message: "User id is required",
  }),
  title: z
    .string({
      message: "Title is required",
    })
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string({
      message: "Description is required",
    })
    .min(3, { message: "Description must be at least 3 characters long" }),
  category: z
    .string({
      message: "Category is required",
    })
    .min(3, { message: "Category must be at least 3 characters long" }),
  typeOfCuisine: z
    .string({
      message: "Type of cousine is required",
    })
    .min(3, { message: "Type of cousine must be at least 3 characters long" }),
  caloriesPerServing: z
    .number({
      message: "Calories per serving is required",
    })
    .default(1)
    .optional(),
  servings: z
    .number({
      message: "Servings is required",
    })
    .min(1, { message: "Servings must be at least 1" }),
  prepTime: z
    .number({
      message: "Prep time is required",
    })
    .min(1, { message: "Prep time must be at least 1" }),
  ingredients: z
    .array(
      z.string({
        message: "Ingredients is required",
      })
    )
    .min(1, { message: "Ingredients must be at least 1" }),
  sauceInstructions: z
    .array(
      z.string({
        message: "Sauce instructions is required",
      })
    )
    .optional(),
  instructions: z
    .array(
      z.string({
        message: "Instructions is required",
      })
    )
    .min(1, { message: "Instructions must be at least 1" }),
  sideDishesRecommendations: z
    .array(
      z.string({
        message: "Side dishes recommendations is required",
      })
    )
    .optional(),
  backgroundImg: z
    .string({
      message: "Background image is required",
    })
    .optional(),
});
const NewRecipe = ({
  userId,
  recipeId,
}: {
  userId: string;
  recipeId?: string | null;
}) => {
  const { getApi, postApi, updateApi, zodValidationErrors } = useResolveApi();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<Recipe>({
    userId: userId,
    title: "",
    description: "",
    category: "",
    typeOfCuisine: "",
    caloriesPerServing: '',
    servings: '',
    prepTime: '',
    ingredients: [],
    sauceInstructions: [],
    instructions: [],
    sideDishesRecommendations: [],
    backgroundImg: "",
  });
  const form = useForm({
    mode: "controlled",
    validate: zodResolver(RecipeSchema),
    initialValues,
  });

  useEffect(() => {
    if (recipeId) {
      getApi(`recipes/${recipeId}/user/${userId}`)
        .then((response) => {
          if (response?.success) {
            setInitialValues(response.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching recipe", error);
        });
    }
  }, [recipeId, userId]);

  const [instructions, setInstructions] = useState<string[]>([]);
  const [currentInstruction, setCurrentInstruction] = useState<string>("");
  const [currentIngredient, setCurrentIngredient] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentSideDish, setCurrentSideDish] = useState<string>("");
  const [sideDishes, setSideDishes] = useState<string[]>([]);
  const [backgroundImageName, setBackgroundImageName] = useState<string>("");
  const [currentSauceInstruction, setCurrentSauceInstruction] = useState<string>("");
  const [sauceInstructions, setSauceInstructions] = useState<string[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>(initialValues);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  // Calories, Servings, Prep Time
  const [caloriesPerServing, setCaloriesPerServing] = useState<number>(0);
  const [servings, setServings] = useState<number>(0);
  const [prepTime, setPrepTime] = useState<number>(0);
  useEffect(() => {
    form.setValues(initialValues);
    setInstructions(initialValues.instructions || []);
    setIngredients(initialValues.ingredients || []);
    setSideDishes(initialValues.sideDishesRecommendations || []);
    setSauceInstructions(initialValues.sauceInstructions || []);
    setBackgroundImageName(initialValues.backgroundImg || "");
    setCaloriesPerServing(+initialValues.caloriesPerServing || 0);
    setServings(+initialValues.servings || 0);
    setPrepTime(+initialValues.prepTime || 0);
  }, [initialValues]);
  const handleSubmit = (values: typeof initialValues) => {
    if (recipeId) {
      updateApi(`recipes/${recipeId}/user/${userId}`, values)
        .then((response) => {
          if (response?.success) {
            console.log("Recipe updated", response.message);
          }
        })
        .catch((error) => {
          console.error("Error updating recipe", error);
        });
    } else {
      postApi("recipes", values)
        .then((response) => {
          if (response?.success) {
            form.reset();
            setInstructions([]);
            setIngredients([]);
            setSideDishes([]);
            setSauceInstructions([]);
            setBackgroundImageName("");
            navigate({
              to: "/",
            });
          }
        })
        .catch((error) => {
          console.error("Error adding recipe", error);
        });
    }
  };
  const handleAddInstruction = () => {
    if (currentInstruction) {
      setInstructions((prev) => {
        const newList = prev.concat(currentInstruction);
        form.setFieldValue("instructions", newList);
        return newList;
      });
      setCurrentInstruction("");
    }
  };
  const handleRemoveInstruction = (index: number) => {
    setInstructions((prev) => {
      const newList = prev.filter((_, i) => i !== index);
      form.setFieldValue("instructions", newList);
      return newList;
    });
  };
  const handleAddIngredient = () => {
    if (currentIngredient) {
      setIngredients((prev) => {
        const newList = prev.concat(currentIngredient);
        form.setFieldValue("ingredients", newList);
        return newList;
      });
      setCurrentIngredient("");
    }
  };
  const handleRemoveIngredient = (index: number) => {
    setIngredients((prev) => {
      const newList = prev.filter((_, i) => i !== index);
      form.setFieldValue("ingredients", newList);
      return newList;
    });
  };
  const handleAddSauceInstruction = () => {
    if (currentSauceInstruction) {
      setSauceInstructions((prev) => {
        const newList = prev.concat(currentSauceInstruction);
        form.setFieldValue("sauceInstructions", newList);
        return newList;
      });
      setCurrentSauceInstruction("");
    }
  };
  const handleRemoveSauceInstruction = (index: number) => {
    setSauceInstructions((prev) => {
      const newList = prev.filter((_, i) => i !== index);
      form.setFieldValue("sauceInstructions", newList);
      return newList;
    });
  };
  const handleAddSideDish = () => {
    if (currentSideDish) {
      setSideDishes((prev) => {
        const newList = prev.concat(currentSideDish);
        form.setFieldValue("sideDishesRecommendations", newList);
        return newList;
      });
      setCurrentSideDish("");
    }
  };
  const handleRemoveSideDish = (index: number) => {
    setSideDishes((prev) => {
      const newList = prev.filter((_, i) => i !== index);
      form.setFieldValue("sideDishesRecommendations", newList);
      return newList;
    });
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBackgroundImageName(file.name);
      form.setFieldValue("backgroundImg", file.name); // Store file name or handle file upload accordingly
    }
  };
  useEffect(() => {
    const currentRecipe = form.getValues();
    setCurrentRecipe(currentRecipe);
  }, [form]);
  const handlePreview = () => {
    setIsPreview((prev) => !prev);
  };
  const centerFlex = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };
  const iconSize = 34;
  return (
    <section
      id="recipe-editor"
      style={{
        padding: "1rem",
        position: "relative",
      }}
    >
      <form
        style={{ position: "relative" }}
        onSubmit={form.onSubmit(handleSubmit, zodValidationErrors)}
      >
        <nav
          style={{
            position: "sticky",
            top: "0",
            backgroundColor: "var(--bg-color)",
            borderBottom: "1px solid var(--accent-color)",
            padding: "1rem 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Back pathToGoBack={recipeId ? '/' : '..'} />
          <div
            id="control-buttons"
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <FancyButton onClick={handlePreview}>
              {isPreview ? (
                <>
                  <IconCircuitSwitchClosed size={iconSize} />
                  <h4>Hide</h4>
                </>
              ) : (
                <>
                  <IconBinocularsFilled size={iconSize} />
                  <h4>Preview</h4>
                </>
              )}
            </FancyButton>
            <FancyButton
              as={"button"}
              style={{
                color: "var(--theme-white)",
              }}
            >
              <IconDeviceFloppy size={iconSize} />
              <h4>Save</h4>
            </FancyButton>
          </div>
        </nav>
        <div
          style={{
            border: "1px solid var(--accent-color)",
            width: "820px",
            padding: "1rem",
            display: isPreview ? "none" : "grid",
            gap: "2rem",
            margin: "0 auto",
            backgroundColor: "var(--bg-color)",
          }}
        >
          <p>Items that are not marked with * are optional</p>
          <header>
            <h2>Title*</h2>
            <InvisibleInput
              placeholder="Type your title"
              $size="large"
              {...form.getInputProps("title")}
              required
            />
          </header>
          <h2>Prep Time*</h2>
          <div style={centerFlex}>
            <IconStopwatch size={iconSize} />
            <InvisibleInput
              placeholder="Prep time"
              $size="medium"
              value={prepTime}
              onChange={(event) => {
                form.setFieldValue("prepTime", +event.target.value)
                setPrepTime(Number(event.target.value))
              }}
              />
            <p>Minutes</p>
          </div>
          <aside>
            <h2>Description*</h2>
            <InvisibleTextArea
              placeholder="Describe your dish"
              {...form.getInputProps("description")}
              required
            />
          </aside>
          <aside
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <header
              style={{
                flex: 1,
              }}
            >
              <h2>Ingredients*</h2>
              <InvisibleInput
                value={currentIngredient}
                placeholder="List your ingredients"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleAddIngredient();
                  }
                }}
                onChange={(event) => setCurrentIngredient(event.target.value)}
                onBlur={() => {
                  if (currentIngredient.length > 0) {
                    handleAddIngredient();
                  }
                }}
              />
            </header>

            <FancyButton
              style={{
                height: "54px",
              }}
              onClick={() => handleAddIngredient()}
            >
              <IconPlus />
              Ingredient
            </FancyButton>
          </aside>

          {ingredients &&
            ingredients.length > 0 &&
            ingredients.map((ingredient, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "justify-between",
                  gap: "1rem",
                  overflowY: "auto",
                }}
                key={index}
              >
                <p style={{ flex: 1 }}>{ingredient}</p>
                <FancyButton
                  style={{
                    height: "34px",
                  }}
                  onClick={() => handleRemoveIngredient(index)}
                >
                  <IconTrash size={16} />
                </FancyButton>
              </div>
            ))}
          <aside
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <header
              style={{
                flex: 1,
              }}
            >
              <h2>Instructions*</h2>
              <InvisibleInput
                value={currentInstruction}
                placeholder="List your instructions"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleAddInstruction();
                  }
                }}
                onBlur={() => {
                  if (currentInstruction.length > 0) {
                    handleAddInstruction();
                  }
                }}
                onChange={(event) => setCurrentInstruction(event.target.value)}
              />
            </header>
            <FancyButton
              style={{
                height: "54px",
              }}
              onClick={() => handleAddInstruction()}
            >
              <IconPlus />
              Step
            </FancyButton>
          </aside>
          {instructions &&
            instructions.length > 0 &&
            instructions.map((instruction, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "justify-between",
                  gap: "1rem",
                  overflowY: "auto",
                }}
                key={index}
              >
                <p style={{ flex: 1 }}>{instruction}</p>
                <FancyButton
                  style={{
                    height: "34px",
                  }}
                  onClick={() => handleRemoveInstruction(index)}
                >
                  <IconTrash size={16} />
                </FancyButton>
              </div>
            ))}
          <aside
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <header
              style={{
                flex: 1,
              }}
            >
              <h2>Sauce</h2>
              <p>
                Totally optional here you can add your sauce instructions for
                your dish
              </p>
              <InvisibleInput
                value={currentSauceInstruction}
                placeholder="List your ingredients"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleAddSauceInstruction();
                  }
                }}
                onBlur={() => {
                  if (currentSauceInstruction.length > 0) {
                    handleAddSauceInstruction();
                  }
                }}
                onChange={(event) =>
                  setCurrentSauceInstruction(event.target.value)
                }
              />
            </header>
            <FancyButton
              style={{
                height: "54px",
              }}
              onClick={() => handleAddSauceInstruction()}
            >
              <IconPlus />
              Step
            </FancyButton>
          </aside>
          {sauceInstructions &&
            sauceInstructions.length > 0 &&
            sauceInstructions.map((ingredient, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "justify-between",
                  gap: "1rem",
                  overflowY: "auto",
                }}
                key={index}
              >
                <p style={{ flex: 1 }}>{ingredient}</p>
                <FancyButton
                  style={{
                    height: "34px",
                  }}
                  onClick={() => handleRemoveSauceInstruction(index)}
                >
                  <IconTrash size={16} />
                </FancyButton>
              </div>
            ))}
          <aside
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <header style={{ flex: 1 }}>
              <h2>Side dishes</h2>
              <p>Optional but you can add some recommendations</p>
              <InvisibleInput
                value={currentSideDish}
                placeholder="List your side dishes recommendations"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleAddSideDish();
                  }
                }}
                onBlur={() => {
                  if (currentSideDish.length > 0) {
                    handleAddSideDish();
                  }
                }}
                onChange={(event) => setCurrentSideDish(event.target.value)}
              />
            </header>
            <FancyButton
              style={{
                height: "54px",
              }}
              onClick={() => handleAddSideDish()}
            >
              <IconPlus />
              Side dish
            </FancyButton>
          </aside>
          {sideDishes &&
            sideDishes.length > 0 &&
            sideDishes.map((sideDish, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "justify-between",
                  gap: "1rem",
                  overflowY: "auto",
                }}
                key={index}
              >
                <p style={{ flex: 1 }}>{sideDish}</p>
                <FancyButton
                  style={{
                    height: "34px",
                  }}
                  onClick={() => handleRemoveSideDish(index)}
                >
                  <IconTrash size={16} />
                </FancyButton>
              </div>
            ))}
          <aside
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
            }}
          >
            <div>
              <h4>Category*</h4>
              <div style={centerFlex}>
                <IconCategory size={iconSize} />
                <InvisibleInput
                  placeholder="Main Dish, Dessert, etc."
                  $size="medium"
                  {...form.getInputProps("category")}
                  required
                />
              </div>
            </div>
            <div>
              <h4>Cousine*</h4>
              <div style={centerFlex}>
                <IconDumpling size={iconSize} />
                <InvisibleInput
                  placeholder="Korean, Mexican, etc."
                  $size="medium"
                  {...form.getInputProps("typeOfCuisine")}
                  required
                />
              </div>
            </div>
            <div>
              <h4>Calories</h4>
              <div style={centerFlex}>
                <IconFlame size={iconSize} />
                <InvisibleInput
                  placeholder="Calories per serving"
                  $size="medium"
                  value={caloriesPerServing}
                  onChange={(event) => {
                    form.setFieldValue("caloriesPerServing", +event.target.value)
                    setCaloriesPerServing(Number(event.target.value))
                  }}
                />
              </div>
            </div>
            <div>
              <h4>Servings</h4>
              <div style={centerFlex}>
                <IconUsersGroup size={iconSize} />
                <InvisibleInput
                  placeholder="Servings"
                  $size="medium"
                  value={servings}
                  onChange={(event) =>{                    
                    form.setFieldValue("servings", +event.target.value)
                    setServings(Number(event.target.value))
                  }}
                  required
                />
              </div>
            </div>
          </aside>
          <h2>Dish Photo</h2>
          <InvisibleInput
            type="file"
            $size="medium"
            accept="image/*"
            onChange={handleFileChange} // Set file name on change
          />
          {backgroundImageName && <p>Selected file: {backgroundImageName}</p>}
        </div>
      </form>
      {isPreview && currentRecipe ? (
        <CurrentRecipe currentRecipe={currentRecipe} />
      ) : null}
    </section>
  );
};

const RecipeEditor = ({ recipeId }: { recipeId?: string }) => {
  const { userSession } = useSession();
  return userSession ? (
    <NewRecipe recipeId={recipeId} userId={userSession._id} />
  ) : (
    <Loader />
  );
};

export default RecipeEditor;
