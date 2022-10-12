import { ApiExecutor } from "./ApiExecutor";

export class Api {
  constructor(private readonly executor: ApiExecutor) {}

  login = (data: { email: string; password: string }): Promise<{}> => {
    return this.executor.execute(`/user/login`, "post", data);
  };

  changePassword = (data: { email: string }): Promise<{}> => {
    return this.executor.execute(`/user/email`, "post", data);
  };

  getLoginUser = (): Promise<{
    email: string;
    name: string;
    verifiedEmail: boolean;
  }> => {
    return this.executor.execute(`/user`, "get", undefined);
  };
}
