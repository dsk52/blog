import { NextRequest, NextResponse } from "next/server";

import { ROUTE } from "@/constants/route";
import { getByContentIdAndDraftKey } from "@/libs/microcms";

export async function GET(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const draftKey = nextUrl.searchParams.get('draftKey');
  const slug = nextUrl.searchParams.get('slug');
  if (!draftKey || !slug) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }


  const data = await getByContentIdAndDraftKey(slug, draftKey);
  if (!data) {
    return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
  }

  const contestId = data.id ?? "-1";

  const response = NextResponse.redirect(`${ROUTE.postDetail(contestId)}`, 307);
  response.cookies.set('__previewData', JSON.stringify({
    slug: contestId,
    draftKey: draftKey,
  }));

  return response;
};

