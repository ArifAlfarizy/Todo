import type { Todo } from "./todo.type.ts";
import { UserPayload } from "./user.type";

declare global {
  // set to global
  namespace Express {
    interface Request {
      user?: UserPayload; // extends Request
      todo?: Todo
    }
  }
}
