import Word from "./Word";
import { marked } from "marked";
const wrapText = (text) => {
    return (text.split(/(\s+)/)
        .map((part, i) => /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>)
    );
};

export default wrapText;
