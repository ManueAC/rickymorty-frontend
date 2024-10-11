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
import { CharacterSchemaType } from "@/modules/characters/characters-types";
import { Control, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { SelectOption } from "../select/Select";
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
  valueAsPh?: boolean;
}
export function FormSelectBase<T extends FieldValues>({
  label,
  entity,
  control,
  placeholder,
  name,
  showComp = true /* = true, */,
  valueAsPh,
  options,
}: FormSelectBase<T>) {
  const [val, setVal] = useState<string>();

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
                <Select
                  onValueChange={field?.onChange}
                  defaultValue={field?.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      {showComp && (
                        <SelectValue
                          defaultValue={field?.value}
                          //   aria-label={field?.value}
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
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
