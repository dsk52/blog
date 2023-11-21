import { ROUTE } from "@/constants/route"
import { getByContentIdAndDraftKey } from "@/libs/microcms"

import type { NextApiRequest, NextApiResponse } from "next"

const preview = async (req: NextApiRequest, res: NextApiResponse) => {
    const { draftKey, slug } = req.query;
    if (typeof draftKey !== 'string' || typeof slug !== 'string') {
        res.status(404).end()
        return
    }

    const data = await getByContentIdAndDraftKey(slug, draftKey);
    if (!data) {
        return res.status(401).json({ message: 'Invalid slug' })
    }

    const contestId = data.id ?? '-1'

    res.setPreviewData({
        slug: contestId,
        draftKey: req.query.draftKey,
    });
    res.writeHead(307, { Location: `${ROUTE.postDetail(contestId)}` })
    res.end('Preview mode enabled')
}

export default preview
