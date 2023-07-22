import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { getDelegationSigner } from '../utils/delegate';
import { CUSTOM_SCHEMAS, EASContractAddress, getAttestation } from '../../../modules/Eas/utils/utils';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { getSHA256Hash } from '../utils/hash-data';
import axios from 'axios';
const eas = new EAS(EASContractAddress);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userAddress, accessToken, userId } = req.body;
  console.log('userAddress', userAddress);
  console.log('accessToken', accessToken);
  console.log('userId', userId);

  try {
    const response = await axios(`/api/worldcoin/verify-worldcoin`);

    const worldCoinData = {
      userAddress: userAddress,
      isUnique: true,
    };

    // Hash the data
    const hashedData = getSHA256Hash(worldCoinData);
    console.log('hashedData', hashedData);

    const schemaEncoder = new SchemaEncoder('string dataHash');
    console.log('schemaEncoder', schemaEncoder);

    const encoded = schemaEncoder.encodeData([
      { name: 'dataHash', type: 'string', value: hashedData },
    ]);

    const signer = await getDelegationSigner(res);
    if (!signer) {
      return;
    }
    console.log('signer', signer);

    eas.connect(signer);

    const recipient = userAddress;
    console.log('recipient', recipient);

    const tx = await eas.attest({
      data: {
        recipient: recipient,
        data: encoded,
        refUID: ethers.constants.HashZero,
        revocable: true,
        expirationTime: 0,
      },
      schema: CUSTOM_SCHEMAS.WORLDCOIN_SCHEMA,
    });
    console.log('tx', tx);

    const uid = await tx.wait();
    console.log('uid', uid);

    const attestation = await getAttestation(uid);
    console.log('attestation', attestation);

    res.status(200).json({ recipient: recipient, uid: 'uid', githubData: worldCoinData });
  } catch (error) {
    console.error('errorDebug', error);
    res.status(500).json('certificate creation failed');
  }
}
