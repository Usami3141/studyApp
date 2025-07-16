import React from "react";
import style from "../../App.module.css";

type CheckboxProps = {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
};

const Checkbox = ({
  checked = false,
  onChange,
  disabled = false,
  children,
  className = style.customCheckbox,
}: CheckboxProps) => {
  return (
    <label className={className}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {children && <span>{children}</span>}
    </label>
  );
};

export default Checkbox;
