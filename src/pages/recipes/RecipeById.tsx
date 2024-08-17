import { useNavigate, useParams } from "@tanstack/react-router";
import Back from "../../components/Back";
import { useResolveApi } from "../../hooks/useResolveApi";
import { useEffect, useState } from "react";
import { useSession } from "../../auth/SessionContext";
import type { Recipe } from "../../model/Recipe";
import Loader from "../../components/Loader";
import CurrentRecipe from "../CurrentRecipe";
import FancyButton from "../../components/FancyButton";
import { IconDownload, IconEdit, IconFileMinus } from "@tabler/icons-react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

const RecipeById = () => {
  const { recipeId } = useParams({
    from: "/$recipeId",
  });
  const { getApi, deleteApi } = useResolveApi();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { userSession } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (userSession) {
      getApi(`recipes/${recipeId}/user/${userSession._id}`)
        .then((response) => {
          if (response?.success) {
            setRecipe(response.message);
          }
        })
        .catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <nav
        id="recipe-nav"
        style={{
          display: "flex",
          justifyContent: "justify-between",
          gap: "1rem",
          padding: "1rem",
          marginBottom: ".5rem",
          borderBottom: "1px solid var(--theme-white)",
          backgroundColor: "var(--bg-color)",
        }}
      >
        <div style={{ flex: 1 }}>
          <Back />
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <FancyButton
            onClick={() => {
              navigate({
                to: `/editor/${recipeId}`,
              });
            }}
          >
            <IconEdit size={20} />
            Edit
          </FancyButton>
          <FancyButton onClick={() => handleOpenModal()}>
            <IconFileMinus size={20} />
            Delete
          </FancyButton>
          <FancyButton>
            <IconDownload size={20} />
            Download
          </FancyButton>
        </div>
      </nav>
      {recipe ? <CurrentRecipe currentRecipe={recipe} /> : <Loader />}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>
          Do you want to delete{" "}
          <span
            style={{
              color: "var(--accent-color)",
            }}
          >
            {recipe?.title}
          </span>
          ?
        </h2>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "3rem",
          }}
        >
          <Button
            $variant="danger"
            onClick={() => {
              deleteApi(`recipes/${recipeId}/user/${userSession?._id}`)
                .then((response) => {
                  if (response?.success) {
                    navigate({
                      to: "/",
                    });
                  }
                })
                .catch((err) => console.error(err));
            }}
          >
            Yes
          </Button>
          <Button onClick={handleCloseModal}>No</Button>
        </div>
      </Modal>
    </section>
  );
};

export default RecipeById;
