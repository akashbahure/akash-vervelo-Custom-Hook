import React, { useState } from "react";
import { Button, TextInput, Card, Container, Title, Center } from "@mantine/core";
import { useFormState } from "../hooks/useFormState";

interface SimpleFormProps {}

const SimpleForm: React.FC<SimpleFormProps> = () => {
  const { formValues, handleChange, resetForm } = useFormState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  // Simple validation
  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!formValues.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formValues.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formValues.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    alert(`Name: ${formValues.name}, Email: ${formValues.email}`);
    resetForm();
    setErrors({});
  };

  return (
    <Container size={420} my={40}>
      <Center>
        <Card shadow="md" padding="xl" radius="md" withBorder style={{ width: "100%" }}>
          <Title order={3} align="center" mb="md">
            Simple Form
          </Title>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Name"
              placeholder="Enter your name"
              value={formValues.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
            />
            <TextInput
              label="Email"
              placeholder="Enter your email"
              mt="md"
              value={formValues.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
            />
            <Button type="submit" mt="xl" fullWidth>
              Submit
            </Button>
          </form>
        </Card>
      </Center>
    </Container>
  );
};

export default SimpleForm;
