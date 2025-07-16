import React from "react";
import style from "../../App.module.css";

type InputProps = {
    type?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

const Input : React.FC<InputProps> = ({
    type,
    value,
    onChange,
    placeholder,
    className = style.input,
}) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
        />
    );
};

export default Input;
