import styled from "@emotion/styled"
import { Outlet } from "@tanstack/react-router"

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const Authenticate = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}