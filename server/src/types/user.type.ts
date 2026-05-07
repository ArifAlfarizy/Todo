export interface User {
  id: string;
  email: string;
  username: string | null;
  password: string;
  readonly createdAt: Date;
}

export interface CreateUser {
  email: string;
  username?: string;
  password: string;
}

export interface GetUser {
  readonly email: string;
  readonly username?: string;
  readonly password: string;
}

export type UserPayload = {
  userId: string;
};

export type RegisterBody = {
  email: string;
  username?: string;
  password: string;
};

export type LoginBody = {
  email: string;
  password: string;
};
