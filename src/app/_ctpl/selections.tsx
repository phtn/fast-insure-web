import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@@components/select";
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
        <div className="w-full md:w-[350px]">
          <Select
            defaultValue={data[selected]?.value.toString()}
            onValueChange={(value) => {
              setSelected(parseInt(value));
              setCoverage(parseInt(value));
            }}
          >
            <SelectTrigger className="bg-blue-950">
              <SelectValue className="text-blue-50">
                {data[selected]?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="z-50 bg-blue-50">
              {data.map((item) => (
                <SelectItem value={item.value.toString()} key={item.value}>
                  <span className="text-blue-950">{item.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  );
};
