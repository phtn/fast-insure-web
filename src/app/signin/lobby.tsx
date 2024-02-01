'use client'

import { opts, toggleState } from "@/utils/helpers"
import { ArrowUpRightIcon, BadgeCheckIcon, ChevronsRightIcon, LogInIcon, ShieldCheckIcon, SparkleIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useContext, useEffect, useState, type Dispatch, type FormEvent, type SetStateAction } from "react"
import tw from "tailwind-styled-components"
import { Button } from "../_components/button"
import { XGrid } from "../_components/grid"
import { AuthContext } from "../context"
import { Login } from "./login"

export const Lobby = () => {

  const router = useRouter()
  const userCreds = useContext(AuthContext)
  useEffect(() => {
    if (userCreds?.user) {
      router.push(`/account`)
    }
  }, [userCreds, router])

  return (
    <>
      <Welcome />
      <Main />
    </>
  )
}

const Main = () => {
  const [newAccount, setNewAccount] = useState(false)
  return (
    <MainWrap>
      <TopSection newAccount={newAccount} />
      <MidSection newAccount={newAccount} />
      <BottomSection newAccount={newAccount} setNewAccount={setNewAccount} />
    </MainWrap>
  )
}

const Welcome = () => (
  <div className="hidden sm:flex items-center justify-center pt-32 pb-4">
    <div className="relative left-[50px] overflow-clip md:rounded-2xl h-full w-full">

      <XGrid>
        <div className="bg-gradient-to-r from-transparent from-65% to-amber-500/20 justify-center items-center h-full w-full flex flex-col">
          <div className="bg-[url('/svg/caesar_gold_v1.svg')] opacity-70 bg-contain bg-no-repeat bg-center relative right-[75px] h-[260px] w-[260px]" /> <div className="h-[100px] relative right-[75px] flex items-start">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 tracking-tight to-blue-300 text-4xl font-sans font-medium">CyberSafe</span>
          </div>
          <div className="h-[200px] w-[300px] text-center max-w-[26ch] relative right-[75px]">
            <span className="text-blue-100/70 text-[14px] font-sans ">Your data is protected using our end-to-end encryption and unique keys. Our cybersecurity team are constantly monitoring all data tranmdissions with zero-knowledge proofs, ensuring we provide the highest quality of privacy protection.</span>
          </div>
          <div className="h-[5px] w-[69px] text-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-200 border-0 relative right-[75px]"></div>
        </div>
      </XGrid>

    </div>
  </div>
)



const TopSection = ({ newAccount }: { newAccount: boolean }) => (
  <div className="flex md:items-end items-center row-span-1 md:px-24 px-6 w-full justify-between">
    <div className="flex flex-col">
      <h1 className="md:text-5xl text-3xl font-sans font-bold text-blue-950 tracking-tighter">
        {newAccount ? `Create new account.` : `Sign in.`}
      </h1>
      <p className="py-2 px-[4px] font-medium text-transparent bg-clip-text bg-gradient-to-r from-zinc-700 to-zinc-500 md:text-[18px]">Track & Manage your coverage status.</p>
    </div>
    <div className="hidden md:flex items-end justify-center md:h-[210px] w-[300px]">
      <div className="bg-[url('/svg/dev_v1.svg')] bg-contain bg-no-repeat -mb-40 md:h-[210px] w-[300px]" />
    </div>
  </div>
)

type CardProps = {
  onClick: (e: FormEvent<HTMLButtonElement>) => void
  newAccount?: boolean
}

const SignCards = ({ onClick }: CardProps) => {
  return (
    <div className="md:overflow-x-scroll py-2 h-fit w-screen md:w-full">
      <div className="lg:px-24 md:px-12 px-6 md:gap-x-12 gap-x-4 grid grid-cols-2 w-[800px] md:w-full">
        <div className="flex items-center md:w-full w-[calc(100vw-55px)]">
          <AgentCard onClick={onClick} />
        </div>
        <div className="flex items-center w-full">
          <PersonalCard onClick={onClick} />
        </div>
      </div>
    </div>
  )
}



