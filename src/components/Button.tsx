import styled from "@emotion/styled";

const Button = styled.button`
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.2s ease;
  background-color: var(--info-color);
  color: var(--text-color);
  &:hover {
    background-color: var(--info-color-hover);
  }
`;

export default Button;
