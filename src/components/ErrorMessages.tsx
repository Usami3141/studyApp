import style from "../App.module.css";

type Props = {
    errorName: string[][];
};

const ErrorMessages: React.FC<Props> = ({ errorName}: Props) => {
    return (
        <div className={style.error}>
          {errorName.map((group, i) => (
            <div key={i}>
              {group.map((msg, j) => (
                <span key={j} className={style.errortext}>
                  {msg}
                </span>
              ))}
            </div>
          ))}
        </div>
    )
}

export default ErrorMessages;