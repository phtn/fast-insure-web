'use client'

import { accountItems } from "./data"
import { AccountItem } from "./item"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context"
import { redirect } from "next/navigation"
import { TabsContent } from "@@components/tabs"
import { AddAuto } from "./add-auto"
import { ScrollArea, ScrollBar } from "@@components/scroll-area"


export const Autos = () => {
  const userCreds = useContext(AuthContext)

  useEffect(() => {
    if (!userCreds?.user) {
      redirect(`/`)
    }

  }, [userCreds?.user])

  return (
    <TabsContent
      value="autos"
      className="border-none p-0 outline-none"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl text-fast font-semibold tracking-tight">
              All My Autos
            </h2>

            <AddAuto />

          </div>
          <p className="text-sm text-clay">
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
    </TabsContent>
  )
}
