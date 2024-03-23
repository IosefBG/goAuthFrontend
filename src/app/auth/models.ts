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
}

export interface UserLoginRequest {
  identifier: string,//username or email
  password: string,
}

export interface SessionsResponse {
  id: number,
  ip_address: string,
  created_at: Date,
  updated_at: Date,
}
