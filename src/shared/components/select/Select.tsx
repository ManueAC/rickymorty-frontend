import * as React from "react";

import {
  Select as SelectLib,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Box } from "../containers/Box";
import { capitalize } from "lodash";

export type SelectOption = {
  label: string;
  value: string;
};
interface SelectProps {
  label?: string;
  placeholder: string;
  options: SelectOption[];
  formatLabel?: boolean;
}
export const Select: React.FC<SelectProps> = ({
  placeholder,
  options,
  label,
  formatLabel = true,
}) => {
  const mapOptions = options.map((options, idx) => {
    const labelText = formatLabel ? capitalize(options.label) : options.label;
    return <SelectItem key={idx} value={options.value}>{labelText}</SelectItem>;
  });
  return (
    <SelectLib>
      <Box>
        {label && (
          <Label htmlFor={label} className="text-gray-500">
            {label}
          </Label>
        )}
        <SelectTrigger id={label} className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{mapOptions}</SelectGroup>
        </SelectContent>
      </Box>
    </SelectLib>
  );
};
