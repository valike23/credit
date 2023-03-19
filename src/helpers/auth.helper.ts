
import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { unAuthorizedResponse } from "./http.response.helpers";




// A middleware function to verify the token sent by the client
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token not found",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    req["user"] = decodedToken;
    next();
  } catch (error) {
    return unAuthorizedResponse(error,"Invalid token", res)
   
  }
};

// A middleware function to generate a token when the user logs in or signs up
export const generateToken = (user: any) : string=> {
  const token: string = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );
  return token;
};