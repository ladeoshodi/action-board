export interface ILoginApiResponse {
  message: string;
  token: string;
}

export interface IRegisterApiResponse {
  message: string;
}

export interface IApiErrorResponse {
  detail: string;
  email?: string[];
  username?: string[];
  first_name?: string[];
  last_name?: string[];
  password?: string[];
}
