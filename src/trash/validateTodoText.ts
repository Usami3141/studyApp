import isValid from "./isValid";

const validateTodoText = (text: string): string[] => {
    const error: string[] = []

    if (text.trim() === ""|| text.trim().length > 30) error.push('入力は1~20文字にしてください。')
    if (!isValid(text)) error.push('特殊文字は使わないでください。')

    return error
}

export default validateTodoText;