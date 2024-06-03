import { prettyDate } from "@/utils/helpers";

export const DateTimeCell = ({ date }: { date: string | undefined }) => {
  const timestamp = prettyDate(date);
  const datetime = timestamp.split(" at ");
  return (
    <div className="flex flex-col items-center justify-center px-1">
      <div className="flex flex-col items-end -space-y-0.5">
        <p className="font-sans text-xs font-medium">{datetime[0]}</p>
        <p className="text-[10px] tracking-wide">{datetime[1]}</p>
      </div>
    </div>
  );
};
