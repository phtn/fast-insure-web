import { Separator } from "@radix-ui/react-select"
import { TabsContent } from "../../_components/tabs"
import { Button } from "../../_components/button"
import { checkoutSession } from "@/trpc/icash/checkout"
import { payload } from "../_autos/data"
import { onError } from "@/utils/toast"
import { Header } from "../header"

const Profile = () => {

  return (
    <TabsContent
      value="profile"
      className="h-full flex-col border-none p-0 data-[state=active]:flex"
    >
      <Header title='Account' description="View and Edit settings." />
      <Separator className="my-4" />
      <Content />
    </TabsContent>
  )
}



const Content = () => {
  const handleCheckout = () => {
    checkoutSession(payload).then((res) => console.log(res.data)).catch((err: Error) => onError(err.name, err.message))
  }
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">

        <Button className="" variant='outline' size='fat' onClick={handleCheckout}>Create Checkout</Button>
        <h3 className="mt-4 text-lg text-blue-950 font-semibold">Profile</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          No travel packages available.
        </p>

      </div>
    </div>
  )
}

export default Profile
