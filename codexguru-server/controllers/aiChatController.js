import { HttpStatusCode } from "axios";
import { openAiApiHandler } from "../config/openAI.util.js";
import Common from "../CONSTANTS/COMMON.js";



const getAiChatResponse = async (req, res) => {

    //* get the messages from the request body
    const { messages } = req.body;

    //* check if the messages length is greater than 0 and not null
    if (messages && messages.length > 0) {
        //* create a message list with the system prompt
        const messageList = [{ role: "system", content: Common.SYSTEM_PROMPT }];

        //* push the messages to the message list
        messages[0].map((message) => {

            if (message.isUser === true) {
                messageList.push({ role: "user", content: message.text });
            }
            else {
                messageList.push({ role: "assistant", content: message.text });
            }
        });

        const responseFromOpenAi = await openAiApiHandler(messageList);

        // messageList.push({ role: "assistant", content: responseFromOpenAi.choices[0].message.content });

        const responseFromServer = {
            currentTime: new Date().toISOString(),
            isUser: false,
            text: responseFromOpenAi.choices[0].message.content,
        }

        return res.status(HttpStatusCode.Created).send(responseFromServer);
    }
    else {
        return res.status(HttpStatusCode.BadRequest).send("Invalid Request");
    }

};


export { getAiChatResponse };