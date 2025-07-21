import ApiClient from "@/api-client";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "clsx";
import { Menu, RefreshCcw } from "lucide-react";
import { GroupSelector } from "./EventSelector";
import { Button } from "./ui/button";

type Props = {
  onMenuButtonClick(): void;
};

const apiClient = new ApiClient();

const Navbar = (props: Props) => {
  const queryClient = useQueryClient();

  const refreshCache = useMutation({
    mutationFn: () => apiClient.getRefreshCache(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast({
        title: "Cache refreshed successfully!",
        description: "The group data has been updated.",
        variant: "default",
      });
    },
  });

  const isLoading = refreshCache.isPending;

  return (
    <nav
      className={classNames({
        "bg-white text-zinc-500": true, // colors
        "flex items-center": true, // layout
        "w-screen md:w-full sticky z-10 px-8 shadow-sm h-[73px] top-0 ": true, //positioning & styling
      })}
    >
      <p className="font-bold text-xs md:text-sm">Group Portal</p>
      <div className="flex-grow"></div>
      <GroupSelector />
      <Button
        variant="outline"
        size="icon"
        onClick={() => refreshCache.mutate()}
        className="ml-4 "
      >
        <RefreshCcw
          className={`h-4 w-4  ${isLoading ? "animate-spin" : "animate-none"}`}
        />
      </Button>
      <button className="md:hidden ml-4" onClick={props.onMenuButtonClick}>
        <Menu className="h-6 w-6" />
      </button>
    </nav>
  );
};

export default Navbar;
