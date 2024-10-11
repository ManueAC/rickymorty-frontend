"use client";
import Link from "next/link";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { Avatar } from "@/shared/components/Avatar";
import { IconButton } from "@/shared/components/Icon";
import { Subtitle } from "@/shared/components/Typography";

export const Topbar = (): JSX.Element => {
  return (
    <div className="bg-zinc-800 w-full flex justify-end py-2 px-4 items-center gap-3">
      <Avatar />
      <Subtitle text="Username Lat" color="white" />
      <Link
        onClick={() => {
          Cookies.remove("token");
        }}
        href={"/login"}
      >
        <IconButton component={<LogOut color="white" />} />
      </Link>
    </div>
  );
};
