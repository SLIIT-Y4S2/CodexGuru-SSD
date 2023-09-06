import { HttpStatusCode } from "axios";
import { openAiApiHandler } from "../config/openAI.util.js";
import Common from "../CONSTANTS/COMMON.js";



const getAiChatResponse = async (req, res) => {

    const { isUser, text } = req.body;
    console.log("isUser", isUser);
    console.log("text", text);

    if (isUser !== undefined && text !== undefined && isUser !== null && text !== null && text.trim() !== "") {
        console.log("if _true");
        const messages = [{ role: "system", content: Common.SYSTEM_PROMPT }];

        if (isUser === true) {
            messages.push({ role: "user", content: text });
        }
        else {
            messages.push({ role: "assistant", content: text });
        }

        const responseFromOpenAi = await openAiApiHandler(messages);

        messages.push({ role: "assistant", content: responseFromOpenAi.choices[0].message.content });

        const responseFromServer = {
            currentTime: new Date().toISOString(),
            message: responseFromOpenAi.choices[0].message.content,
        }

        return res.status(HttpStatusCode.Created).send(responseFromServer);
    }
    else {
        return res.status(HttpStatusCode.BadRequest).send("Invalid Request");
    }

};


export { getAiChatResponse };