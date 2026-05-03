export interface User {
  id: string;
  email: string;
  username: string | null;
  password: string;
  readonly createdAt: Date;
}

export interface createUser {
  email: string;
  username?: string;
  password: string;
}

export interface getUser {
  readonly email: string;
  readonly username?: string;
  readonly password: string;
}
