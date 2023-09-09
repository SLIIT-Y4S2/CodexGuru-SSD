import OpenAI from "openai";
import APIKEYS from "../CONSTANTS/APIKeys.js";

const openAiApiHandler = async (messages) => {
    const openai = new OpenAI({
        apiKey: APIKEYS.OPENAI_API_KEY,
    });

    const chatCompletion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
    });

    console.log(await chatCompletion);
    return chatCompletion;
}



export { openAiApiHandler };