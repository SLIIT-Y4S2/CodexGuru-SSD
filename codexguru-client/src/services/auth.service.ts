import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  login = (userRegNo: string, password: string) => {
    return this.instance
      .post("/login", {
        userRegNo,
        password,
      })
      .then((res) => {
        console.log(res.data);

        return {
          userRegNo: res.data.user.userRegNo,
          id: res.data.user.userId,
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          role: res.data.user.role,
          accessToken: res.data.token,
        };
      })
      .catch((err) => {
        throw err;
      });
  };

  // getMe = (userId: string) => {
  //   return this.instance
  //     .get(`/users/${userId}`, {
  //       headers: getAuthorizationHeader(),
  //     })
  //     .then((res) => {
  //       return res.data;
  //     });
  // };

  // uploadAvatar = (userId: string, newAvatar: File) => {
  //   const formData = new FormData();
  //   formData.append("file", newAvatar);
  //   return this.instance
  //     .post(`/users/${userId}/upload`, formData, {
  //       headers: getAuthorizationHeader(),
  //     })
  //     .then((res) => {
  //       return {
  //         newAvatar: res.data.data.url,
  //       };
  //     });
  // };
}
