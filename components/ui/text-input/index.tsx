import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type AppProps = {
  label?: string;
  error?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
function TextInput(props: AppProps) {
  const { label, className, error, ...otherProps } = props;
  return (
    <div className="input-group m-2">
      {label && (
        <label htmlFor={props.id} className="block">
          {label}
        </label>
      )}

      <input
        className={`border-solid border-2 ${
          error ? "border-red-300" : "border-black-300"
        } rounded w-full h-10 mt-1 ${className ?? ""}`}
        {...otherProps}
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}

export default TextInput;
