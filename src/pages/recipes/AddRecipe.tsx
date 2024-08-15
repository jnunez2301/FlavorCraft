import { IconSoup } from "@tabler/icons-react";
import FancyButton from "../../components/FancyButton";

type AddRecipeProps = {
  onClick?: () => void;
};
const AddRecipe = ({ onClick }: AddRecipeProps) => {
  return (
    <FancyButton onClick={onClick}>
      <IconSoup size={24} />
      <h4>Add a recipe</h4>
    </FancyButton>
  );
};

export default AddRecipe;
