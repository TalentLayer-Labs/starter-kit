import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import fs from 'fs';
import { UpdateBuilderPlaceDomain } from '../../../modules/BuilderPlace/types';
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const cloudflareToken = process.env.NEXT_CLOUDFLARE_TOKEN;

  if (cloudflareToken === undefined) {
    throw new Error('No cloudflare token defined');
  }
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end('Method Not Allowed');
  } else {
    const body: any = req.body;
    console.log('body', body);

    try {
      // Here, create a new FormData instance to send with the Axios request.
      // const formData = new FormData();
      // formData.append('file', fs.createReadStream(body));

      // Set up the headers, particularly for the "Authorization" and "Content-Type".
      // You may need to add your Bearer Token here for authorization.
      const headers = {
        Authorization: `Bearer ${cloudflareToken}`,
        'Content-type': 'multipart/form-data',
        // ...body.getHeaders(), // This helps set the boundary in the multipart form request.
      };

      // Make the POST request to Cloudflare's API with the image file.
      const cloudflareResponse = await axios.post(
        'https://api.cloudflare.com/client/v4/accounts/ff28f5398f74c7a36566ae9404174faf/images/v1',
        // body,
        { file: body },
        { headers: headers },
      );
      // console.log('cloudflareResponse', cloudflareResponse);

      // // Clean up the file stored in the temporary folder
      // fs.unlinkSync(file.path);

      // Return the Cloudflare response or whatever response you'd like to your client.
      res.statusCode = 200;
      res.json(cloudflareResponse.data);
    } catch (error) {
      console.error('Error uploading image to Cloudflare:', error);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }
}
