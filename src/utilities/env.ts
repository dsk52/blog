const NODE_ENV = process.env.NODE_ENV || "";

export const isProduction: boolean = NODE_ENV === "production";
