"use client";

import { validate } from "@/utils/form-validation";
import { SyntheticEvent, useContext, useState } from "react";
import { signIn } from "next-auth/react";
import TextInput from "@/components/ui/text-input";
import NotificationContext from "@/store/notification-context";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

function LoginForm() {
  interface FormData {
    email?: string;
    password?: string;
  }
  const initFormData: FormData = {
    email: "",
    password: "",
  };
  const validationRules: FormData = {
    email: "required",
    password: "required",
  };

  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(initFormData);
  const { showNotification } = useContext(NotificationContext);
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

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (!result || !result.ok) {
      console.log(result);
      showNotification({
        title: "Error",
        message: result?.error ?? "Invalid Credentials",
        status: "error",
      });

      return;
    }

    showNotification({
      title: "Success",
      message: "Logged In Successfully",
      status: "success",
    });

    router.replace("/");
  }
  return (
    <form className="mt-6" onSubmit={handleFormSubmit}>
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
      <div className="btn-group mt-8 flex justify-center">
        <Button>Login</Button>
      </div>
    </form>
  );
}

export default LoginForm;
