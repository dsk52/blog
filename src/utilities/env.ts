import { envVar } from "../constants/environment";

export const isProduction: boolean = envVar.APP_ENV === "production";
