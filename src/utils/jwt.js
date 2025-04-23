import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY; 

export const generarToken = (user) => {
  return jwt.sign(
    {
        id: user.id,
        id_rol:user.id_rol
    },
    SECRET_KEY,
    {
      expiresIn: "1h"
    }
  );
};
