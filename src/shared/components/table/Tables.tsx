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
import React, { FC } from "react";
import { TableOptions } from "../dropdown/TableOptions";

type TableHeadType = {
  label: string;
};

type TableBodyType = {};

interface TableProps {
  head: TableHeadType[];
  data: TableBodyType[];
  footerDescription?: string;
}
export const Table: FC<TableProps> = ({
  footerDescription,
  head = [],
  data = [],
}) => {
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
              idx === head.length - 1 && "text-right"
            )}
          >
            {headItem.label}
          </TableHead>
        ))
      : null;

  const tableBody =
    data.length > 0
      ? data.map((b, idx) => {
          const entries = Object.entries(b);

          const content = entries.map(([k, v], entryIdx) => {
            const align = cn(entryIdx === entries.length - 1 && "text-right");
            const i = v as Array<Record<string, any>>;
            let content = v;

            if (k === "actions" && i?.length > 0) {
              //   content = i.map((iconAction, idx) => (
              //     <span key={idx}>{iconAction.component}</span>
              //   ));
              content = (
                <>
                  {
                    <TableOptions
                      options={i?.map((trebt) => ({
                        label: trebt.label,
                        action: trebt.action,
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
    <TableLib>
      {tableDescription}

      <TableHeader>
        <TableRow>{tableHead}</TableRow>
      </TableHeader>

      <TableBody>{tableBody}</TableBody>
    </TableLib>
  );
};
