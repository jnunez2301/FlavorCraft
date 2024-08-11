import styled from "@emotion/styled";

const Input = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  max-width: 20rem;
  .input-label{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export default Input;
