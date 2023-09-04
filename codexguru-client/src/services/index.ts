import { TestServices } from "./test.service";

export const testService = (token: string) =>
  new TestServices("//localhost:5000/api", token);
