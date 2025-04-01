export type TUser = {
  email: string;
  firstName: string;
  lastName: string;
};

export type AuthUser = {
  username: string;
  password: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  data?: AuthUser;
  success?: boolean;
};
