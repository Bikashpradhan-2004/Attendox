import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

const ActionCell = ({ data, onDelete }) => {
  return (
    <DeleteConfirmDialog
      onConfirm={() => onDelete(data.id)}
      triggerButton={
        <Button variant="destructive" size="icon">
          <Trash2 size={18} />
        </Button>
      }
    />
  );
};

export default ActionCell;
