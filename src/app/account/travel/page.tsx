import { TabsContent } from "@@components/tabs"
import { Content } from "./content"

const Travel = async () => {
  return (
    <TabsContent
      value="travel"
      className="h-full flex-col border-none p-0 data-[state=active]:flex"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Trip to Proxima Centauri
          </h2>
          <p className="text-sm text-muted-foreground">
            Wander beyond what your dreams can see.
          </p>
        </div>
      </div>
      <Content />
    </TabsContent>
  )
}


export default Travel