const ActiveSignUp = ({ onClick, newAccount }: CardProps) => {

  return (
    <div className="px-24 grid md:grid-cols-5 grid-cols-1">
      <div className="flex items-center w-full md:col-span-3 col-span-1">
        <div className="shadow-lg shadow-zinc-500 rotate-[3deg] rounded-[24px] hover:rotate-[0deg] hover:scale-110 hover:shadow-xl hover:cursor-pointer transition-all duration-700">
          <MemberCard>
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center justify-between h-[100px]">
                <p></p>
                <div className="h-[100px] w-[100px] bg-[url('/svg/caesar_v2.svg')] bg-contain bg-no-repeat" />
              </div>
              <div className="rounded-md h-[50px] flex w-[50px] items-center justify-center">
                <span className="font-thin text-blue-300 text-2xl tracking-widest">02</span>
              </div>
            </div>
          </MemberCard>
        </div>
      </div>
      <div className="flex items-center w-full md:col-span-2 col-span-1">
        <LoginWrap>
          <div className="flex justify-end skew-x-[10deg] group hover:skew-x-[-10] transition-all duration-500">
            <Button onClick={onClick} size='icon' variant='casper' className="">
              <SparkleIcon className="h-4 w-4 rotate-[30deg] hover:rotate-[-125deg] transition-all duration-500" strokeWidth={2} fill="orange" />
            </Button></div>
          <div className="bg-blue-200/20 p-2 rounded-[16px] backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-blue-950 font-sans font-medium tracking-tighter text-3xl">
                {newAccount ? `Sign up with email.` : `Email & Password`}
              </h2>
            </div>
            <div><span className="text-zinc-600 pl-1 text-[14px]">Type your email and create a password.</span></div>

          </div>
          <Login action={newAccount ? `Create account` : `Sign in`} />

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

const Hint = () => (
  <div className="md:py-12 py-2 group hover:cursor-pointer flex items-center justify-start md:px-24 px-6">
    <ChevronsRightIcon className="h-6 w-6 text-blue-300 group-hover:animate-pulse group-hover:translate-x-2 transition-all duration-500 delay-75 ease-in-out" />
    <ChevronsRightIcon className="h-6 w-6 text-blue-500 group-hover:animate-pulse group-hover:translate-x-2 transition-all duration-500 delay-100 ease-in-out" />
    <ChevronsRightIcon className="h-6 w-6 -ml-1 text-blue-800 group-hover:animate-pulse group-hover:translate-x-2 transition-all duration-500 delay-150 ease-in-out" />
    <p className="text-blue-950/90 mx-4 border-[0.33px] border-blue-300/20 px-12 font-bold py-3 group-hover:text-blue-900 shadow bg-gradient-to-r from-slate-400/40 to-orange-50/50 text-[15px] rounded-full transition-all duration-700">
      Select Account Type
    </p>
  </div>
)

const MidSection = ({ newAccount }: { newAccount: boolean }) => {
  const [active, setActive] = useState(false)
  const handleToggle = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleState(setActive)
  }
  const ViewOptions = useCallback(() => {
    const options = opts(<ActiveSignUp onClick={handleToggle} newAccount={newAccount} />, <SignCards onClick={handleToggle} />)
    return <>{options.get(active)}</>
  }, [active, newAccount])

  const HintOptions = useCallback(() => {
    const options = opts(<div className="py-[21px]" />, <Hint />)
    return <>{options.get(active)}</>
  }, [active])
  return (
    <MidWrap>
      <HintOptions />
      <ViewOptions />
    </MidWrap>
  )
}

const AgentCard = ({ onClick }: CardProps) => (
  <AgentWrap>
    <div className=" flex flex-col justify-center h-fit space-y-6">
      <div className="h-[80px] w-[80px] -mt-2 bg-[url('/svg/caesar_v2.svg')] bg-contain bg-no-repeat bg-center" />
      <div className="py-4">
        <h2 className="text-blue-50 md:text-3xl text-2xl font-sans font-bold tracking-tight">Affiliate Account</h2>
        <p className="text-blue-200/80 py-[4px]">Sign in as agent.</p>
      </div>
    </div>
    <div className="flex items-center justify-center">
      <button onClick={onClick} className="md:hover:scale-105 z-50 w-full md:py-4 py-3 shadow-2xl md:rounded-3xl rounded-xl bg-gradient-to-br from-blue-50 from-30% via-orange-100 via-50% to-cyan-200 to-100% bg-pos-0 hover:bg-pos-100 bg-size-200 transition-all duration-700 ease-in-out text-blue-950 text-lg font-bold border border-slate-800/50">
        <div className="shadow-2xl bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        <span className="relative z-20 md:text-xl text-lg">
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
        <p className="text-slate-700/80 py-[4px]">Sign in as Policy Holder.</p>
      </div>
    </div>
    <div className="flex items-center justify-center">
      <button onClick={onClick} className="hover:scale-105 px-8 z-50 w-full md:py-4 py-3 shadow-2xl md:rounded-3xl rounded-xl bg-gradient-to-br from-slate-950 from-30% via-indigo-300/40 via-70% to-orange-300/80 to-95% bg-pos-0 hover:text-sky-950 hover:bg-pos-100 bg-size-200 transition-all duration-700 ease-in-out text-blue-50 text-lg font-bold transition-all duration-500 border border-slate-800/50">
        <div className="shadow-2xl bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        <span className="relative z-20 md:text-xl text-lg">
          Select
        </span>
      </button>
    </div>
  </PersonalWrap>
)

type BottomSectionProps = {
  newAccount: boolean
  setNewAccount: Dispatch<SetStateAction<boolean>>
}
const BottomSection = ({ newAccount, setNewAccount }: BottomSectionProps) => (
  <div className="flex md:px-24 py-8 items-start justify-between">
    <div className="h-fit w-full flex items-end">
      <div className="px-8 h-[75px] w-full flex items-end justify-between">
        <div />
        <div className="flex items-center md:justify-evenly md:space-x-4 justify-center space-x-2">
          <p className="font-medium text-zinc-600 text-md">
            {newAccount ? `Already have an account?` : `Don't have and account yet?`}
          </p>
          <Button onClick={() => {
            toggleState(setNewAccount)
          }} className="flex px-4 items-center space-x-2" variant='ghost' size='sm'>
            <p>{newAccount ? `Sign in` : `Sign up`}</p>
            {newAccount ? <LogInIcon className="h-4 w-4" /> : <ArrowUpRightIcon className="h-4 w-4" />}
          </Button>
          <Button className="flex px-4 items-center space-x-3" variant='tertiary' size='sm'>
            <p>Affiliate</p>
            <BadgeCheckIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  </div>
)

const MainWrap = tw.div`
  w-full md:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] 
  from-sky-300 via-zinc-100 to-lime-200 grid grid-rows-3 col-span-2 
  md:rounded-2xl overflow-clip drop-shadow-3xl
  relative md:right-[75px] bg-orange-50 
`
const AgentWrap = tw.div`
  md:px-10 px-6 md:rounded-[38px] rounded-[24px] pt-6 md:pb-9 pb-6 h-fit w-full
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] 
  from-slate-700/90 via-slate-950/95 to-stone-50
  shadow-2xl group hover:scale-105 transition-all duration-500
`
const PersonalWrap = tw.div`
  md:px-10 px-6 md:rounded-[38px] rounded-[24px] md:py-8 py-6 h-fit w-full
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] 
  from-sky-300 via-cyan-400 to-indigo-500
  shadow-2xl group hover:scale-105 transition-all duration-500
`
const MemberCard = tw.div`
  group px-10 rounded-[24px] border-b-[3px] border-r-[2px] border-zinc-400/90 
  bg-[url('/svg/print_v2.svg')] pt-6 pb-9 h-[300px] bg-cover
  transition-all duration-700 w-[500px] bg-bottom object-fit
`
const LoginWrap = tw.div`
  group rounded-lg h-fit w-[350px]
`
const MidWrap = tw.div`
  flex flex-col row-span-2 h-[475px] md:h-fit justify-center 
`
