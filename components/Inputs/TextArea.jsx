import { useField } from "formik";

const TextArea = (props) => {
  const [field, meta] = useField({ ...props, type: props.type ?? "text" });
  return (
    <div className="w-full text-black">
      {props.label ? (
        <label className="block text-sm font-medium mb-1">{props.label}</label>
      ) : null}
      <textarea
        className={`p-2 text-sm w-full border-[1px] outline-none shadow-xs focus:ring-3 ring-gray-300 rounded-lg ${
          meta.touched && meta.error ? " border-red-500" : ""
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default TextArea;
