"use client";

import { Editor } from "@tinymce/tinymce-react";
import { forwardRef, useImperativeHandle, useRef } from "react";
function RichTextEditor(
  props: { label: string; className?: string; error?: string },
  ref: any
) {
  const editorRef: any = useRef(null);
  useImperativeHandle(
    ref,
    () => {
      return {
        getContent() {
          return editorRef.current.getContent();
        },
      };
    },
    []
  );
  return (
    <div className={`m-2 flex flex-col ${props.className ?? ""}`}>
      <label className="mb-1">{props.label}</label>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "a11ychecker",
            "advlist",
            "advcode",
            "advtable",
            "autolink",
            "checklist",
            "export",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "powerpaste",
            "fullscreen",
            "formatpainter",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
            "code",
          ],
          toolbar:
            "undo redo | casechange blocks | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      {props.error && (
        <span className="text-red-500 text-sm">{props.error}</span>
      )}
    </div>
  );
}

export default forwardRef(RichTextEditor);
