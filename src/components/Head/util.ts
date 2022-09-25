import { IndexType } from "./type";

export const generateIndexAttriubtes = (index: IndexType): string => {
  switch (index) {
    case "index":
      return "index, follow";

    case "noindex":
    default:
      return "noindex";
  }
};
