import { css } from "@emotion/css";
import RecipeBook from "./recipes/RecipeBook";
import { Avatar } from "../components/Avatar";
import { Menu, MenuOption } from "../components/Menu";
import { useState } from "react";
import { useSession } from "../auth/SessionContext";
import { IconDoorExit } from "@tabler/icons-react";
import { useResolveApi } from "../hooks/useResolveApi";

export const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { clearUserSession } = useSession();
  const { getApi } = useResolveApi();

  const handleMenu = () => {
    setShowMenu(!showMenu);
  }
  const handleLogout = () => {
    getApi("auth/logout")
    .then(response => {
      if(response?.success){
        clearUserSession();
      }
    })
    .catch(err => console.error(err));
  }
  
  return (
    <section
      style={{
        backgroundColor: "var(--bg-color)",
        padding: "1.3rem",
      }}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "flex-end",
        })}
      >
        <Avatar avatarImg="" fallback="Jhonata Núñez" onClick={handleMenu} />
        <Menu showMenu={showMenu}>
          <MenuOption>Menu</MenuOption>
          <MenuOption>Option 1</MenuOption>
          <MenuOption >
            <IconDoorExit size={20} />
            <span onClick={() => handleLogout()}>Logout</span>
          </MenuOption>
        </Menu>
      </div>
      <RecipeBook />
    </section>
  );
};
