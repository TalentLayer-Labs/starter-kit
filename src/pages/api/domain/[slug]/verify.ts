import { NextResponse } from 'next/server';
import {
  getDomainResponse,
  getConfigResponse,
  verifyDomain,
} from '../../../../modules/BuilderPlace/domains';
import { DomainVerificationStatusProps } from '../../../../modules/BuilderPlace/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { slug: domain } = req.query;

  let status: DomainVerificationStatusProps = DomainVerificationStatusProps.Valid;

  const [domainJson, configJson] = await Promise.all([
    getDomainResponse(domain as string),
    getConfigResponse(domain as string),
  ]);

  if (domainJson?.error?.code === 'not_found') {
    // domain not found on Vercel project
    status = DomainVerificationStatusProps.NotFound;

    // unknown error
  } else if (domainJson.error) {
    status = DomainVerificationStatusProps.Error;

    // if domain is not verified, we try to verify now
  } else if (!domainJson.verified) {
    status = DomainVerificationStatusProps.Pending;
    const verificationJson = await verifyDomain(domain as string);

    // domain was just verified
    if (verificationJson && verificationJson.verified) {
      status = DomainVerificationStatusProps.Valid;
    }
  } else if (configJson.misconfigured) {
    status = DomainVerificationStatusProps.Invalid;
  } else {
    status = DomainVerificationStatusProps.Valid;
  }

  return res.json({
    status,
    domainJson,
  });
}
