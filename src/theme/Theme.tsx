/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ThemeType } from "../context/ThemeContext";

const Theme = styled.div<{ $themeMode: ThemeType }>`
  --bg-color: ${({ $themeMode }) =>
    $themeMode === ThemeType.Dark
      ? "var(--color-primary)"
      : "var(--color-quaternary)"};
  --text-color: ${({ $themeMode }) =>
    $themeMode === ThemeType.Dark
      ? "var(--color-quaternary)"
      : "var(--color-primary)"};
  --info-color: ${({ $themeMode }) =>
    $themeMode === ThemeType.Dark
      ? "var(--color-secondary)"
      : "var(--color-tertiary)"};
  --info-color-hover: ${({ $themeMode }) =>
    $themeMode === ThemeType.Dark
      ? "var(--color-tertiary)"
      : "var(--color-secondary)"};
  --success-color: ${({ $themeMode }) =>
    $themeMode === ThemeType.Dark
      ? "var(--color-quaternary)"
      : "var(--color-primary)"};

  background-color: var(--bg-color);
  color: var(--text-color);
  height: 100%;
  button {
    background-color: var(--info-color);
    color: var(--text-color);
    &:hover {
      background-color: var(--info-color-hover);
    }
  }
  input {
    border: 1px solid var(--info-color);
    transition: border 0.2s ease-in;
    &:focus {
      border: 2px solid var(--info-color-hover);
    }
  }
  a {
    color: var(--info-color);
    transition: color 0.2s ease-in;
    &:hover {
      color: var(--info-color-hover);
    }
  }
`;

export default Theme;