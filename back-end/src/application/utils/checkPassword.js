import bcrypt from 'bcryptjs';

const checkPassword = (password, password_hash) => {
  return bcrypt.compare(password, password_hash);
};

export default checkPassword;
