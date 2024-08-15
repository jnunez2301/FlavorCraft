import styled from "@emotion/styled";

const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  margin: 0.2rem 0;
  width: 100%;
  outline: none;
  border: 1px solid var(--info-color);
  transition: border 0.2s ease-in;
  &:focus {
    border: 2px solid var(--info-color-hover);
  }
`;

export default Input;
