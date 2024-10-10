import { FC } from "react";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full">
        <Topbar />
        <main className="w-full bg-popover p-8">{children}</main>
      </div>
    </div>
  );
};
