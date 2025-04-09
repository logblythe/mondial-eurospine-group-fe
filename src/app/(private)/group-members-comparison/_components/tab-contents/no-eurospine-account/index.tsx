import ApiClient from "@/api-client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useGroupStore } from "@/store/group-store";
import { Person } from "@/type/group-type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { columns } from "./columns";

type Props = {
  data: Person[];
  onSubmit: (rowSelection: Record<string, boolean>) => void;
  isSyncing?: boolean;
};

const apiClient = new ApiClient();

export const NoEurospineAccountView = (props: Props) => {
  const { onSubmit, data = [], isSyncing } = props;

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const { selectedGroupId } = useGroupStore();

  const groupSyncQuery = useQuery({
    queryKey: ["groups", selectedGroupId, "status"],
    queryFn: () => apiClient.getSyncStatus(selectedGroupId!),
    enabled: !!selectedGroupId,
    refetchInterval: 5000,
  });

  const status = groupSyncQuery?.data?.GroupCatA;

  const handleClick = () => onSubmit(rowSelection);

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
        <Button
          disabled={status === "IN_PROGRESS" || isSyncing}
          onClick={handleClick}
        >
          {status === "IN_PROGRESS" || isSyncing ? (
            <Loader2 className="w-4 h-4 animate-spin mr-4" />
          ) : null}
          {status === "IN_PROGRESS" || isSyncing ? "Syncing..." : "Sync"}
        </Button>
      </div>
    </div>
  );
};
