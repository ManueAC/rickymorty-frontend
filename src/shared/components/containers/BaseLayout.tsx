import { FC } from "react";
import { MainTitle } from "../Typography";

interface BaseLayoutProps {
  title: string;
  children: React.ReactNode;
}
export const BaseLayout: FC<BaseLayoutProps> = ({
  title,
  children,
}): JSX.Element => {
  return (
    <div className="w-full">
      <MainTitle text={title} color="mediumNext" separator />
      {children}
    </div>
  );
};
