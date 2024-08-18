import { useNavigate, useParams } from "@tanstack/react-router";
import Back from "../../components/Back";
import { useResolveApi } from "../../hooks/useResolveApi";
import { useEffect, useState } from "react";
import { useSession } from "../../auth/SessionContext";
import type { Recipe } from "../../model/Recipe";
import Loader from "../../components/Loader";
import CurrentRecipe from "../CurrentRecipe";
import FancyButton from "../../components/FancyButton";
import {
  IconDownload,
  IconEdit,
  IconFileMinus,
  IconShare,
  IconShareOff,
} from "@tabler/icons-react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import useMedia from "use-media";
import toast from "react-hot-toast";

const RecipeById = () => {
  const { recipeId } = useParams({
    from: "/$recipeId",
  });
  const { getApi, deleteApi, updateApi } = useResolveApi();
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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const handleOpenShareModal = () => {
    if(recipe?.publicRecipe) {
      navigator.clipboard.writeText(`${window.location.origin}/${recipeId}`);
      toast.success("Link copied to clipboard");
      return;
    }
    setIsShareModalOpen(true);
  };
  const handleShareChange = () => {
    const statusChange = recipe?.publicRecipe ? false : true;
    updateApi(`recipes/${recipeId}/user/${userSession?._id}`, {
      publicRecipe: statusChange,
    })
    .then((response) => {
      if (response?.success) {
        toast.success(statusChange ? "Recipe is now public" : "Recipe is now private");
        navigator.clipboard.writeText(`${window.location.origin}/${recipeId}`);
        setTimeout(() => window.location.reload(), 1000);
      }
    })
    .catch((err) => console.error(err));
  }
  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const isMobile = useMedia({ maxWidth: "768px" });
  const isTablet = useMedia({ maxWidth: "1024px", minWidth: "769px" });
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
          {recipe?.userId === userSession?._id ? (
            <>
              <FancyButton
                onClick={() => {
                  navigate({
                    to: `/editor/${recipeId}`,
                  });
                }}
              >
                <IconEdit size={20} />
                {isMobile || isTablet ? "" : "Edit"}
              </FancyButton>
              <FancyButton onClick={() => handleOpenModal()}>
                <IconFileMinus size={20} />
                {isMobile || isTablet ? "" : "Delete"}
              </FancyButton>
              <FancyButton onClick={() => handleOpenShareModal()}>
                <IconShare size={20} />
                {isMobile || isTablet ? "" : "Share"}
              </FancyButton>
              <FancyButton style={{
                display: recipe?.publicRecipe ? "flex" : "none"
              }}  onClick={() => handleShareChange()}>
                <IconShareOff />
                {isMobile || isTablet ? "" : "Private"}
              </FancyButton>
            </>
          ) : null}
          <FancyButton>
            <IconDownload size={20} />
            {isMobile || isTablet ? "" : "Download"}
          </FancyButton>
        </div>
      </nav>
      {recipe ? <CurrentRecipe currentRecipe={recipe} /> : <Loader />}
      <Modal isOpen={isShareModalOpen} onClose={handleCloseShareModal}>
        <h2>Are you sure you want to Share it?</h2>
        <p>
          If you share it the recipe will be <span style={{color: 'var(--danger-color)', fontWeight:'bold'}}>public</span> and <span style={{color: 'var(--danger-color)', fontWeight:'bold'}}>anyone</span> with the link can
          see it.
        </p>
        <div style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-around",
          marginTop: "3rem",
        }}>
        <Button $variant="danger" onClick={() => handleShareChange()}>Yes</Button>
        <Button onClick={handleCloseShareModal}>No</Button>
        </div>
      </Modal>
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
