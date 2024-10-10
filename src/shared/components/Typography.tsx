import { COLORS } from "@/constants";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface TypographyProps {
  text: string;
  color?: keyof typeof COLORS;
  separator?: boolean;
}
const fontColor = (fontColor: keyof typeof COLORS) => {
  return `${COLORS[fontColor]}`;
};
export const Subtitle: FC<TypographyProps> = (props): JSX.Element => {
  const { text, color = "medium" } = props;

  return (
    <h4
      className={cn("text-sm")}
      style={{
        color: fontColor(color),
      }}
    >
      {text}
    </h4>
  );
};

export const MainTitle: FC<TypographyProps> = (props): JSX.Element => {
  const { text, color = "medium", separator } = props;
  return (
    <h2
      className={cn(
        "text-4xl tracking-wide font-extrabold",
        separator && "border-b pb-2"
      )}
      style={{
        color: fontColor(color),
      }}
    >
      {text}
    </h2>
  );
};
