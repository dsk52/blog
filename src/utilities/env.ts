const APP_ENV = process.env.APP_ENV || "";

export const isProduction: boolean = APP_ENV === "production";
