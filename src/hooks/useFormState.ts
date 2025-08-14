import { useState } from "react";

export const useFormState = <T extends object>(initialValues: T) => {
  const [formValues, setFormValues] = useState<T>(initialValues);

  const handleChange = (field: keyof T, value: string) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const resetForm = () => {
    setFormValues(initialValues);
  };

  return { formValues, handleChange, resetForm };
};
