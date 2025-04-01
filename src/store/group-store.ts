import { GroupType } from "@/type/group-type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GroupState {
  selectedGroupId?: string;
  selectedGroup?: GroupType;
  selectGroup: (eventId: GroupType) => void;
  selectedGroupMembers?: string[];
  setSelectedGroupMembers: (members: string[]) => void;
}

export const useGroupStore = create<GroupState, any>(
  persist(
    (set, get) => ({
      selectedGroup: undefined,
      selectedGroupId: undefined,
      selectedGroupMembers: [],
      selectGroup: (group) =>
        set(() => ({
          selectedGroup: group,
          selectedGroupId: group.contactId,
          selectedGroupMembers: [],
        })),
      setSelectedGroupMembers: (members) =>
        set(() => ({ selectedGroupMembers: members })),
    }),
    {
      name: "selected-group-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
