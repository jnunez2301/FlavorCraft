import styled from "@emotion/styled";

const InvisibleTextArea = styled.textarea`
  border: none;
  outline: none;
  background: transparent;
  padding: 1rem;
  color: var(--theme-white);
  width: 100%;
  margin: .3rem;
  font-size: 1.5rem;
  font-family: "Noto Sans", sans-serif;
  resize: none;
  border-bottom: 2px solid var(--accent-color);
  ::placeholder{
    color: var(--accent-color);
  }
  transition: all 0.3s ease-in-out;
  &:hover, &:focus{
    border: 1px solid var(--accent-color);
    box-shadow: 5px 10px 0px var(--accent-color);
  }
`

export default InvisibleTextArea;