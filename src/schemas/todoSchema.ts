import * as yup from "yup";
import regex from "../constants/regex";

const todoSchema = yup.object({
    todoText: yup
        .string()
        .required("Todoは必須です")
        .max(20, "20文字以内にしてください")
        .min(1, "1文字以上入力してください")
        .matches(regex, {message:"使用できない文字が含まれています"}),
})

export default todoSchema;