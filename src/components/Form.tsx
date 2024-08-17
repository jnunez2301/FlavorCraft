import styled from "@emotion/styled";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  max-width: 20rem;
  .input-label{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-weight: bold;
  }
`;
export default Form;