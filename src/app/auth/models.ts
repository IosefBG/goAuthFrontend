export interface UserRegisterRequest {
  username: string,
  password: string,
  email: string,
}

export interface User {
  id: number,
  username: string,
  email: string,
}

export interface AuthResponse {
  token: string;
  user: User;
  session: SessionsResponse,
}

export interface UserLoginRequest {
  identifier: string,//username or email
  password: string,
}

export interface SessionsResponse {
  id?: number,
  ip_address?: string,
  created_at?: Date,
  updated_at?: Date,
}

export interface UserData {
  token: string;
  user: User;
  session: SessionsResponse,
}
