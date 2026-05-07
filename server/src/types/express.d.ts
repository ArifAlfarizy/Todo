import { UserPayload } from "./user.type";

declare global { // set to global
  namespace Express {
    interface Request {
      user?: UserPayload; // extends Request
      cookies: {
        token?: string;
        [key: string]: string | undefined;
      };
    }
  }
}

