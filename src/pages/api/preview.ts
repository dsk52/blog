import { getBySlug } from "../../libs/microcms";

import type { NextApiRequest, NextApiResponse } from "next";

const preview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { draftKey, slug } = req.query;

  // 型の解決のため別々でチェック
  if (typeof draftKey !== "string") {
    res.status(404).end();
    return;
  } else if (typeof slug !== "string") {
    res.status(404).end();
    return;
  }

  const data = await getBySlug(slug);
  if (!data.contents || !data.contents.length) {
    res.status(404).json({ message: "Invalid slug" });
  }

  res.setPreviewData({ ...data, draftKey });
  res.writeHead(307, { Location: `/post/${data.contents[0].id}` });
  res.end();
};

export default preview;
