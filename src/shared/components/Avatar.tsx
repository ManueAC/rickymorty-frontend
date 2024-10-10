import {
  Avatar as BaseAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { FC } from "react";

interface AvatarProps {
  url?: string;
}
export const Avatar: FC<AvatarProps> = ({
  url = "https://github.com/shadcn.png",
}) => {
  return (
    <BaseAvatar>
      <AvatarImage src={url} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </BaseAvatar>
  );
};
