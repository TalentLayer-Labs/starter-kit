import type { NextApiRequest, NextApiResponse } from 'next';
import { Leap } from '@leap-ai/sdk';

type ResponceData = {
  image: string;
};

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    prompt?: string;
  };
}

export default async function handler(
  req: GenerateNextApiRequest,
  res: NextApiResponse<ResponceData>,
) {
  const leap = new Leap(process.env.NEXT_PRIVATE_LEAPAI_API_KEY as string);
  leap.usePublicModel('future-diffusion');
  leap.useModel;

  // Generate Image
  const result = await leap.generate.generateImage({
    prompt: req.body.prompt || 'Future raccoon',
  });

  res.status(200).json({ image: result?.data?.images[0].uri || 'test' });
}
