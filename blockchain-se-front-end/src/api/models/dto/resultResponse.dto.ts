export interface ResultResponse<T> {
  statusCode: number;
  message: string;
  payload: T
}