"use client";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { capitalize, random } from "lodash";

import { Form } from "@/components/ui/form";
import {
  FormInputBase,
  FormSelectBase,
} from "../../../shared/components/input/FormInputBase";
import { Button } from "@/components/ui/button";
import { statusOptions } from "@/constants";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { useGetStorageItem } from "@/shared/hooks/storage-utils";
import { EpisodeType, useDialog } from "@/store/store";
import { Box } from "@/shared/components/containers/Box";
import { DialogClose } from "@/components/ui/dialog";
import {
  objectToQueryParams,
  useGetQueryParams,
} from "@/shared/hooks/use-get-query-params";
import { API_ENTITY_ENUM } from "@/shared/hooks/api";
import { useEpisodeForm } from "../episodes-hooks";
import { EpisodeSchemaType } from "../episodes-types";
import { DateTime } from "luxon";

interface EpisodeFormProps {
  episodeId?: number;
}

export const EpisodeForm: FC<EpisodeFormProps> = ({
  episodeId,
}): JSX.Element => {
  const path = usePathname();
  const router = useRouter();
  const dialog = useDialog();
  const query = useGetQueryParams();
  const qry = { ...query };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: NewId, ...rest } = qry;

  const isUpdate = !!episodeId;
  const [showComp, setShowComp] = useState<boolean>(false);

  const { toast } = useToast();
  const { setData, updateData } = useLocalStorage(API_ENTITY_ENUM.episode);

  const episodeData = useGetStorageItem(
    API_ENTITY_ENUM.episode,
    episodeId
  ) as EpisodeType[];

  const form = useEpisodeForm();

  useEffect(() => {
    const clear = setTimeout(() => {
      form.reset({
        name: episodeData?.[0]?.name,
        status: episodeData?.[0]?.status,
        air_date: episodeData?.[0]?.air_date,
        created: episodeData?.[0]?.created,
        episode: episodeData?.[0]?.episode,
      });

      setShowComp(true);
    }, 500);
    return () => clearTimeout(clear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values: EpisodeSchemaType) => {

    if (isUpdate) {
      updateData("episodes", episodeId, {
        id: episodeId,
        ...values,
      });

      toast({
        title: "Update character",
        description: "Success",
      });
    } else {
      setData("episodes", {
        ...values,
        status: capitalize(values.status),
        id: random(5000),
        created: DateTime.now().toISO(),
        air_date: DateTime.now()
          .plus({
            days: 2,
          })
          .toISO(),
      });

      toast({
        title: "Create character",
        description: "Success",
      });
    }

    router.push(
      `${path}?${objectToQueryParams({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(isUpdate ? rest : qry),
      })}`
    );
    dialog.handleCreateEpisodeDialog();
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
          entity="Episode"
          label={"Episode"}
          name={"episode"}
          form={form}
        />
        <FormInputBase
          control={control}
          entity="Air date"
          label={"Air date"}
          name={"air_date"}
          form={form}
        />
        <FormInputBase
          control={control}
          entity="created"
          label={"created"}
          name={"created"}
          form={form}
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
          control={control}
          entity="Characters"
          label={"Characters"}
          name={"characters"}
          form={form}
          valueAsPh={isUpdate}
          isMultiSelect
          options={[
            {
              label: "Rick",
              value: "1",
            },
            {
              label: "Morty",
              value: "2",
            },
            {
              label: "Summer",
              value: "3",
            },
          ]}
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
                  query: qry,
                }}
                onClick={() => {
                  dialog.handleCreateEpisodeDialog();
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
