"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";
import { CharacterForm } from "../../../modules/characters/components/CharacterForm";
import { useDialog } from "@/store/store";
import Link from "next/link";

interface CreateUserModalProps {
  isOpen?: boolean;
}
export const CreateUserModal: FC<CreateUserModalProps> = () => {
  const path = usePathname();
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

          <DialogClose>
            {/* Cancel */}
            <Link
              href={{
                pathname: path,
                query: null,
              }}
              onClick={() => {
                dialog.handleCreateCharacterDialog();
              }}
            >
              Cancel
            </Link>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
