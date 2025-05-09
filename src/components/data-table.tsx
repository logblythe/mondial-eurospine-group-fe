"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoveDown, MoveUp } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyDataMessage?: React.JSX.Element;
  rowSelection?: any;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  onRowClick?: (data: TData) => void;
  onRowSelectionChange?: OnChangeFn<RowSelectionState> | undefined;
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  enableMultiRowSelection?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  emptyDataMessage,
  rowSelection = {},
  sorting,
  onSortingChange,
  onRowSelectionChange,
  onRowClick,
  enableRowSelection = true,
  enableMultiRowSelection = false,
}: DataTableProps<TData, TValue>) {
  //access sorting state from the table instance
  const table = useReactTable({
    data,
    columns,
    enableRowSelection,
    enableMultiRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    onRowSelectionChange: onRowSelectionChange,
    onSortingChange: onSortingChange,
    state: {
      rowSelection,
      sorting,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }
                    onClick={header.column.getToggleSortingHandler()}
                    title={
                      header.column.getCanSort()
                        ? header.column.getNextSortingOrder() === "asc"
                          ? "Sort ascending"
                          : header.column.getNextSortingOrder() === "desc"
                          ? "Sort descending"
                          : "Clear sort"
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanSort() ? (
                        <div className="flex flex-row ">
                          <MoveDown
                            className={`h-4 w-4 ${
                              header.column.getIsSorted() === "asc"
                                ? "text-primary"
                                : "text-gray-400"
                            }`}
                          />
                          <MoveUp
                            className={`h-4 w-4 ${
                              header.column.getIsSorted() === "desc"
                                ? "text-primary"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                      ) : null}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyDataMessage ? emptyDataMessage : "No Result"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
