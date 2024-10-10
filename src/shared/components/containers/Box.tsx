import { FC } from "react";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Box: FC<BoxProps> = ({ className, children }): JSX.Element => {
  return <div className={className}>{children}</div>;
};
