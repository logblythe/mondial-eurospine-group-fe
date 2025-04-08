import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Person } from "@/type/group-type";
import { flexRender, useReactTable } from "@tanstack/react-table";
import { getCoreRowModel } from "@tanstack/table-core";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { columns } from "./columns";
// import { columns } from "./columns";

type Props = {
  isLoading: boolean;
  onSubmit: () => void;
  data: Person[];
};

export const EurospineAccountWithoutParticipation = (props: Props) => {
  const { isLoading, onSubmit, data } = props;

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-row justify-end w-full px-2">
        <Button disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-4" /> : null}
          Sync
        </Button>
      </div>
    </div>
  );
};
