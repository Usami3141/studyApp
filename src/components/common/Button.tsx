import React from "react";
import style from "../../App.module.css";

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

const Button = ({
  onClick,
  disabled = false,
  children,
  className = style.button,
}: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
