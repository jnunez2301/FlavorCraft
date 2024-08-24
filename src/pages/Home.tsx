import { css } from "@emotion/css";
import RecipeBook from "./recipes/RecipeBook";
import { Avatar } from "../components/Avatar";
import { Menu, MenuOption } from "../components/Menu";
import { useState } from "react";
import { useSession } from "../auth/SessionContext";
import { IconDoorExit, IconSoup, IconSunMoon } from "@tabler/icons-react";
import { useResolveApi } from "../hooks/useResolveApi";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { ThemeType, useTheme } from "../context/ThemeContext";

export const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const { clearUserSession, userSession } = useSession();
  const { getApi } = useResolveApi();
  const handleThemeChange = (theme: ThemeType) => {
    setTheme(theme);
  };
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
      <nav
        id="home-nav"
        className={css({
          display: "flex",
          justifyContent: "justify-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "1rem",
        })}
      >
        <div style={{ flex: 1, display: "flex", alignItems: 'center', gap: '.3rem' }}>
          <IconSoup size={35} />
          <h1 style={{ fontSize: "1.8rem" }}>Flavor Craft</h1>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <IconSunMoon
            size={45}
            className={css({
              cursor: "pointer",
              padding: "0.5rem",
              borderRadius: "50%",
              transition: "background-color 0.3s ease",
              ":hover": {
                backgroundColor: `var(--accent-color)`,
              },
            })}
            onClick={() =>
              handleThemeChange(
                theme === ThemeType.Light ? ThemeType.Dark : ThemeType.Light
              )
            }
          />
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
      </nav>
      <RecipeBook />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Do you want to log out?</h2>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "3rem",
          }}
        >
          <Button $variant="danger" onClick={handleLogout}>
            Yes
          </Button>
          <Button onClick={handleCloseModal}>No</Button>
        </div>
      </Modal>
    </section>
  );
};
