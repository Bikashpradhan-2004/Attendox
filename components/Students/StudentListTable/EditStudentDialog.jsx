"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Formik } from "formik";
import { studentValidationSchema } from "@/components/Students/AddNewStudent/utils/studentFormSchema";
import { useEditStudentForm } from "@/hooks/useEditStudentForm";
import StudentFormFields from "../AddNewStudent/StudentFormFields";

const EditStudentDialog = ({ student, open, onOpenChange, refreshData }) => {
  const { loading, gradeOptions, handleUpdate } =
    useEditStudentForm(refreshData);

  const initialValues = {
    name: student?.name || "",
    grade: student?.grade || "",
    address: student?.address || "",
    phone: student?.contact || "",
  };

  const onSubmit = async (values, formikBag) => {
    const success = await handleUpdate(student.id, values, formikBag);
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={studentValidationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ handleSubmit }) => (
            <>
              <StudentFormFields gradeOptions={gradeOptions} />

              <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button type="button" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </Button>
              </DialogFooter>
            </>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentDialog;
