"use client";

import RichTextEditor from "@/components/ui/rich-text-editor";
import Switch from "@/components/ui/switch";
import TextInput from "@/components/ui/text-input";
import withSession from "@/hoc/with-session";
import NotificationContext from "@/store/notification-context";
import { validate } from "@/utils/form-validation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useContext, useRef, useState } from "react";
import Button from "../ui/button";
import TextArea from "../ui/textarea";

function PostSaveForm() {
  interface FormData {
    title: string;
    image?: File;
    summary: string;
    content: string;
    isFeatured: boolean;
  }
  interface FormDataError {
    title?: string;
    image?: string;
    summary?: string;
    content?: string;
    is_featured?: string;
  }
  const initFormData: FormData = {
    title: "",
    image: undefined,
    summary: "",
    content: "",
    isFeatured: false,
  };
  const initFormErrors: FormDataError = {
    title: "",
    image: "",
    summary: "",
    content: "",
    is_featured: "",
  };
  const validationRules: FormDataError = {
    title: "required",
    image: "required",
    summary: "required",
    content: "required",
  };
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(initFormErrors);
  const editorRef: any = useRef();
  const notificationCtx = useContext(NotificationContext);
  const { showNotification } = notificationCtx;
  const session = useSession();
  const router = useRouter();

  function handleInputChange(event: { target: any }, name?: string) {
    if (event.target.type == "file") {
      setFormData({
        ...formData,
        [name ?? event.target.name]: event.target.files?.length
          ? event.target.files[0]
          : null,
      });
    } else if (event.target.type == "checkbox") {
      setFormData({
        ...formData,
        [name ?? event.target.name]: event.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name ?? event.target.name]: event.target.value,
      });
    }

    setErrors({
      ...errors,
      [event.target.name]: "",
    });
  }

  async function submitFormHandler(event: SyntheticEvent) {
    if (!session.data || !session.data.user) {
      return;
    }
    event.preventDefault();
    const blogContent = editorRef.current.getContent();
    let submitData = formData;
    submitData = {
      ...submitData,
      content: blogContent,
    };
    const validationErrors: FormDataError = validate(
      submitData,
      validationRules
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formSubmitData: any = new FormData();

    for (const name in submitData) {
      //   if (name == "image") continue;
      formSubmitData.append(name, submitData[name as keyof typeof submitData]);
    }

    const response = await fetch("/api/posts", {
      method: "POST",
      body: formSubmitData,
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

    router.push("/");
  }
  return (
    <form className="mt-3">
      <div className="grid grid-cols-2 gap-2">
        <TextInput
          label="Title"
          name="title"
          id="title"
          value={formData.title}
          error={errors.title}
          onChange={handleInputChange}
        />
        <TextInput
          label="Image"
          type="file"
          accept="image/*"
          name="image"
          id="image"
          error={errors.image}
          onChange={handleInputChange}
        />
        <div className="col-span-2">
          <TextArea
            label="Summary"
            id="summary"
            rows={5}
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
          />
        </div>
        <RichTextEditor
          label="Content"
          className="col-span-2"
          ref={editorRef}
          error={errors.content}
        />
        <Switch
          name="is_featured"
          id="is_featured"
          error={errors.is_featured}
          checked={formData.isFeatured}
          onChange={(event) => handleInputChange(event, "isFeatured")}
        />
      </div>
      <div className="text-right m-2">
        <Button onClick={submitFormHandler}>Save</Button>
      </div>
    </form>
  );
}

export default withSession(PostSaveForm);
