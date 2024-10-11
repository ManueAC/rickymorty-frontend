"use client";
import { Menu } from "./Menu";

export const Sidebar = (): JSX.Element => {
  return (
    <div className="bg-primary w-72">
      <Menu isOpen />
    </div>
  );
};
