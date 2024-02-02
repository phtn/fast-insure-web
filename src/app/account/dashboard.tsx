'use client'

import { redirect } from "next/navigation"
import { useContext, useEffect } from "react"
import { AuthContext } from "../context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../_components/tabs"
import { Button } from "../_components/button"
import { PlusCircleIcon, PlusIcon } from "lucide-react"
import { accountItems, plugins } from "./data"
import { Separator } from "@radix-ui/react-select"
import { AccountItem } from "./item"
import { TravelPackages } from "./travel"
import { ScrollArea, ScrollBar } from "../_components/scroll-area"

export const AccountDashboard = () => {
  const userCreds = useContext(AuthContext)

  useEffect(() => {
    if (!userCreds?.user) {
      redirect(`/`)
    }

  }, [userCreds?.user])


  return (
    <div className="portrait:h-fit h-screen bg-orange-50 px-24 py-12">
      <Tabs defaultValue="autos" className="h-full space-y-12">
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
        <TabsContent
          value="autos"
          className="border-none p-0 outline-none"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                  All Autos
                </h2>
                <Button className="rounded-full h-6 w-6" size='icon'>
                  <PlusIcon className="h-4 w-4" />
                </Button>

              </div>
              <p className="text-sm text-muted-foreground">
                All registered vehicles.
              </p>
            </div>
          </div>
          <div className="relative">
            <ScrollArea className="w-full">
              <div className="flex space-x-6 pb-4">
                {accountItems.map((item) => (
                  <AccountItem
                    key={item.title}
                    accountItem={item}
                    className="w-[300px]"
                    width={250}
                    height={330}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <div className="mt-6 space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Add-ons
            </h2>
            <p className="text-sm text-muted-foreground">
              Add Coverage Add-ons to your vehicles.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="relative">
            <ScrollArea>
              <div className="flex space-x-6 pb-4">
                {plugins.map((item) => (
                  <AccountItem
                    key={item.title}
                    accountItem={item}
                    className="w-[250px]"
                    aspectRatio="square"
                    width={150}
                    height={150}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </TabsContent>
        <TabsContent
          value="travel"
          className="h-full flex-col border-none p-0 data-[state=active]:flex"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Trip to Jerusalem
              </h2>
              <p className="text-sm text-muted-foreground">
                Go wander and get lost on a wild adventure in Gaza.
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <TravelPackages />
        </TabsContent>
        <TabsContent
          value="profile"
          className="h-full flex-col border-none p-0 data-[state=active]:flex"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Account Settings
              </h2>
              <p className="text-sm text-muted-foreground">
                Edit profile.
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <TravelPackages />
        </TabsContent>
      </Tabs>
    </div>
  )
}
