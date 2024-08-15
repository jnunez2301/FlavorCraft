import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useResolveApi } from "../../hooks/useResolveApi";
import Back from "../../components/Back";

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
  const initialValues = {
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
  return (
    <div style={{
      padding: "1rem",
    }}>
      <form onSubmit={form.onSubmit(handleSubmit, zodValidationErrors)}>
        <Back />
      </form>
    </div>
  );
};

export default RecipeEditor;
