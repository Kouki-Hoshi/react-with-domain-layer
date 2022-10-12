type HttpMethod = "get" | "post" | "put" | "delete";

interface ApiExecutor {
  execute<Request, Response>(
    path: string,
    method: HttpMethod,
    req: Request
  ): Promise<Response>;
}

class HttpError extends Error {
  constructor(path: string, method: HttpMethod, status: number) {
    super(`${method} ${path} が失敗しました(ステータス:${status})`);
  }
}
class BadRequestError extends HttpError {
  constructor(path: string, method: HttpMethod) {
    super(path, method, 400);
  }
}
class ForbiddenError extends HttpError {
  constructor(path: string, method: HttpMethod) {
    super(path, method, 403);
  }
}
class NotFoundError extends HttpError {
  constructor(path: string, method: HttpMethod) {
    super(path, method, 404);
  }
}

export {
  ApiExecutor,
  HttpMethod,
  HttpError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
};
