import { UserType } from "./src/services/protectRoute";

declare global {
    namespace Express {
        interface Response {
            user?: UserType
        }
    }
}