import { Separator } from "@radix-ui/react-select"
import { TabsContent } from "../_components/tabs"

export const Profile = () => {
  return (
    <TabsContent
      value="profile"
      className="h-full flex-col border-none p-0 data-[state=active]:flex"
    >
      <Header />
      <Separator className="my-4" />
      <Content />
    </TabsContent>
  )
}

const Header = () => (
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
)

const Content = () => {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">

        <h3 className="mt-4 text-lg text-blue-950 font-semibold">Profile</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          No travel packages available.
        </p>

      </div>
    </div>
  )
}
