export type ApiError = {
  data: any;
  message: string | string[];
};

export type ApiQuery<Result> = {
  data: Result | null;
  metadata: Record<string, any>;
};

export type ApiMutation<T> = {
  data: T | null;
  failed: boolean;
  error: {
    statusCode: number;
    errors: string[];
  } | null;
};
