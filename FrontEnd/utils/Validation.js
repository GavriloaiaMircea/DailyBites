export const validateRegister = ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  const errors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

  if (!name.trim()) {
    errors.name = "Name is required!";
  }

  if (!email.trim() || !emailRegex.test(email)) {
    errors.email = "A valid email is required!";
  }

  if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be at least 6 characters long, include one uppercase letter and one number!";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match!";
  }

  return errors;
};

export const validateLogin = ({ email, password }) => {
  const errors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

  if (!email.trim() || !emailRegex.test(email)) {
    errors.email = "A valid email is required!";
  }

  if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be at least 6 characters long, include one uppercase letter and one number!";
  }

  return errors;
};
