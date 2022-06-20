export enum HttpStatusCode {
  noContent = 204,
  unauthrized = 401
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
