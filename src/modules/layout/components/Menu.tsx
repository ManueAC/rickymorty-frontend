import { Button } from "@/components/ui/button";
import { getMenu } from "@/lib/get-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface MenuProps {
  isOpen: boolean;
}
export const Menu: FC<MenuProps> = ({ isOpen }) => {
  const pathname = usePathname();
  const menuItems = getMenu(pathname);
  return (
    <div className="p-7">
      <ul className="">
        {menuItems.map(({ label, active, href, icon: Icon }, index) => (
          <li key={index} className="flex gap-1 rounded-md w-full ">
            <Button
              variant={active ? "secondary" : "ghost"}
              className="w-full justify-start  mb-1 hover:bg-slate-500"
              asChild
            >
              <Link href={href}>
                <span className="flex">
                  <span className={cn(isOpen === false ? "" : "mr-4")}>
                    <Icon size={18} color={cn(active ? "black" : "white")} />
                  </span>
                  <p
                    className={cn(
                      "max-w-[200px] truncate font-b",
                      isOpen === false
                        ? "-translate-x-96 opacity-0"
                        : "translate-x-0 opacity-100",
                      active ? "text-slate-950" : "text-white"
                    )}
                  >
                    {label}
                  </p>
                </span>
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
