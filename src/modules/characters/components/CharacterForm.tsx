"use client";
import { Form } from "@/components/ui/form";

import { useCharacterForm } from "@/modules/characters/characters-hooks";
import { CharacterSchemaType } from "@/modules/characters/characters-types";
import {
  FormInputBase,
  FormSelectBase,
} from "../../../shared/components/input/FormInputBase";
import { Button } from "@/components/ui/button";
import { genderOptions, speciesOptions, statusOptions } from "@/constants";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { capitalize, random } from "lodash";
import { FC, useEffect, useState } from "react";
import { useGetStorageItem } from "@/shared/hooks/storage-utils";
import { useDialog } from "@/store/store";
import { Box } from "@/shared/components/containers/Box";
import { DialogClose } from "@/components/ui/dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CharacterFormProps {
  characterId?: number;
}

export const CharacterForm: FC<CharacterFormProps> = ({
  characterId,
}): JSX.Element => {
  const path = usePathname();
  const dialog = useDialog();
  const isUpdate = !!characterId;
  const [showComp, setShowComp] = useState<boolean>(false);

  const { toast } = useToast();
  const { setData, updateData } = useLocalStorage("characters");

  const charData = useGetStorageItem(characterId);

  const form = useCharacterForm();

  useEffect(() => {
    const clear = setTimeout(() => {
      form.reset({
        name: charData?.[0]?.name,
        image: charData?.[0]?.image,
        species: charData?.[0]?.species,
        status: charData?.[0]?.status,
        gender: charData?.[0]?.gender,
      });

      setShowComp(true);
    }, 500);
    return () => clearTimeout(clear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values: CharacterSchemaType) => {
    if (isUpdate) {
      updateData("characters", characterId, {
        id: characterId,
        ...values,
      });
    } else {
      setData("characters", {
        ...values,
        species: capitalize(values.species),
        status: capitalize(values.status),
        gender: capitalize(values.gender),
        id: random(5000),
      });
    }

    if (isUpdate) {
      toast({
        title: "Update character",
        description: "Success",
      });
    } else {
      toast({
        title: "Create character",
        description: "Success",
      });
    }

    dialog.handleCreateCharacterDialog();
  };

  const buttonText = isUpdate ? "Update" : "Create";
  const control = form.control;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInputBase
          control={control}
          entity="Character"
          label={"Name"}
          name={"name"}
          form={form}
        />
        <FormInputBase
          control={control}
          entity="Character"
          label={"Image"}
          name={"image"}
          form={form}
        />
        <FormSelectBase
          showComp={showComp}
          entity="Gender"
          control={control}
          label={"Gender"}
          name={"gender"}
          form={form}
          valueAsPh={isUpdate}
          options={genderOptions}
        />
        <FormSelectBase
          showComp={showComp}
          entity="Status"
          control={control}
          label={"Status"}
          name={"status"}
          form={form}
          valueAsPh={isUpdate}
          options={statusOptions}
        />
        <FormSelectBase
          showComp={showComp}
          entity="Specie"
          control={control}
          label={"Species"}
          name={"species"}
          form={form}
          valueAsPh={isUpdate}
          options={speciesOptions}
        />
        <Box className="flex justify-center gap-4 w-full">
          <Button className="bg-lime-700" type="submit">
            {buttonText}
          </Button>
          <DialogClose>
            {/* Cancel */}
            <Button>
              <Link
                href={{
                  pathname: path,
                  query: null,
                }}
                onClick={() => {
                  dialog.handleCreateCharacterDialog();
                }}
              >
                Cancel
              </Link>
            </Button>
          </DialogClose>
        </Box>
      </form>
    </Form>
  );
};
