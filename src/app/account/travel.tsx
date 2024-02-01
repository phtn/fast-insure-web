import { Button } from "@@components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@@components/dialog"
import { Input } from "@@components/input"
import { Label } from "@@components/label"
import { PlaneTakeoff } from "lucide-react"

export function TravelPackages() {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <PlaneTakeoff className="text-blue-600 h-12 w-12" />

        <h3 className="mt-4 text-lg text-blue-950 font-semibold">Travel Deals</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          No travel packages available.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="relative">
              Request Destination
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-100 border-blue-950">
            <DialogHeader>
              <DialogTitle className="text-blue-100 text-blue-950">Escape Reality</DialogTitle>
              <DialogDescription className="text-blue-800/90">
                Type the country or city you want to visit.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="url"></Label>
                <Input id="url" placeholder="Versailles" />
              </div>
            </div>
            <DialogFooter>
              <Button>Send Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
