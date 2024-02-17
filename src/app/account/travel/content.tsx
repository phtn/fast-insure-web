"use client";

import { Button } from "@@components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@@components/dialog";
import { Input } from "@@components/input";
import { Label } from "@@components/label";
import { PlaneTakeoff } from "lucide-react";

export const Content = () => {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <PlaneTakeoff className="h-12 w-12 text-blue-600" />

        <h3 className="mt-4 text-lg font-semibold text-blue-950">
          Travel Deals
        </h3>
        <p className="text-muted-foreground mb-4 mt-2 text-sm">
          No travel packages available.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="relative">
              Request Destination
            </Button>
          </DialogTrigger>
          <DialogContent className="border-blue-950 bg-slate-100">
            <DialogHeader>
              <DialogTitle className="text-blue-950">
                Escape Reality
              </DialogTitle>
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
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
