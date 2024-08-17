import styled from "@emotion/styled";

const InvisibleInput = styled.input<{ $size?: "small" | "medium" | "large" }>`
  border: none;
  outline: none;
  background: transparent;
  padding: 1rem;
  margin: 0.3rem;
  color: white;
  border-bottom: 2px solid var(--accent-color);
  width: 100%;

  font-size: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "1rem";
      case "medium":
        return "1.5rem";
      case "large":
        return "2rem";
      default:
        return "1.5rem";
    }
  }};
  ::placeholder {
    color: var(--accent-color);
  }
  transition: all 0.3s ease-in-out;
  &:hover,
  &:focus {
    border: 1px solid var(--accent-color);
    box-shadow: 5px 10px 0px var(--accent-color);
  }
`;

export default InvisibleInput;
