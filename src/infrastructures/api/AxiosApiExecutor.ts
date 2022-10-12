import { Axios, AxiosResponse } from "axios";
import {
  ApiExecutor,
  BadRequestError,
  ForbiddenError,
  HttpError,
  HttpMethod,
  NotFoundError,
} from "../../api/ApiExecutor";

export class AxiosApiExecutor implements ApiExecutor {
  constructor(private readonly axios: Axios) {}

  execute = async <Request, Response>(
    path: string,
    method: HttpMethod,
    data: Request
  ): Promise<Response> => {
    const response = await this.request(path, method, data);
    if (response.status < 300) {
      return response.data as Response;
    }
    switch (response.status) {
      case 400:
        throw new BadRequestError(path, method);
      case 403:
        throw new ForbiddenError(path, method);
      case 404:
        throw new NotFoundError(path, method);
      default:
        throw new HttpError(path, method, response.status);
    }
  };

  private request = async (
    path: string,
    method: HttpMethod,
    data?: any
  ): Promise<AxiosResponse> => {
    switch (method) {
      case "get":
        return this.axios.get(path, { params: data });
      case "post":
        return this.axios.post(path, data);
      case "put":
        return this.axios.put(path, data);
      case "delete":
        return this.axios.delete(path, { params: data });
    }
  };
}
