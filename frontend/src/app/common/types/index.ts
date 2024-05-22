import type { User } from "./user.type";

type SuccessResponse = {
  statusCode: number;
  message: string;
  data: any;
};

type ErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};

export { SuccessResponse, ErrorResponse, User };
