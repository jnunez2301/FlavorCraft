import styled from "@emotion/styled"
import { Outlet } from "@tanstack/react-router"

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`

export const Authenticate = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}