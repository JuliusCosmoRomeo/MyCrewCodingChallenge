export const NAME = "name";
export const EMAIL = "email";
export const PASSWORD = "password";

export const NAME_ERRORS = {
  VALIDATION: "Name must consist of at least 6 letters"
};

export const EMAIL_ERRORS = {
  VALIDATION: "No valid email address",
  USER_DOES_NOT_EXIST: "There exists no user with this email address",
  USER_ALREADY_EXISTS: "User already exists"
};

export const PW_ERRORS = {
  VALIDATION: "Password must consist of at least 6 letters or numbers",
  WRONG_PW: "Wrong password"
};
