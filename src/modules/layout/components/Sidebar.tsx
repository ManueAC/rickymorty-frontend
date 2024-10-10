"use client";
import { Menu } from "./Menu";

export const Sidebar = (): JSX.Element => {
  return (
    <aside className="bg-primary w-72">
      <Menu isOpen />
    </aside>
  );
};
