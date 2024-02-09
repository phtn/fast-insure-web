"use client";

import { Button } from "../../_components/button";
import { checkoutSession } from "@/trpc/icash/checkout";
import { payload } from "../_autos/data";
import { onError } from "@/utils/toast";

export const Content = () => {
  const handleCheckout = () => {
    checkoutSession(payload)
      .then((res) => console.log(res.data))
      .catch((err: Error) => onError(err.name, err.message));
  };
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <Button
          className=""
          variant="outline"
          size="fat"
          onClick={handleCheckout}
        >
          Create Checkout
        </Button>
        <h3 className="mt-4 text-lg font-semibold text-blue-950">Profile</h3>
        <p className="text-muted-foreground mb-4 mt-2 text-sm">
          No travel packages available.
        </p>
      </div>
    </div>
  );
};
