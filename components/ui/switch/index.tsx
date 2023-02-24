import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import "./switch.css";

function Switch(
  props: { className?: string; error?: string } & DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  const { className, error } = props;
  console.log(props);

  return (
    <div>
      <div className="m-2 flex items-center">
        <label>Is Featured?</label>
        <label className={`switch ml-5 ${className}`}>
          <input type="checkbox" {...props} />
          <span className={`slider`}></span>
        </label>
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}

export default Switch;
