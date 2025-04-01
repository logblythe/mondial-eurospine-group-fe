import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Person } from "@/type/group-type";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { columns } from "./columns";

const FormSchema = z.object({
  fromDate: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

type Props = {
  data: Person[];
  isLoading: boolean;
  onSubmit: (values: FormValues) => void;
};

export const NoEurospineAccountView = (props: Props) => {
  const { isLoading, onSubmit, data = [] } = props;

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  return (
    <div className="flex flex-col space-y-4">
      <DataTable
        columns={columns}
        data={data}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        enableMultiRowSelection
      />
      <div className="flex flex-row justify-end w-full px-2">
        <Button disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-4" /> : null}
          Sync
        </Button>
      </div>
    </div>
  );
};
