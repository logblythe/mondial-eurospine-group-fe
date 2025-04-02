"use client";

import ApiClient from "@/api-client/";
import { categorizeData } from "@/app/(private)/group-members-comparison/categorize-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGroupStore } from "@/store/group-store";
import { Person } from "@/type/group-type";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EurospineAccountWithParticipation } from "./tab-contents/eurospine-account-with-participation";
import { EurospineAccountWithoutParticipation } from "./tab-contents/eurospine-account-without-participation";
import { NoEurospineAccountView } from "./tab-contents/no-eurospine-account";

const apiClient = new ApiClient();

const GroupMemberTabs = ({ groupId }: { groupId: string }) => {
  const router = useRouter();

  const { selectedGroupMembers = [] } = useGroupStore();
  const selectedEmails = selectedGroupMembers.map(
    (member) => member.primaryEmail
  );

  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") ?? "no_eurospine_account";

  const [data, setData] = useState<{
    noEurospineAccount: Person[];
    eurospineAccountWithoutParticipation: Person[];
    eurospineAccountWithParticipation: Person[];
  }>({
    noEurospineAccount: [],
    eurospineAccountWithoutParticipation: [],
    eurospineAccountWithParticipation: [],
  });

  const groupMembersQuery = useQuery({
    queryKey: ["groups", groupId, "members"],
    queryFn: () => apiClient.getGroupMembers(groupId),
  });

  const participationQuery = useQuery({
    queryKey: ["groups", groupId, "participation"],
    queryFn: () => apiClient.getGroupCustomer(selectedEmails),
    enabled: selectedGroupMembers.length > 0,
  });

  useEffect(() => {
    if (participationQuery.isSuccess && groupMembersQuery.isSuccess) {
      const customers = participationQuery.data ?? [];
      const categorizedData = categorizeData({
        customers,
        selectedGroupMembers,
      });
      setData(categorizedData);
    }
  }, [
    groupMembersQuery.data,
    groupMembersQuery.isSuccess,
    participationQuery.data,
    participationQuery.isSuccess,
    selectedGroupMembers,
  ]);

  const handleTabValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="container mx-auto py-10 space-y-2">
      <div className="flex flex-row  justify-between items-end">
        <div className="flex flex-row space-x-4 items-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            <span>Group Member Comparison</span>
          </h3>
          {participationQuery.isLoading || groupMembersQuery.isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : null}
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={handleTabValueChange}>
        <TabsList>
          <TabsTrigger value="no_eurospine_account">
            No Eurospine Account
          </TabsTrigger>
          <TabsTrigger value="eurospine_account_without_participation">
            Eurospine Account Without Participation
          </TabsTrigger>
          <TabsTrigger value="eurospine_account_with_participation">
            Eurospine Account With Participation
          </TabsTrigger>
        </TabsList>
        <TabsContent value="no_eurospine_account">
          <NoEurospineAccountView
            isLoading={
              groupMembersQuery.isLoading || participationQuery.isLoading
            }
            onSubmit={() => {}}
            data={data.noEurospineAccount}
          />
        </TabsContent>
        <TabsContent value="eurospine_account_without_participation">
          <EurospineAccountWithoutParticipation
            isLoading={
              groupMembersQuery.isLoading || participationQuery.isLoading
            }
            onSubmit={() => {}}
            data={data.eurospineAccountWithoutParticipation}
          />
        </TabsContent>
        <TabsContent value="eurospine_account_with_participation">
          <EurospineAccountWithParticipation
            isLoading={
              groupMembersQuery.isLoading || participationQuery.isLoading
            }
            onSubmit={() => {}}
            data={data.eurospineAccountWithParticipation}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupMemberTabs;
