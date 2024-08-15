import { css } from "@emotion/css";
import RecipeBook from "./recipes/RecipeBook";
import { Avatar } from "../components/Avatar";
import { Menu, MenuOption } from "../components/Menu";
import { useState } from "react";
import { useSession } from "../auth/SessionContext";
import { IconDoorExit } from "@tabler/icons-react";
import { useResolveApi } from "../hooks/useResolveApi";
import Modal from "../components/Modal";
import Button from "../components/Button";

export const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { clearUserSession, userSession } = useSession();
  const { getApi } = useResolveApi();

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleLogout = () => {
    getApi("auth/logout")
      .then((response) => {
        if (response?.success) {
          clearUserSession();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <section
      style={{
        
        padding: "1.3rem",
      }}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "flex-end",
        })}
      >
        {userSession && (
          <Avatar
            avatarImg={userSession?.profilePicture}
            fallback={userSession.username}
            onClick={handleMenu}
          />
        )}
        <Menu showMenu={showMenu}>
          <MenuOption>
            <IconDoorExit size={20} />
            <span onClick={() => handleOpenModal()}>Logout</span>
          </MenuOption>
        </Menu>
      </div>
      <RecipeBook />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Do you want to log out?</h2>
        <div style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginTop: "3rem",
        }}>
          <Button $variant="danger" onClick={handleLogout}>Yes</Button>
          <Button onClick={handleCloseModal}>No</Button>
        </div>
      </Modal>
    </section>
  );
};
