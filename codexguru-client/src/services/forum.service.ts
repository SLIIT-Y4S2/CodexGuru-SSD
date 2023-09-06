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
  getForum = (labId: string) =>
    this.instance.get(`/forum/${labId}`, this.headerObj).then((res) => {
      return res.data;
    });
  postQuestion = (data: any) =>
    this.instance.post(`/forum/questions`, data, this.headerObj).then((res) => {
      return res.data;
    });
  postAnswer = (id: string, data: any) =>
    this.instance
      .post(`/forum/questions/${id}/answers`, data, this.headerObj)
      .then((res) => {
        return res.data;
      });
  deleteQuestion = (id: string) =>
    this.instance
      .delete(`/forum/questions/${id}`, this.headerObj)
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
      .put(`/forum/questions/${id}`, data, this.headerObj)
      .then((res) => {
        return res.data;
      });
  updateAnswer = (id: string, answerId: string, data: any) =>
    this.instance
      .put(`/forum/questions/${id}/answers/${answerId}`, data, this.headerObj)
      .then((res) => {
        return res.data;
      });
}
