import styled from "@emotion/styled";

const Badge = styled.div`
  background-color: var(--info-color);
  border-radius: 4px;
  color: var(--theme-white);
  display: inline-block;
  font-size: 12px;
  font-weight: 800;
  padding: .5rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s, border 0.3s;
  &:hover {
    background-color: var(--success-color);
    color: var(--info-color)
  }
`;

export default Badge;