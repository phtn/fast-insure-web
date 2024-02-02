'use client'

import { redirect } from "next/navigation"
import { useContext, useEffect } from "react"
import { AuthContext } from "../context"
import { Tabs, TabsList, TabsTrigger } from "../_components/tabs"
import { Travel } from "./travel"
import { Profile } from "./profile"
import { Autos } from "./autos"

export const AccountDashboard = () => {
  const userCreds = useContext(AuthContext)

  useEffect(() => {
    if (!userCreds?.user) {
      redirect(`/`)
    }

  }, [userCreds?.user])


  return (
    <div className="portrait:h-fit h-screen bg-neutral-50 px-24 py-12">
      <Tabs defaultValue="autos" className="h-full space-y-12">
        <Triggers />
        <Autos />
        <Travel />
        <Profile />
      </Tabs>
    </div>
  )
}

const Triggers = () => (
  <div className="space-between flex items-center">
    <TabsList>
      <TabsTrigger value="autos" className="relative">
        Autos
      </TabsTrigger>
      <TabsTrigger value="travel">Travel</TabsTrigger>
      <TabsTrigger value="profile">
        Profile
      </TabsTrigger>
    </TabsList>
  </div>
)
