import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import FancyButton from "./FancyButton";



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
    <FancyButton id="back-button" $rounded onClick={handleGoBack}>
      <IconArrowLeft size={24} />
    </FancyButton>
  );
};

export default Back;
