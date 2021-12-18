type appEnvs = "develop" | "production";

type ENV = {
  APP_ENV: appEnvs;

  MICROCMS_API_KEY?: string;
  MICROCMS_SERVICE_DOMAIN?: string;

  VERCEL_TOKEN?: string;
  PROJECT_ID?: string;
  ORG_ID?: string;

  NEXT_PUBLIC_GA_ID?: string;

  NEXT_PUBLIC_ADSENSE_CLIENT?: string;
  NEXT_PUBLIC_ADS_ARTICLE_TOP_SLOT?: number;
  NEXT_PUBLIC_ADS_ARTICLE_IN_SLOT?: number;
  NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT?: number;
};

type Config = Required<ENV>;

const appEnvCheck = (): appEnvs => {
  if (process.env.APP_ENV === "production") {
    return "production";
  }

  return "develop";
};

const getConfig = (): ENV => {
  return {
    APP_ENV: appEnvCheck(),

    MICROCMS_API_KEY: process.env.MICROCMS_API_KEY,
    MICROCMS_SERVICE_DOMAIN: process.env.MICROCMS_SERVICE_DOMAIN,

    VERCEL_TOKEN: process.env.VERCEL_TOKEN ?? "",
    PROJECT_ID: process.env.PROJECT_ID ?? "",
    ORG_ID: process.env.ORG_ID ?? "",

    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID ?? "",
    NEXT_PUBLIC_ADSENSE_CLIENT: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
    NEXT_PUBLIC_ADS_ARTICLE_TOP_SLOT: process.env
      .NEXT_PUBLIC_ADS_ARTICLE_TOP_SLOT
      ? Number(process.env.NEXT_PUBLIC_ADS_ARTICLE_TOP_SLOT)
      : 0,
    NEXT_PUBLIC_ADS_ARTICLE_IN_SLOT: process.env.NEXT_PUBLIC_ADS_ARTICLE_IN_SLOT
      ? Number(process.env.NEXT_PUBLIC_ADS_ARTICLE_IN_SLOT)
      : 0,
    NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT: process.env
      .NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT
      ? Number(process.env.NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT)
      : 0,
  };
};

const getEnv = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`undefined environment key: ${key}`);
    }
  }
  return config as Config;
};

const config = getConfig();

export const envVar = getEnv(config);
