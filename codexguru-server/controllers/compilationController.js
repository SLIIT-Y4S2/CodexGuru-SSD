import axios, { HttpStatusCode } from "axios";
import PATHS from "../CONSTANTS/Paths.js";

/**
 * @description This function is used to get the compiled output from judege0 api and send it to the client
 * @param {Request} req
 * @param {Response} res
 */
const getCompiledOutput = async (req, res) => {
    const { source_code, language_id, stdin } = req.body;

    //* post request to judge0 api to get the token
    axios
        .post(PATHS.COMPILER_POST_PATH,
            { source_code, language_id, stdin }
        )
        .then((resp) => {
            //TODO change the time to 2 seconds and loop if the status is  processing
            //* wait for 1 second to get the compiled output
            setTimeout(async () => {
                //* get request to judge0 api to get the compiled outputs
                axios
                    .get(`${PATHS.COMPILER_GET_PATH}/${resp.data.token}?base64_encoded=true`)
                    .then((resp) => {
                        console.log(resp.data);
                        //* send the compiled output to the client
                        return res
                            .status(HttpStatusCode.Created)
                            .send(resp.data);
                    });
            }, 5000)
        })
        .catch((err) => {
            if (err instanceof Error) {
                console.log(err)
                return res.status(HttpStatusCode.InternalServerError).send(err.message);
            }
            else {
                return res.status(HttpStatusCode.InternalServerError).send(`An unknown error occured. : \n${err.message}}`);
            }
        });
}

export { getCompiledOutput };