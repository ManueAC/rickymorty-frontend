import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Control,
  FieldValues,
  Path,
  useController,
  UseFormReturn,
} from "react-hook-form";
import { SelectOption } from "../select/Select";
import MultipleSelector, { Option } from "./MultiSelect";
import { useState } from "react";

interface BaseFormProps<T extends FieldValues> {
  label: string;
  control: Control<T>;
  placeholder?: string;
  entity?: string;
  name: Path<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<T, any, undefined>;
  type?: string;
}
export function FormInputBase<T extends FieldValues>({
  label,
  entity,
  control,
  placeholder,
  name,
  type,
}: BaseFormProps<T>) {
  const ph =
    entity && name ? `${entity} ${name}` : placeholder ? placeholder : "";
  return (
    <div className="mb-5">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mb-0 inline-block text-gray-500">
              {label}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="mt-0 inline-block "
                placeholder={ph}
                type={type}
                style={{
                  marginTop: "2px",
                }}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
}

interface FormSelectBase<T extends FieldValues> extends BaseFormProps<T> {
  options: SelectOption[];
  showComp?: boolean;
  isMultiSelect?: boolean;
  valueAsPh?: boolean;
  disabled?: boolean;
}
export function FormSelectBase<T extends FieldValues>({
  label,
  entity,
  control,
  placeholder,
  name,
  showComp = true,
  isMultiSelect = false,
  disabled = false,
  valueAsPh,
  options,
}: FormSelectBase<T>) {
  const [multiSelection, setMultiSelection] = useState<Option[]>([]);

  const set = useController({
    name,
    control,
  });

  const ph =
    name && entity ? `Select a ${name}` : placeholder ? placeholder : "";

  return (
    <div className="mb-5">
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel className="mb-0 inline-block text-gray-500">
                {label}
              </FormLabel>
              <FormControl>
                {!isMultiSelect ? (
                  <Select
                    onValueChange={field?.onChange}
                    defaultValue={field?.value}
                    disabled={disabled}
                  >
                    <FormControl>
                      <SelectTrigger>
                        {showComp && (
                          <SelectValue
                            defaultValue={field?.value}
                            placeholder={valueAsPh ? field?.value : ph}
                          />
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map(({ label, value }, idx) => (
                        <SelectItem key={idx} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <MultipleSelector
                    defaultOptions={options}
                    value={multiSelection}
                    disabled={disabled}
                    onChange={(e) => {
                      setMultiSelection(e);
                      set.field.onChange(e.map((v) => v.value));
                    }}
                    placeholder="Select frameworks you like..."
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
