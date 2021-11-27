const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
const EMAIL_DATA = 'email';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const getEmail = (): string => {
  const email = localStorage.getItem(EMAIL_DATA);
  return email ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const saveEmail = (email: string): void => {
  localStorage.setItem(EMAIL_DATA, email);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export const dropEmail = (): void => {
  localStorage.removeItem(EMAIL_DATA);
};
