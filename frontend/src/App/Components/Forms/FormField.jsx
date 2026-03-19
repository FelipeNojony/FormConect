import TextField from "./TextField";
import SelectField from "./SelectField";
import TextareaField from "./TextareaField";
import RadioField from "./RadioField";
import CheckboxField from "./CheckboxField";

export default function FormField({ field, value, error, onChange }) {
  switch (field.type) {
    case "text":
    case "email":
    case "date":
      return <TextField field={field} value={value} error={error} onChange={onChange} />;

    case "select":
      return <SelectField field={field} value={value} error={error} onChange={onChange} />;

    case "textarea":
      return <TextareaField field={field} value={value} error={error} onChange={onChange} />;

    case "radio":
      return <RadioField field={field} value={value} error={error} onChange={onChange} />;

    case "checkbox":
      return <CheckboxField field={field} value={value} error={error} onChange={onChange} />;

    default:
      return null;
  }
}