import * as yup from "yup";
import regex from "../constants/regex";

const playerNameSchema = yup.object().shape({
    preName: yup.string()
    .required("名前は必須です。")
    .max(20, "20文字以内にしてください")
    .matches(regex, {message:"使用できない文字が含まれています"} ),
});

export default playerNameSchema