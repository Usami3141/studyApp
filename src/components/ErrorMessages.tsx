import style from "../App.module.css";

type Props = {
    nameError: string[][];
};

const ErrorMessages: React.FC<Props> = ({ nameError }: Props) => {
    return (
        <div className={style.error}>
          {nameError.map((group, i) => (
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