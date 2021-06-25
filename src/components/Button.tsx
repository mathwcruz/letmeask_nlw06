import { ButtonHTMLAttributes } from "react";

import "../styles/components/button.scss";

type ButtonProps = ButtonHTMLAttributes<
  HTMLButtonElement> & {
    isOutlined?: boolean;
  };

export function Button({ isOutlined = false, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={`button ${isOutlined ? "outlined" : ""}`} />
  );
}
