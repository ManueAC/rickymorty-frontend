"use client";
import { Button } from "@/components/ui/button";
import { genderOptions, speciesOptions, statusOptions } from "@/constants";
import { cn } from "@/lib/utils";
import { Box } from "@/shared/components/containers/Box";
import {
  FormInputBase,
  FormSelectBase,
} from "@/shared/components/input/FormInputBase";
import { useCharacterFilterForm } from "../characters-hooks";
import { CharacterFilterSchemaType } from "../characters-types";
import { Form } from "@/components/ui/form";
import { API_ENTITY_ENUM, fetchAPI } from "@/shared/hooks/api";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";

export const CharacterFilters = (): JSX.Element | null => {
  const { toast } = useToast();
  const { setDataAll, refresh } = useLocalStorage("characters");
  const form = useCharacterFilterForm();
  const control = form.control;

  const onSubmit = async (values: CharacterFilterSchemaType) => {
    const data = await fetchAPI(API_ENTITY_ENUM.character, values);
    setDataAll("characters", data);
    refresh();
    toast({
      title: "Filtered",
      description: "Completed",
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box className={cn("flex gap-4 mt-3 border-b  items-end")}>
          <FormInputBase
            control={control}
            entity="Character"
            label={"Name"}
            name={"name"}
            form={form}
          />
          <FormSelectBase
            showComp
            entity="Status"
            control={control}
            label={"Status"}
            name={"status"}
            form={form}
            options={statusOptions}
          />
          <FormSelectBase
            entity="Gender"
            control={control}
            label={"Gender"}
            name={"gender"}
            form={form}
            options={genderOptions}
          />
          <FormSelectBase
            entity="Species"
            control={control}
            label={"Species"}
            name={"species"}
            form={form}
            options={speciesOptions}
          />
          <Button type="submit" className="ml-4 mb-6">
            Apply
          </Button>
          <Button
            className="mb-6"
            onClick={() => {
              form.reset();
            }}
          >
            Clear
          </Button>
        </Box>
      </form>
    </Form>
  );
};
