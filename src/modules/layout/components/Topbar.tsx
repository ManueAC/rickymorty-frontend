import { Avatar } from "@/shared/components/Avatar";
import { IconButton } from "@/shared/components/Icon";
import { Subtitle } from "@/shared/components/Typography";
import { LogOut } from "lucide-react";

export const Topbar = (): JSX.Element => {
  return (
    <div className="bg-zinc-800 w-full flex justify-end py-2 px-4 items-center gap-3">
      <Avatar />
      <Subtitle text="Username Lat" color="white" />
      <IconButton component={<LogOut color="white" />} />
    </div>
  );
};
