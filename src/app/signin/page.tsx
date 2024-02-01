import tw from "tailwind-styled-components";
import { Lobby } from "./lobby";

export default async function SignIn() {
  return (
    <Container>
      <Content>
        <Lobby />
      </Content>
    </Container>
  )
}

const Container = tw.div`
  bg-gradient-to-br from-slate-900 from-30% via-slate-950 to-blue-950 
  md:h-[calc('100vh-100px')] h-fit lg:px-10 xl:px-24 lg:pt-16 xl:pt-24 pb-36
`
const Content = tw.div`
  grid md:grid-cols-3 grid-cols-1
`
