import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import FancyButton from "./FancyButton";

type BackProps = {
  pathToGoBack?: string;
};

const Back = ({ pathToGoBack }: BackProps) => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const handleGoBack = () => {
    navigate({
      from: currentPath,
      to: pathToGoBack ? pathToGoBack : "..",
    });
  };
  return (
    <FancyButton id="back-button" $rounded onClick={handleGoBack}>
      <IconArrowLeft size={24} />
    </FancyButton>
  );
};

export default Back;
