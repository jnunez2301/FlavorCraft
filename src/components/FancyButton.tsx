import styled from "@emotion/styled";

const FancyButton = styled.div<{$rounded?: boolean}>`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.7rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid var(--info-color);
  border-radius: ${({ $rounded }) => $rounded ? ".2rem" : "0"};
  &:hover {
    color: var(--accent-color);
    box-shadow: 3px 5px 0px var(--accent-color);
  }
  width: fit-content;
`;

export default FancyButton;