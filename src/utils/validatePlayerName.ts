import isValid from "./isValid";

const validatePlayerName = (name: string): string[] => {
    const error: string[] = [];
    if (
      name.trim() === "" ||
      name.trim().length > 10
    )
      error.push("プレイヤー名は1~10文字にしてください。");
    if (!isValid(name))
      error.push("特殊文字は使わないでください。");

    return error;
}

export default validatePlayerName;