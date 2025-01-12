"use client";
import {
  Table as TableLib,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import React from "react";
import { TableOptions } from "../dropdown/TableOptions";
import { Box } from "../containers/Box";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export type TableHeadType = {
  label: string;
};

export type TableBodyType<T> = T;

interface TableProps {
  head: TableHeadType[];
  loading: boolean;
  // eslint-disable-next-line
  data: any[];
  footerDescription?: string;
}
export function Table({ footerDescription, head = [], data = [] }: TableProps) {
  const tableDescription = footerDescription && (
    <TableCaption>{footerDescription}</TableCaption>
  );

  const tableHead =
    head.length > 0
      ? head.map((headItem, idx) => (
          <TableHead
            key={`${headItem.label}-${idx}`}
            className={cn(
              idx === 0 && "w-[100px]",
              idx === head.length - 1 && "text-right",
              "sticky"
            )}
          >
            {headItem.label}
          </TableHead>
        ))
      : null;

  const tableBody =
    data.length > 0
      ? data.map((b, idx) => {
          // eslint-disable-next-line
          const entries = Object.entries(b as any);

          const content = entries.map(([k, v], entryIdx) => {
            const align = cn(entryIdx === entries.length - 1 && "text-right");
            // eslint-disable-next-line
            const i = v as Array<Record<string, any>>;
            let content = v;
            // if (k === "id") return;
            if (k === "image") {
              content = (
                <Avatar>
                  <AvatarImage src={String(v)} alt={k} />
                </Avatar>
              );
            }
            if (k === "actions" && i?.length > 0) {
              content = (
                <>
                  {
                    <TableOptions
                      options={i?.map((trebt) => ({
                        label: trebt.label,
                        query: trebt.query,
                        data: b,
                      }))}
                    />
                  }
                </>
              );
            }
            return (
              <TableCell className={align} key={entryIdx}>
                <>{content}</>
              </TableCell>
            );
          });

          return <TableRow key={idx}>{content}</TableRow>;
        })
      : null;

  return (
    <Box className="">
      <TableLib className="min-h-[420px]">
        {tableDescription}
        <TableHeader className="">
          <TableRow className="overflow-auto sticky">{tableHead}</TableRow>
        </TableHeader>
        <TableBody className="relative ">{tableBody}</TableBody>
      </TableLib>
    </Box>
  );
}
