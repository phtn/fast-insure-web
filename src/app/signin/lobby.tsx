'use client'

import { ArrowUpRightIcon, BadgeCheckIcon, ChevronsRightIcon, ShieldCheckIcon, XIcon } from "lucide-react"
import tw from "tailwind-styled-components"
import { XGrid } from "../_components/grid"
import { Button } from "../_components/button"
import { useCallback, useState } from "react"
import { opts } from "@/utils/helpers"
import { Login } from "./login"
import { onInfo } from "@/utils/toast"

export const Lobby = () => {
  return (
    <>
      <Welcome />
      <Main />
    </>
  )
}

const Welcome = () => (
  <div className="flex items-center justify-center pt-32 pb-4">
    <div className="relative left-[50px] overflow-clip rounded-2xl h-full w-full">

      <XGrid>
        <div className="bg-gradient-to-r from-transparent from-65% to-orange-200/60 justify-center items-center h-full w-full flex flex-col">
          <div className="bg-[url('/svg/ninja_v2.svg')] bg-contain bg-no-repeat bg-center relative right-[75px] h-[325px] w-[325px]" />
          <div className="h-[100px] relative right-[75px] flex items-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-200 text-2xl font-sans font-bold">Welcome!</span>
          </div>
          <div className="h-[200px] w-[300px] text-center max-w-[30ch] relative right-[75px]">
            <span className="text-blue-200 text-[12px] font-sans ">Your data is protected using end-to-end encryption and unique keys. Our cybersecurity team are constantly monitoring all data transmissions with zero-knowledge proofs, ensuring we provide the highest quality of privacy protection.</span>
          </div>
          <div className="h-[2px] w-[100px] text-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-200 border-0 relative right-[75px]"></div>
        </div>

      </XGrid>
    </div>
  </div>

)

const Main = () => {


  return (
    <MainWrap>
      <TopSection />
      <MidSection />
      <BottomSection />
    </MainWrap>
  )
}

const TopSection = () => (
  <div className="flex row-span-1">
    <div className="flex items-end px-24 w-full justify-between">
      <div className="flex flex-col">
        <h1 className="text-5xl font-sans font-bold text-blue-950 tracking-tighter">Create new account.</h1>
        <p className="py-2 px-[4px] font-medium text-transparent bg-clip-text bg-gradient-to-r from-zinc-700 to-zinc-500 text-[18px]">Track & Manage your coverage status.</p>
      </div>
      <div className="flex items-end justify-center h-[200px] w-[200px]">
        <div className="bg-[url('/svg/caesar_dark_v1.svg')] bg-contain bg-center -mb-8 bg-no-repeat h-[200px] w-[200px]" />
      </div>
    </div>
  </div>
)

type CardProps = {
  onClick: () => void
}

const SignCards = ({ onClick }: CardProps) => {
  return (
    <div className="px-24 gap-x-12 grid grid-cols-2">
      <div className="flex items-center w-full">
        <AgentCard onClick={onClick} />
      </div>
      <div className="flex items-center w-full">
        <PersonalCard onClick={onClick} />
      </div>
    </div>
  )
}

const ActiveLogin = () => {
  return (
    <div className="px-24 grid grid-cols-5">
      <div className="flex items-center w-full col-span-3">
        <PortraitWrap>
        </PortraitWrap>
      </div>
      <div className="flex items-center w-full col-span-2">
        <LoginWrap>
          <div className="flex justify-end">
            <Button className="hover:bg-blue-500/10 text-zinc-500/30 hover:text-blue-500" size='icon' variant='ghost'>
              <XIcon className="" />
            </Button></div>
          <div className="flex items-center justify-between">
            <h2 className="text-slate-800/80 font-sans font-medium tracking-tighter text-3xl">Sign up with email.</h2>
          </div>
          <div><span className="text-zinc-600 pl-1 text-[14px]">Type your email and create a password.</span></div>
          <Login action='Create account' />

          <div className="flex items-end justify-center h-[56px]">
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-4 w-4 text-sky-600" />
              <p className="text-[14px] text-slate-600/80">Secure End-to-End Encryption Enabled.</p>
            </div>
          </div>
        </LoginWrap>
      </div>
    </div>
  )
}

const MidSection = () => {
  const [active, setActive] = useState(false)
  const handleSelect = () => {
    setActive(true)
  }
  const ViewOptions = useCallback(() => {
    const options = opts(<ActiveLogin />, <SignCards onClick={handleSelect} />)
    return <>{options.get(active)}</>

  }, [active])
  return (
    <div className="flex flex-col row-span-2">
      <div className="py-12 border-t group hover:cursor-pointer flex items-center justify-start px-24">
        <ChevronsRightIcon className="h-6 w-6 text-blue-300 group-hover:animate-pulse group-hover:translate-x-2 transition-all duration-500 delay-75 ease-in-out" />
        <ChevronsRightIcon className="h-6 w-6 text-blue-500 group-hover:animate-pulse group-hover:translate-x-2 transition-all duration-500 delay-100 ease-in-out" />
        <ChevronsRightIcon className="h-6 w-6 -ml-1 text-blue-800 group-hover:animate-pulse group-hover:translate-x-2 transition-all duration-500 delay-150 ease-in-out" />
        <p className="text-blue-950/90 mx-4 border-[0.33px] border-blue-300/20 px-12 font-bold py-3 group-hover:text-blue-900 transition-all duration-500 shadow bg-gradient-to-r from-slate-400/40 to-orange-50/50 text-[15px] rounded-full transition-all duration-700">
          Select Account Type
        </p>
      </div>
      <ViewOptions />
    </div>
  )
}

