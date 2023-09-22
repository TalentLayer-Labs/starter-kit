import { NextResponse } from 'next/server';
import {
  getDomainResponse,
  getConfigResponse,
  verifyDomain,
} from '../../../../modules/MultiDomain/domains';
import { DomainVerificationStatusProps } from '../../../../modules/MultiDomain/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { slug: domain } = req.query 
  
  let status: DomainVerificationStatusProps = 'Valid Configuration';

  const [domainJson, configJson] = await Promise.all([
    getDomainResponse(domain as string),
    getConfigResponse(domain as string),
  ]);

  if (domainJson?.error?.code === 'not_found') {
    // domain not found on Vercel project
    status = 'Domain Not Found';

    // unknown error
  } else if (domainJson.error) {
    status = 'Unknown Error';

    // if domain is not verified, we try to verify now
  } else if (!domainJson.verified) {
    status = 'Pending Verification';
    const verificationJson = await verifyDomain(domain as string);

    // domain was just verified
    if (verificationJson && verificationJson.verified) {
      status = 'Valid Configuration';
    }
  } else if (configJson.misconfigured) {
    status = 'Invalid Configuration';
  } else {
    status = 'Valid Configuration';
  }

  return res.json({
    status,
    domainJson,
  });
}
