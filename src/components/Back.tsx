import styled from "@emotion/styled";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

const BackButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: var(--text-color);
  border: 1px solid var(--info-color);
  padding: 0.5rem 1rem;
  max-width: 4rem;
  margin: 0.3rem;
  border-radius: 0.3rem 0 0 0.3rem;
  cursor: pointer;
  transition: color 0.2s ease-in;
  transition: all 0.3s ease-in;
  &:hover {
    color: var(--info-hover-color);
    box-shadow: 3px 5px 0px var(--accent-color);
  }
`;

const Back = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const handleGoBack = () => {
    navigate({
      from: currentPath,
      to: "..",
    });
  };
  return (
    <BackButton onClick={handleGoBack}>
      <IconArrowLeft size={24} />
    </BackButton>
  );
};

export default Back;