const AgentCard = ({ onClick }: CardProps) => (
  <AgentWrap>
    <div className=" flex flex-col justify-center h-fit space-y-6">
      <div className="h-[80px] w-[80px] -mt-2 bg-[url('/svg/caesar_v2.svg')] bg-contain bg-no-repeat bg-center" />
      <div className="py-4">
        <h2 className="text-blue-50 text-3xl font-sans font-bold tracking-tight">Agent Account</h2>
        <p className="text-blue-200/80 py-[4px]">Sign in as agent.</p>
      </div>
    </div>
    <div className="flex items-center justify-center">
      <button onClick={onClick} className="hover:scale-105 px-8 z-50 w-full py-4 shadow-2xl rounded-3xl bg-gradient-to-br from-blue-50 from-30% via-orange-100 via-50% to-cyan-200 to-100% bg-pos-0 hover:bg-pos-100 bg-size-200 transition-all duration-700 ease-in-out text-blue-950 text-lg font-bold border border-slate-800/50">
        <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        <span className="relative z-20 text-xl">
          Select
        </span>
      </button>
    </div>
  </AgentWrap>
)

const PersonalCard = ({ onClick }: CardProps) => (
  <PersonalWrap>
    <div className=" flex flex-col justify-end h-fit space-y-6">
      <div className="h-[56px] w-[56px] bg-[url('/svg/ninja_v1.svg')] bg-contain bg-no-repeat bg-center" />
      <div className="py-5 -mb-2">
        <h2 className="text-slate-800 text-3xl font-bold tracking-tight">Personal Account</h2>
        <p className="text-slate-700/80 py-[4px]">Sign in to your personal account.</p>
      </div>
    </div>
    <div className="flex items-center justify-center">
      <button onClick={onClick} className="hover:scale-105 px-8 z-50 w-full py-4 shadow-2xl rounded-3xl bg-gradient-to-br from-slate-950 from-30% via-indigo-300/40 via-70% to-orange-300/80 to-95% bg-pos-0 hover:text-sky-950 hover:bg-pos-100 bg-size-200 transition-all duration-700 ease-in-out text-blue-50 text-lg font-bold transition-all duration-500 border border-slate-800/50">
        <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
        <span className="relative z-20 text-xl">
          Select
        </span>
      </button>
    </div>
  </PersonalWrap>
)




const BottomSection = () => (
  <div className="flex px-24 py-8 items-start justify-between">
    <div className="h-[200px] w-full flex items-end">
      <div className="px-8 border-t border-zinc-400/40 h-[75px] w-full flex items-end justify-between">
        <div />
        <div className="flex items-center justify-evenly space-x-4">
          <p className="font-medium text-zinc-600 text-sm">Already have an account?</p>
          <Button onClick={() => {
            onInfo('Working on it.')
          }} className="flex px-4 items-center space-x-2" variant='ghost' size='sm'><p>Sign in</p><ArrowUpRightIcon className="h-4 w-4" /></Button>
          <Button className="flex px-4 items-center space-x-3" variant='tertiary' size='sm'><p>Affiliate</p> <BadgeCheckIcon className="h-5 w-5" /></Button>
        </div>
      </div>
    </div>
  </div>
)

const MainWrap = tw.div`
  w-full bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] 
  from-sky-300 via-zinc-100 to-lime-200 grid grid-rows-3 col-span-2 
  rounded-2xl overflow-clip drop-shadow-3xl
  relative right-[75px] 
`
const AgentWrap = tw.div`
  px-10 rounded-[38px] pt-6 pb-9 h-fit w-full
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] 
  from-slate-700/90 via-slate-950/95 to-stone-50
  shadow-2xl group hover:scale-105 transition-all duration-500
`
const PersonalWrap = tw.div`
  px-10 rounded-[38px] py-8 h-fit w-full
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] 
  from-sky-300 via-cyan-400 to-indigo-500
  shadow-2xl group hover:scale-105 transition-all duration-500
`
const PortraitWrap = tw.div`
  group shrink-0 px-10 rounded-[32px] pt-6 pb-9 h-[400px] top-[calc(100vh/3.25)] 
  bg-[url('/svg/print_v2.svg')] transition-all duration-700 absolute w-[500px]
  shadow-2xl hover:bg-center hover:bg-left
`
const LoginWrap = tw.div`
  group rounded-lg py-8 h-[400px] w-[350px] top-[calc(100vh/4)] absolute 
`

