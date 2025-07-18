import style from "../../App.module.css";

type InputProps = {
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

const Input = ({
  type,
  value,
  onChange,
  disabled,
  placeholder,
  className = style.input,
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled} 
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
