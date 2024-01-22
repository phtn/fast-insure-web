"use client";

import { useState, createContext, useContext, useCallback } from "react";
import { Jumbotron } from "@@components/jumbotron";
import { Selections } from "./selections";
import { type SetProps } from "./types";
import { brandnew, renewal } from "./data";
import { opts } from "@/utils/helpers";
import { Item } from "./item";

const QuoteContext = createContext(0);

export const CTPL = () => {
  const [state, setState] = useState(0);

  return (
    <QuoteContext.Provider value={state}>
      <div className="grid pt-[64px] md:grid-cols-2">
        <Primary setCoverage={setState} />
        <Secondary />
      </div>
    </QuoteContext.Provider>
  );
};

const Primary = ({ setCoverage }: SetProps) => (
  <Jumbotron
    title="Get CTPL Quote"
    description="Compulsory Third-Party Liability"
    info="CTPL protects you from any possible liability for a third party caused bodily injury and/or death in an accident arising from the use of your motor vehicle."
  >
    <Selections setCoverage={setCoverage} />
  </Jumbotron>
);

const Secondary = () => {
  const selection = useContext(QuoteContext);
  const ItemOptions = useCallback(() => {
    const options = opts(<Renewal />, <BrandNew />);
    return <>{options.get(selection === 1)}</>;
  }, [selection]);
  return (
    <div className="w-full bg-orange-50 pb-24 md:py-24">
      <div className="px-4 md:px-24">
        <ItemOptions />
      </div>
    </div>
  );
};

const BrandNew = () => (
  <div className="grid h-full gap-x-3 gap-y-8 md:grid-cols-2 md:gap-8">
    {brandnew.map((item) => (
      <Item key={item.id} {...item} />
    ))}
  </div>
);

const Renewal = () => (
  <div className="grid h-full grid-cols-2 gap-x-4 gap-y-8 md:gap-8">
    {renewal.map((item) => (
      <Item key={item.id} {...item} />
    ))}
  </div>
);
