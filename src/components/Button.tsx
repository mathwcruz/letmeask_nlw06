import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

import "../styles/components/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={classNames("button", {
        outlined: isOutlined,
      })}
    />
  );
}
