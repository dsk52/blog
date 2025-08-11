import { type NextRequest, NextResponse } from "next/server";

import { ROUTE } from "@/constants/route";
import { getByContentIdAndDraftKey } from "@/libs/microcms";

export async function GET(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const draftKey = nextUrl.searchParams.get("draftKey");
  const slug = nextUrl.searchParams.get("slug");
  if (!draftKey || !slug) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const data = await getByContentIdAndDraftKey(slug, draftKey);
  if (!data) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const contestId = data.id ?? "-1";

  // ホワイトリスト方式でリダイレクト先を制限
  const allowedHosts = process.env.ALLOWED_PREVIEW_HOSTS?.split(",") || ["localhost:3000"];
  const requestHost = nextUrl.host;

  if (process.env.NODE_ENV === "production" && !allowedHosts.includes(requestHost)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${nextUrl.protocol}//${requestHost}`;
  const redirectUrl = new URL(ROUTE.postDetail(contestId), baseUrl);

  // draftKeyをURLパラメータとして追加
  redirectUrl.searchParams.set("draftKey", draftKey);

  return NextResponse.redirect(redirectUrl, 307);
}
