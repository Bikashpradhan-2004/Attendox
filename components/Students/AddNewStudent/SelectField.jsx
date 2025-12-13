"use client";

import { Field } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectField = ({
  label,
  name,
  options,
  placeholder,
  valueKey = "id",
  labelKey = "grade",
}) => (
  <Field name={name}>
    {({ field, form, meta }) => (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}

        <Select
          value={field.value}
          onValueChange={(value) => form.setFieldValue(name, value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option[valueKey]} value={option[labelKey]}>
                {option[labelKey]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {meta.touched && meta.error && (
          <p className="text-xs text-red-600">{meta.error}</p>
        )}
      </div>
    )}
  </Field>
);

export default SelectField;
