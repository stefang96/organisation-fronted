import jwt from "jsonwebtoken";

export default () => {
  const token = localStorage.getItem("token");

  return jwt.decode(token);
};
