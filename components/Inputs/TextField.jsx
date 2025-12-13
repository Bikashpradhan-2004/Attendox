import { useField } from "formik";
import { Input } from "../ui/input";

const TextField = (props) => {
  const [field, meta] = useField({ ...props, type: props.type ?? "text" });
  return (
    <div className="w-full text-black">
      {props.label ? (
        <label className="block text-sm font-medium mb-1">{props.label}</label>
      ) : null}
      <Input
        className={`p-2 text-sm w-full ${props.className} ${
          meta.touched && meta.error ? "text-red-500 border-red-500" : ""
        } ${props.readOnly ? "cursor-not-allowed" : ""}`}
        {...field}
        {...props}
        placeholder={props.placeholder ?? `Enter ${props.label}`}
        readOnly={props.readOnly}
      />
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default TextField;
