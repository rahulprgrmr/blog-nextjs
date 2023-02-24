import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

function Button(
  props:
    | DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      > & { theme?: string }
) {
  const lightClassNames = "border-2 border-white-500";
  const darkClassNames = "bg-gradient-to-r from-purple-500 to-pink-500";
  const theme = props.theme == "light" ? lightClassNames : darkClassNames;
  return (
    <button className={`${theme} py-3 px-6 rounded-3xl text-white`} {...props}>
      {props.children}
    </button>
  );
}

export default Button;
