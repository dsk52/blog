import { ROUTE } from "@/constants/route"
import { getByContentId } from "@/libs/microcms"
import { NextApiRequest, NextApiResponse } from "next"

const preview = async (req: NextApiRequest, res: NextApiResponse) => {
    const { draftKey, slug } = req.query    
    if (typeof draftKey !== 'string' || typeof slug !== 'string') {
        res.status(404).end()
        return
    }

    const data = await getByContentId(slug, draftKey);
    if (!data) {
        return res.status(401).json({ message: 'Invalid slug' })
    }

    const contestId = data.contents.at(0)?.id ?? '-1'

    res.setPreviewData({
        slug: contestId,
        draftKey: req.query.draftKey,
    });
    res.writeHead(307, { Location: `${ROUTE.postDetail(contestId)}` })
    res.end('Preview mode enabled')
}

export default preview
