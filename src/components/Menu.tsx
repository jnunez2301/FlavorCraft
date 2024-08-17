import { keyframes } from "@emotion/css";
import styled from "@emotion/styled";

type MenuProps = {
  showMenu: boolean;
  label?: string;
  children: React.ReactNode;
};
const translateY = keyframes`
  from {
    transform: translateY(-10px);
  }
  to {
    transform: translateY(0);
  }
`;

const ShowMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 5rem;
  right: 1rem;
  background-color: var(--info-color);
  padding: 1rem;
  border-radius: 0.3rem;
  box-shadow: 0 0 5px var(--info-color);
  z-index: 100;
  animation: ${translateY} 0.2s ease-in-out;
`;
export const MenuOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s ease-in;
  border-radius: 0.3rem;
  &:hover {
    background-color: var(--info-color-hover);
  }
`;

export const Menu = ({ showMenu = false, children, label }: MenuProps) => {
  return (
    showMenu && (
      <ShowMenu>
        {label && <h3>{label}</h3>}
        {children}
      </ShowMenu>
    )
  );
};
