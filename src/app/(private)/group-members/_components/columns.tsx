"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { GroupMember } from "@/type/group-type";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<GroupMember>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        disabled={!row.getCanSelect()}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "internalNumber",
    header: "Id",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    enableSorting: false,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "primaryEmail",
    header: "Primary Email",
    enableSorting: false,
  },
  {
    accessorKey: "country",
    header: "Country",
    enableSorting: false,
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
    enableSorting: false,
    cell: ({ row }) => {
      const remarks = row.getValue("remarks") as string[];
      return (
        <ul className="flex flex-col">
          {remarks.map((remark, index) => (
            <li key={index} className="text-sm text-gray-500">
              * {remark}
            </li>
          ))}
        </ul>
      );
    },
  },
];
