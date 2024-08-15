import styled from "@emotion/styled";
import { ThemeType } from "../context/ThemeContext";

const Theme = styled.div<{ $themeMode: ThemeType }>`
  --bg-color: ${({ $themeMode }) =>
    $themeMode === ThemeType.Dark
      ? "var(--color-primary)"
      : "var(--color-quaternary)"};
  --accent-color: ${({ $themeMode }) =>
    $themeMode === ThemeType.Dark
      ? "var(--color-tertiary)"
      : "var(--color-secondary)"};
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
  /* Dot background */
  --dot-color: ${({ $themeMode }) =>
    $themeMode === ThemeType.Dark ? "lightgray" : "gray"};
  --dot-size: 1px; /* Adjust the size of the dots */
  --dot-spacing: 70px; /* Adjust the spacing between dots */

  background-color: var(--bg-color);
  background-image: radial-gradient(
    var(--dot-color) var(--dot-size),
    transparent var(--dot-size)
  );
  background-size: var(--dot-spacing) var(--dot-spacing);

  color: var(--text-color);
  height: 100%;
  
  a {
    color: var(--info-color);
    transition: color 0.2s ease-in;
    &:hover {
      color: var(--info-color-hover);
    }
  }
`;

export default Theme;
