import tw from "tailwind-styled-components";

export type MeterProps = {
  label: string;
  unit?: string;
  value: string | number;
};
export const Meter = ({ label, unit, value }: MeterProps) => {
  return (
    <Case>
      <Content>
        <p className="leading-1 font-mono text-[14px] text-ash">
          {value}
          <span className="ml-[2px] text-[10px] text-ash/80">{unit}</span>
        </p>
        <span className="text-[8px] uppercase tracking-wide text-ash/60">
          {label}
        </span>
      </Content>
    </Case>
  );
};

const Case = tw.div`
  flex items-center justify-center rounded-[7.17px] p-[1.5px]
  bg-coal shadow-i-br-md-m
`;
const Content = tw.div`
  flex h-[51.5px] w-[56px] flex-col items-center justify-center 
  rounded-md border-[0.33px] border-clay bg-void
`;
