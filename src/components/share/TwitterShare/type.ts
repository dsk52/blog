import type { ShareLink } from "../type";

export type TwitterQueryParams = {
  text?: string;
  url: string;
};

export type TwitterShareProps = {
  title: string;
  hashtags?: String[];
} & ShareLink;
