import { NextApiRequest, NextApiResponse } from 'next'

import { saveChangelog } from '../../lib/notion'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body)

  switch (req.method) {
    case 'POST':
      saveChangelog({
        problem: body.problem,
        benefits: '',
        solution: '',
        launchStrategy: '',
        kudos: '',
        prs: {},
        taskLink: '',
        type: body.type,
        title: body.title,
      })

      res.status(200).json({ status: 'ok' })
    default:
      res.status(404)
  }
}
