import * as Yup from "yup";

export const studentValidationSchema = Yup.object({
  name: Yup.string().min(2).required("Full name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  address: Yup.string().min(5).required("Address is required"),
  grade: Yup.string().required("Grade is required"),
});

export const studentInitialValues = {
  name: "",
  phone: "",
  address: "",
  grade: "",
};
