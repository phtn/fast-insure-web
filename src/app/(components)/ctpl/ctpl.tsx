"use client";

import { useState, createContext, useContext, useCallback } from "react";
import { Jumbotron } from "@@ui/jumbotron";
import { Selections } from "./selections";
import { type SetProps } from "./types";
import { brandnew, renewal } from "./data";
import { opts } from "@/utils/helpers";
import { Item } from "./item";
import tw from "tailwind-styled-components";

const QuoteContext = createContext(0);

export const CTPL = () => {
  const [state, setState] = useState(0);

  return (
    <QuoteContext.Provider value={state}>
      <Container>
        <PrimaryWrap>
          <Primary setCoverage={setState} />
        </PrimaryWrap>

        <SecondaryWrap>
          <Secondary />
        </SecondaryWrap>
      </Container>
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
    <ItemWrap>
      <ItemContent>
        <ItemOptions />
      </ItemContent>
    </ItemWrap>
  );
};

const BrandNew = () => (
  <PackageWrap>
    {brandnew.map((item) => (
      <Item key={item.id} {...item} />
    ))}
  </PackageWrap>
);

const Renewal = () => (
  <PackageWrap>
    {renewal.map((item) => (
      <Item key={item.id} {...item} />
    ))}
  </PackageWrap>
);

const Container = tw.div`
  grid md:py-14 h-full lg:grid-cols-2 z-50
  bg-gradient-to-b from-blue-950 via-blue-900 to-blue-400
`;
const PrimaryWrap = tw.div`
  bg-[url('/bg/flash_v5.svg')] flex items-center bg-cover
`;
const SecondaryWrap = tw.div`
  bg-[url('/bg/flash_v5.svg')] bg-left
`;
const PackageWrap = tw.div`
  grid h-full md:grid-cols-2 gap-x-4 gap-y-8 md:gap-8
`;

const ItemContent = tw.div`
  w-full pb-24 md:py-24
`;
const ItemWrap = tw.div`
  px-4 md:px-6 lg:px-14
`;
