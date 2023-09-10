import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class ForumServices {
  protected readonly instance: AxiosInstance;
  protected readonly headerObj: AxiosRequestConfig;
  public constructor(url: string, token: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
    this.headerObj = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  //get all questions
  getForum = (labId: string) =>
    this.instance
      .get(`/forum/${labId}`, this.headerObj)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(err.message);
      });

  // create question
  addQuestion = (
    labId: string,
    data: {
      title: string;
      description: string;
    }
  ) =>
    this.instance
      .post(`/forum/${labId}/addQuestion`, data, this.headerObj)
      .then((res) => {
        return res.data;
      });

  // create answer
  postAnswer = (questionId: string, data: any) =>
    this.instance
      .post(`/forum/questions/${questionId}/addAnswer`, data, this.headerObj)
      .then((res) => {
        return res.data;
      });
  deleteQuestion = (id: string) =>
    this.instance
      .delete(`/forum/questions/${id}/deleteQuestion`, this.headerObj)
      .then((res) => {
        return res.data;
      });
  deleteAnswer = (id: string, answerId: string) =>
    this.instance.delete(
      `/forum/questions/${id}/answers/${answerId}`,
      this.headerObj
    );
  updateQuestion = (id: string, data: any) =>
    this.instance
      .put(`/forum/questions/${id}/updateQuestion`, data, this.headerObj)
      .then((res) => {
        return res.data;
      });
  updateAnswer = (answerId: string, data: any) =>
    this.instance
      .put(`/forum/answers/${answerId}/updateAnswer`, data, this.headerObj)
      .then((res) => {
        return res.data;
      });

  approveAnswer = (answerId: string, markedAsSolution: boolean) =>
    this.instance
      .put(
        `/forum/answers/${answerId}/approveAnswer`,
        { markedAsSolution },
        this.headerObj
      )
      .then((res) => {
        return res.data;
      });
}
