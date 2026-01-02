import { Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

const ActionCell = ({ data, onEdit, onDelete }) => {
  return (
    <div className="flex gap-4 items-center justify-center">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onEdit(data)}
        className="hover:bg-blue-700 bg-blue-500 text-white hover:text-white"
      >
        <Pencil size={18} />
      </Button>

      <DeleteConfirmDialog
        onConfirm={() => onDelete(data.id)}
        triggerButton={
          <Button
            variant="destructive"
            size="icon"
            className="bg-red-500 hover:bg-red-700"
          >
            <Trash2 size={18} />
          </Button>
        }
      />
    </div>
  );
};

export default ActionCell;
