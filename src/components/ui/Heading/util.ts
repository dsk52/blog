import type { HeadingProps } from "@/components/ui/Heading/type";

export const headingClasses = (tag: HeadingProps["as"]) => {
  switch (tag) {
    case "h1":
      return "tw-text-4xl tw-leading-loose";

    case "h2":
      return "tw-text-2xl tw-leading-relaxed";

    default:
      return "tw-text-lg tw-leading";
  }
};
