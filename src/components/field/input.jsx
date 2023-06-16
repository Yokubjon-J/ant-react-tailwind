import React from "react";
import { Input } from "antd";

const TextInput = ({
  field,
  label,
  required = false,
  placeholder,
  errorMessage = "Это обизателноe поля",
  form: { setFieldValue, setFieldTouched, errors, touched },
}) => {
  // const handleBlur = () => {
  //   if (!field.value) {
  //     setFieldTouched(field.name, true);
  //     errors[field.name] = "This field is required";
  //   }
  // };

  return (
    <div className="mb-2">
      {label ? <h2 className="text-sm">{label}</h2> : null}
      <Input
        name={field.name}
        formNoValidate
        value={field.value}
        onBlur={() => !field.value && setFieldTouched(field.name, true)}
        onChange={(e) => setFieldValue(field.name, e.target.value)}
        placeholder={placeholder}
        status={!field.value && touched[field.name] && errors[field.name] && "error"}
      />
      {!field.value && touched[field.name] && errors[field.name] && (
        <small className="text-red-500 font-semibold text-xs">
          {errorMessage}
        </small>
      )}
    </div>
  );
};

export default TextInput;
