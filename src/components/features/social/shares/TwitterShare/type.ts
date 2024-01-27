import type { ShareLink } from "@/components/features/social/type";

export type TwitterQueryParams = {
  text?: string;
  url: string;
};

export type TwitterShareProps = {
  title: string;
  hashtags?: String[];
} & ShareLink;
