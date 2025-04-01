import { Customer, GroupMember, Person } from "@/type/group-type";

type Props = {
  selectedGroupMembers: string[];
  customers: Customer[];
  groupMembers: GroupMember[];
};

export const categorizeData = ({
  selectedGroupMembers,
  customers,
  groupMembers,
}: Props) => {
  const noEurospineAccount: Person[] = [];
  const eurospineAccountWithoutParticipation: Person[] = [];
  const eurospineAccountWithParticipation: Person[] = [];

  for (const email of selectedGroupMembers) {
    if (!email) {
      continue;
    }

    const customer = customers.find(
      (customer) => customer.primaryEmail === email
    );
    const selectedGroupMember = groupMembers.find(
      (member) => member.primaryEmail === email
    );

    if (!customer) {
      if (selectedGroupMember) {
        noEurospineAccount.push({
          eventsAir: selectedGroupMember,
        });
      }
      continue;
    }

    const { participation } = customer;

    if (!participation || participation.checkboxAccepted !== "1") {
      eurospineAccountWithoutParticipation.push({
        eventsAir: selectedGroupMember,
        eurospine: customer,
      });
    } else {
      eurospineAccountWithParticipation.push({
        eventsAir: selectedGroupMember,
        eurospine: customer,
      });
    }
  }

  return {
    noEurospineAccount,
    eurospineAccountWithoutParticipation,
    eurospineAccountWithParticipation,
  };
};
