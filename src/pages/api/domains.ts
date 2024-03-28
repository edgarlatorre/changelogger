import { NextApiRequest, NextApiResponse } from 'next'
import domains from '../../resources/domains.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(domains)
    default:
      res.status(404)
  }
}
