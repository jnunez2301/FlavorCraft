import styled from "@emotion/styled";

const Badge = styled.div<{$isActive?: boolean}>`
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 12px;
  font-weight: 800;
  padding: .5rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s, border 0.3s;
  background-color: ${({$isActive}) => $isActive ? "var(--success-color)" : "var(--info-color)"};
  color: ${({$isActive}) => $isActive ? "var(--info-color)" : "var(--theme-white)"};
  &:hover {
    background-color: var(--success-color);
    color: var(--info-color)
  }
`;

export default Badge;