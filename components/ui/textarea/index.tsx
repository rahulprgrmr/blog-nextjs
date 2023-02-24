import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

function TextArea(
  props: {
    label?: string;
    id?: string;
    className?: string;
  } & DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
) {
  const { className, ...otherProps } = props;
  const { id, label } = otherProps;
  return (
    <div className="input-group m-2 flex flex-col">
      <label htmlFor={id}>{label}</label>
      <textarea
        className={`border-solid border-2 mt-1 rounded ${className}`}
        {...otherProps}
      ></textarea>
    </div>
  );
}

export default TextArea;
