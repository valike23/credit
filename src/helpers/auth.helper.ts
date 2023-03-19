
import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { unAuthorizedResponse } from "./http.response.helpers";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
  
    const token = authHeader.split(' ')[1];
  //using a faux token here
    if (token !== '1234567890') {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    next();
  }


// A middleware function to verify the token sent by the client
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
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
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );
  return token;
};