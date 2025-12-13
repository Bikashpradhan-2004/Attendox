import TextField from "@/components/Inputs/TextField";
import SelectField from "./SelectField";

const StudentFormFields = ({ gradeOptions }) => {
  return (
    <div className="space-y-4">
      <TextField name="name" label="Full Name" placeholder="Full Name" />

      <TextField name="phone" label="Phone Number" placeholder="Phone number" />

      <TextField
        name="address"
        label="Address"
        placeholder="City/Town, District, State"
      />

      <SelectField
        label="Grade"
        name="grade"
        placeholder="Select grade"
        options={gradeOptions}
      />
    </div>
  );
};

export default StudentFormFields;
