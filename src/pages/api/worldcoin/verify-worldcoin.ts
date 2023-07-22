import type { NextApiRequest, NextApiResponse } from 'next';

export type Reply = {
  code: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Reply>) {
  const reqBody = {
    nullifier_hash: req.body.nullifier_hash,
    merkle_root: req.body.merkle_root,
    proof: req.body.proof,
    credential_type: req.body.credential_type,
    action: req.body.action,
    signal: req.body.signal,
  };

  const { userAddress } = req.body;

  fetch(`https://developer.worldcoin.org/api/v1/verify/${process.env.NEXT_PUBLIC_WLD_APP_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  }).then(async verifyRes => {
    const wldResponse = await verifyRes.json();

    if (verifyRes.status == 200) {
      // await supabase.from('users').upsert({ address: userAddress, verified: true });
      return res.status(200).send({ code: wldResponse.code });
    } else {
      return res.status(400).send({ code: wldResponse.code });
    }
  });
}
