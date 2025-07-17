import style from "../App.module.css";
import type { NameError } from "../types/GameTypes";

type ErrorMessageProps = {
  nameError: NameError;
};

const ErrorMessages = ({ nameError }: ErrorMessageProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className={style.error}>
        {nameError.firstPlayerName.map((message, index) => (
          <p className={style.errortext} key={index}>
            {message}
          </p>
        ))}
        {nameError.secondPlayerName.map((message, index) => (
          <p className={style.errortext} key={index}>
            {message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ErrorMessages;
