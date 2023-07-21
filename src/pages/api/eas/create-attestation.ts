import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { getDelegationSigner } from '../utils/delegate';
import { CUSTOM_SCHEMAS, EASContractAddress, getAttestation } from '../utils/eas-utils';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
const eas = new EAS(EASContractAddress);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { githubHash } = req.body;

  try {
    const schemaEncoder = new SchemaEncoder('string githubHash');
    const encoded = schemaEncoder.encodeData([{ name: 'name', type: 'string', value: githubHash }]);
    const signer = await getDelegationSigner(res);
    if (!signer) {
      return;
    }
    eas.connect(signer);

    const recipient = '0x1caAb8ded4535bF42728feA90aFa7da1ac637E1E';

    const tx = await eas.attest({
      data: {
        recipient: recipient,
        data: encoded,
        refUID: ethers.constants.HashZero,
        revocable: true,
        expirationTime: 0,
      },
      schema: CUSTOM_SCHEMAS.GITHUB_SCHEMA,
    });
    console.log('tx', tx);

    const uid = await tx.wait();
    console.log('uid', uid);

    const attestation = await getAttestation(uid);
    console.log('attestation', attestation);

    res.status(200).json({ transaction: signer });
  } catch (error) {
    console.error('errorDebug', error);
    res.status(500).json('certificate creation failed');
  }
}
