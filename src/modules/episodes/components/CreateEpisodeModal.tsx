"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { useDialog } from "@/store/store";
import { EpisodeForm } from "./EpisodeForm";

interface CreateUserModalProps {
  isOpen?: boolean;
}
export const CreateEpisodeModal: FC<CreateUserModalProps> = () => {
  const params = useSearchParams();
  const dialog = useDialog();

  const id = Number(params.get("id"));

  const isUpdate = !!id;

  const title = isUpdate ? "Update" : "Create";

  return (
    <Dialog open={dialog.openCreateEpisodeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 text-center">
            {title} a character
          </DialogTitle>

          <EpisodeForm episodeId={id} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
