import style from "../App.module.css";

type ErrorMessageProps = {
  nameError: string[][];
};

const ErrorMessages = ({ nameError }: ErrorMessageProps) => {
  return (
    <div style = {{display: "flex", justifyContent: "center"}}>
    <div className={style.error}>
      {nameError.map((group, i) => (
        <div className={style.errortext} key={i}>
          {group.map((msg, j) => (
            <span key={j} className={style.errortext}>
              {msg}
            </span>
          ))}
        </div>
      ))}
    </div>
    </div>
  );
};

export default ErrorMessages;
