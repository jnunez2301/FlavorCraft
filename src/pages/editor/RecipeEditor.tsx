import { useForm, zodResolver } from "@mantine/form";
import { set, z } from "zod";
import { useResolveApi } from "../../hooks/useResolveApi";
import Back from "../../components/Back";
import InvisibleInput from "../../components/InvisibleInput";
import InvisibleTextArea from "../../components/InvisibleTextArea";
import { useEffect, useState } from "react";
import FancyButton from "../../components/FancyButton";
import {
  IconBinocularsFilled,
  IconCategory,
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

const RecipeSchema = z.object({
  title: z
    .string({
      message: "Title is required",
    })
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string({
      message: "Description is required",
    })
    .min(10, { message: "Description must be at least 10 characters long" }),
  category: z
    .string({
      message: "Category is required",
    })
    .min(3, { message: "Category must be at least 3 characters long" }),
  typeOfCousine: z
    .string({
      message: "Type of cousine is required",
    })
    .min(3, { message: "Type of cousine must be at least 3 characters long" }),
  caloriesPerServing: z
    .number({
      message: "Calories per serving is required",
    })
    .min(1, { message: "Calories per serving must be at least 1" }),
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
    .min(1, { message: "Sauce instructions must be at least 1" })
    .optional(),
  instructions: z
    .array(
      z.string({
        message: "Instructions is required",
      })
    )
    .min(1, { message: "Instructions must be at least 1" }),
  sideDishesReeccomendations: z
    .array(
      z.string({
        message: "Side dishes recommendations is required",
      })
    )
    .min(1, { message: "Side dishes recommendations must be at least 1" })
    .optional(),
  backgroundImg: z
    .string({
      message: "Background image is required",
    })
    .optional(),
});
const RecipeEditor = () => {
  const initialValues: Recipe = {
    title: "",
    description: "",
    category: "",
    typeOfCousine: "",
    caloriesPerServing: 0,
    servings: 0,
    prepTime: 0,
    ingredients: [],
    sauceInstructions: [],
    instructions: [],
    sideDishesReeccomendations: [],
    backgroundImg: "",
  };
  const form = useForm({
    mode: "controlled",
    validate: zodResolver(RecipeSchema),
    initialValues,
  });
  const { postApi, zodValidationErrors } = useResolveApi();
  const [currentIngredient, setCurrentIngredient] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentSideDish, setCurrentSideDish] = useState<string>("");
  const [sideDishes, setSideDishes] = useState<string[]>([]);
  const [currentSauceInstruction, setCurrentSauceInstruction] =
    useState<string>("");
  const [sauceInstructions, setSauceInstructions] = useState<string[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>(initialValues);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const handleSubmit = (values: typeof initialValues) => {
    postApi("recipes", values)
      .then((response) => {
        if (response?.success) {
          form.reset();
          console.log("Recipe added successfully");
        }
      })
      .catch((error) => {
        console.error("Error adding recipe", error);
      });
  };
  const handleAddIngredient = () => {
    if (currentIngredient) {
      setIngredients((prev) => {
        const newList = prev.concat(currentIngredient);
        return newList;
      });
      setCurrentIngredient("");
    }
  };
  const handleRemoveIngredient = (index: number) => {
    setIngredients((prev) => {
      const newList = prev.filter((_, i) => i !== index);
      return newList;
    });
  };
  const handleAddSauceInstruction = () => {
    if (currentSauceInstruction) {
      setSauceInstructions((prev) => {
        const newList = prev.concat(currentSauceInstruction);
        return newList;
      });
      setCurrentSauceInstruction("");
    }
  };
  const handleRemoveSauceInstruction = (index: number) => {
    setSauceInstructions((prev) => {
      const newList = prev.filter((_, i) => i !== index);
      return newList;
    });
  };
  const handleAddSideDish = () => {
    if (currentSideDish) {
      setSideDishes((prev) => {
        const newList = prev.concat(currentSideDish);
        return newList;
      });
      setCurrentSideDish("");
    }
  };
  const handleRemoveSideDish = (index: number) => {
    setSideDishes((prev) => {
      const newList = prev.filter((_, i) => i !== index);
      return newList;
    });
  };
  useEffect(() => {
    if (ingredients.length > 0) {
      form.setFieldValue("ingredients", ingredients);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIngredients]);
  useEffect(() => {
    if (sauceInstructions.length > 0) {
      form.setFieldValue("sauceInstructions", sauceInstructions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSauceInstructions]);
  useEffect(() => {
    if (sideDishes.length > 0) {
      form.setFieldValue("sideDishesReeccomendations", sideDishes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSideDishes]);
  useEffect(() => {
    const currentRecipe = form.getValues();
    setCurrentRecipe(currentRecipe);
  }, [form]);
  const handlePreview = () => {
    setIsPreview((prev) => !prev);
  };
  console.log(currentRecipe)
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
        height: "100%",
        position: "relative",
      }}
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
        <Back />
        <div id="control-buttons" 
        style={{
          display: "flex",
          gap: "1rem",
        }}>
          <FancyButton onClick={handlePreview}>
            <IconBinocularsFilled size={iconSize} />
            <h4>Preview</h4>
          </FancyButton>
          <FancyButton>
            <IconDeviceFloppy size={iconSize} />
            <h4>Save</h4>
          </FancyButton>
        </div>
      </nav>
      <form
        style={{
          border: "1px solid var(--accent-color)",
          width: "820px",
          padding: "1rem",
          display: isPreview ? "none" : "grid",
          gap: "2rem",
          margin: "0 auto",
          backgroundColor: "var(--bg-color)",
        }}
        onSubmit={form.onSubmit(handleSubmit, zodValidationErrors)}
      >
        <p>Items that are not marked with * are optional</p>
        <header>
          <h2>Title*</h2>
          <InvisibleInput
            placeholder="Type your title"
            $size="large"
            {...form.getInputProps("title")}
          />
        </header>
        <h2>Prep Time</h2>
        <div style={centerFlex}>
          <IconStopwatch size={iconSize} />
          <InvisibleInput
            placeholder="Prep time"
            $size="medium"
            type="number"
            min={1}
            {...form.getInputProps("prepTime")}
          />
        </div>
        <aside>
          <h2>Description*</h2>
          <InvisibleTextArea
            placeholder="Describe your dish"
            {...form.getInputProps("description")}
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
              placeholder="List your ingredients"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleAddIngredient();
                }
              }}
              onChange={(event) => setCurrentIngredient(event.target.value)}
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
            <h2>Sauce</h2>
            <p>
              Totally optional here you can add your sauce instructions for your
              dish
            </p>
            <InvisibleInput
              placeholder="List your ingredients"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
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
              placeholder="List your side dishes recommendations"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
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
            <h4>Category</h4>
            <div style={centerFlex}>
              <IconCategory size={iconSize} />
              <InvisibleInput
                placeholder="Main Dish, Dessert, etc."
                $size="medium"
                {...form.getInputProps("category")}
              />
            </div>
          </div>
          <div>
            <h4>Cousine</h4>
            <div style={centerFlex}>
              <IconDumpling size={iconSize} />
              <InvisibleInput
                placeholder="Type of cousine"
                $size="medium"
                {...form.getInputProps("typeOfCousine")}
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
                type="number"
                min={1}
                max={1000}
                {...form.getInputProps("caloriesPerServing")}
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
                type="number"
                min={1}
                {...form.getInputProps("servings")}
              />
            </div>
          </div>
        </aside>
        <h2>Dish Photo</h2>
        <InvisibleInput
          type="file"
          $size="medium"
          accept="image/*"
          {...form.getInputProps("backgroundImg")}
        />
        <h2>Instructions*</h2>
        <InvisibleTextArea
          placeholder="Preheat the oven to 350F, etc..."
          {...form.getInputProps("instructions")}
        />
      </form>
      {/* {currentRecipe ? <CurrentRecipe recipe={currentRecipe} /> : ''} */}
    </section>
  );
};

export default RecipeEditor;
