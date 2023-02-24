"use client";

import NotificationContext from "@/store/notification-context";
import { validate } from "@/utils/form-validation";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useContext, useState } from "react";
import Button from "../ui/button";
import TextInput from "../ui/text-input";

function RegisterForm() {
  interface FormData {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
  }
  const initFormData: FormData = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const validationRules: FormData = {
    name: "required",
    email: "required",
    password: "required|confirmed",
    password_confirmation: "required",
  };

  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(initFormData);
  const notificationCtx = useContext(NotificationContext);
  const { showNotification } = notificationCtx;
  const router = useRouter();

  function handleInputChange(event: { target: HTMLInputElement }) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors({
      ...errors,
      [event.target.name]: "",
    });
  }

  async function handleFormSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const validationErrors: FormData = validate(formData, validationRules);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      showNotification({
        title: "Error",
        message: `${response.status} ${response.statusText}`,
        status: "error",
      });
      return;
    }

    const data: any = await response.json();

    showNotification({
      title: "Success",
      message: data.message,
      status: "success",
    });

    router.push("/login");
  }
  return (
    <form className="mt-6" onSubmit={handleFormSubmit}>
      <TextInput
        label="Name"
        type="text"
        name="name"
        id="name"
        onChange={handleInputChange}
        value={formData.name}
        error={errors.name}
      />
      <TextInput
        label="Email"
        type="email"
        name="email"
        id="email"
        onChange={handleInputChange}
        value={formData.email}
        error={errors.email}
      />
      <TextInput
        label="Password"
        type="password"
        name="password"
        id="password"
        onChange={handleInputChange}
        value={formData.password}
        error={errors.password}
      />
      <TextInput
        label="Confirm Password"
        type="password"
        name="password_confirmation"
        id="password_confirmation"
        onChange={handleInputChange}
        value={formData.password_confirmation}
        error={errors.password_confirmation}
      />
      <div className="btn-group mt-8 flex justify-center">
        <Button>Register</Button>
      </div>
    </form>
  );
}

export default RegisterForm;
