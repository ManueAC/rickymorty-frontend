"use client";
import { FC } from "react";
import Cookies from "js-cookie";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { usePathname, useRouter } from "next/navigation";
import { Box } from "@/shared/components/containers/Box";
import { Loader } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();

  const token = Cookies.get("token");

  const isLogin = pathname.includes("/login");
  if (!token && pathname !== "/login") {
    router.push("/login");

    return (
      <Box className="h-screen w-full flex justify-center items-center">
        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          <Loader size={25} />
        </svg>
      </Box>
    );
  }
  let content = (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full">
        <Topbar />
        <main className="w-full bg-popover p-8">{children}</main>
      </div>
    </div>
  );

  if (isLogin) content = <Box>{children}</Box>;

  return content;
};
