import { NextResponse } from 'next/server';
import {
  getDomainResponse,
  getConfigResponse,
  verifyDomain,
} from '../../../../modules/MultiDomain/domains';
import { DomainVerificationStatusProps } from '../../../../modules/MultiDomain/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSpaceByDomain } from '../../../../modules/MultiDomain/actions';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { slug: domain } = req.query

  const result = await getSpaceByDomain(domain);

  return res.json(result);
}
