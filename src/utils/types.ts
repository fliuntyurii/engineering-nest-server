export type CreateUserType = {
  email: string;
  password: string;
  confirmPassword?: string;
  keyWord?: string;
}

export type SignInUserType = {
  email: string,
  password: string
}

export type CreateProjectType = {
  title: string,
  description: string,
  photos?: string[],
}