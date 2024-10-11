"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { CharacterForm } from "../../../modules/characters/components/CharacterForm";
import { useDialog } from "@/store/store";

interface CreateUserModalProps {
  isOpen?: boolean;
}
export const CreateUserModal: FC<CreateUserModalProps> = () => {
  const params = useSearchParams();
  const dialog = useDialog();

  const id = Number(params.get("id"));

  const isUpdate = !!id;

  const title = isUpdate ? "Update" : "Create";

  return (
    <Dialog open={dialog.openCreateCharacterDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 text-center">
            {title} a character
          </DialogTitle>

          <CharacterForm characterId={id} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
