export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface SuccessResponse<T> extends BaseResponse {
  success: true;
  data: T;
}

export interface ErrorResponse extends BaseResponse {
  success: false;
  error: string;
}

export type ResponseWithPagination<T> = {
  data: T;
  limit: number;
  page: number;
  total: number;
  total_pages: number;
};
