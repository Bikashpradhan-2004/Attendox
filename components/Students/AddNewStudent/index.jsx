"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Formik } from "formik";
import StudentFormFields from "./StudentFormFields";
import { useStudentForm } from "@/hooks/useStudentForm";
import {
  studentInitialValues,
  studentValidationSchema,
} from "@/components/Students/AddNewStudent/utils/studentFormSchema";

const AddNewStudent = ({ refreshData }) => {
  const [open, setOpen] = useState(false);
  const { loading, gradeOptions, handleSubmit } = useStudentForm(refreshData);

  const onSubmit = async (values, formikBag) => {
    const success = await handleSubmit(values, formikBag);
    if (success) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          + Add New Student
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={studentInitialValues}
          validationSchema={studentValidationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <>
              <StudentFormFields gradeOptions={gradeOptions} />

              <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button type="button" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </DialogFooter>
            </>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewStudent;
