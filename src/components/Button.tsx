import styled from "@emotion/styled";

/**
 * Button component
 * @param $variant - The variant of the button
 * @example <Button $variant="danger">Delete</Button>
 */
const Button = styled.button<{$variant?: "danger" | "default"}>`
  color: #fff;
  background-color: blue;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.2s ease;
  background-color: ${({ $variant }) => $variant === "danger" ? "var(--color-danger)" : "var(--info-color)"};
  color: var(--text-color);
  &:hover {
    background-color: var(--info-color-hover);
  }
`;

export default Button;
