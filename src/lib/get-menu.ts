import {
  LogInIcon,
  LucideIcon,
  PersonStanding,
  Presentation,
} from "lucide-react";

type MenuList = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
};

export const getMenu = (pathname: string): MenuList[] => {
  return [
    // {
    //   icon: LogInIcon,
    //   label: "Log In",
    //   href: "/login",
    //   active: pathname.includes("/login"),
    // },
    {
      icon: PersonStanding,
      label: "Characters",
      href: "/characters",
      active: pathname.includes("/characters"),
    },
    {
      icon: Presentation,
      label: "Episodes",
      href: "/episodes",
      active: pathname.includes("/episodes"),
    },
  ];
};
