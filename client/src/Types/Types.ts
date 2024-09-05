export type errorReturnType = {
  message: string;
  status: number;
};

export type userReturnType = {
  token: string;
  user: {
    username: string;
    email: string;
    password: string;
    _id: string;
  };
};

export type userRegisterType = {
  username: string;
  password: string;
  email: string;
};
