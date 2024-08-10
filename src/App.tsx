import { css } from "@emotion/css"

const App = () => {
  return (
    <div className={css`
      padding: 1rem;
      font-size: 2rem;
      &:hover {
        color: blue;
      }
    `}>App</div>
  )
}

export default App