import { authService } from "../../services";
import Cookies from "js-cookie";
import { User } from "../../types/user";

export const useLogin = () => {
  const login = async (userRegNo: string, password: string) => {
    try {
      const user = await authService.login(userRegNo, password);

      if (user) {
        Cookies.set("currentUser", JSON.stringify(user));
      }
      return user as User;
    } catch (error) {
      throw error;
    }
  };

  return { login };
};
