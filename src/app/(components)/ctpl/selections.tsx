import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@@ui/select";
import { type SetProps } from "./types";

interface SelectData {
  value: number;
  label: string;
}

const data: SelectData[] = [
  { value: 0, label: "Brand New (3 Year Coverage)" },
  { value: 1, label: "Renewal (1 Year Coverage)" },
];

export const Selections = ({ setCoverage }: SetProps) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-full">
      <form className="flex justify-start space-x-2">
        <div className="w-full md:w-[375px]">
          <Select
            defaultValue={data[selected]?.value.toString()}
            onValueChange={(value) => {
              setSelected(parseInt(value));
              setCoverage(parseInt(value));
            }}
          >
            <SelectTrigger className="h-[56px] rounded-lg border-0 bg-slate-900 px-6">
              <SelectValue className="text-[24px] text-blue-50">
                {data[selected]?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="z-50 rounded-xl border border-blue-400 bg-white">
              {data.map((item) => (
                <SelectItem
                  value={item.value.toString()}
                  key={item.value}
                  className="cursor-pointer rounded-lg from-blue-500 from-80% via-blue-400 to-orange-200 py-3 font-medium text-blue-950 hover:bg-gradient-to-tr hover:text-blue-50"
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  );
};
