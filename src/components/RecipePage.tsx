import { motion } from "framer-motion";
import styled from "@emotion/styled";

export const RecipePage = styled(motion.div)<{
  $backgroundImg?: string;
  $pageNumber: number;
  $customColor?: string;
}>`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  height: 95dvh;
  width: 50%;
  position: absolute;
  left: ${(props) => (props.$pageNumber % 2 === 0 ? "50%" : "0")};
  background: ${({ $pageNumber, $backgroundImg, $customColor }) =>
    $pageNumber % 2 !== 0
      ? `linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(255, 255, 255, 0.1) 100%
    ), url(${$backgroundImg})`
      : `${$customColor}`};
  background-size: cover;
  background-position: center;
  border-top-right-radius: ${(props) =>
    props.$pageNumber % 2 === 0 ? ".3rem" : "0"};
  border-bottom-right-radius: ${(props) =>
    props.$pageNumber % 2 === 0 ? ".3rem" : "0"};
  border-bottom-left-radius: ${(props) =>
    props.$pageNumber % 2 !== 0 ? ".3rem" : "0"};
  border-top-left-radius: ${(props) =>
    props.$pageNumber % 2 !== 0 ? ".3rem" : "0"};
  .text {
    color: black;
    font-weight: bold;
  }

  @media (max-width: 1024px) {
    width: 100%;
    gap: 1rem;
    border-radius: 0.3rem;
  }
`;