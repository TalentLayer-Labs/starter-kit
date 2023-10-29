import axios from 'axios';
import FormData from 'form-data';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const cloudflareToken = process.env.NEXT_CLOUDFLARE_TOKEN;
  const { fileName } = req.query;
  if (fileName) console.log('Specified file name:', fileName);

  if (cloudflareToken === undefined) {
    throw new Error('No cloudflare token defined');
  }

  const form = new IncomingForm();

  let fields;
  let files;
  try {
    [fields, files] = await form.parse(req);
  } catch (err: any) {
    console.error(err);
    res.status(err.httpCode || 400).end(String(err));
    return;
  }

  if (!files?.file || !files.file[0]) {
    res.status(400).end('No file uploaded');
    return;
  }

  try {
    const file = files.file[0];
    const formData = new FormData();
    const fileStream = fs.createReadStream(file.filepath);
    fileStream.on('error', function (error) {
      throw new Error('fileStream Error', error);
    });
    formData.append('file', fileStream, fileName as string);
    const headers = {
      Authorization: `Bearer ${cloudflareToken}`,
      ...formData.getHeaders(),
    };

    const cloudflareResponse = await axios.post(
      'https://api.cloudflare.com/client/v4/accounts/ff28f5398f74c7a36566ae9404174faf/images/v1',
      formData,
      { headers: headers },
    );

    fs.unlinkSync(file.filepath);
    res.statusCode = 200;
    console.log({ cloudflareResponse: cloudflareResponse.data.result });
    res.status(200).json({ image: cloudflareResponse.data.result });
  } catch (error) {
    console.error('Error uploading image to Cloudflare:', error);
    res.status(500).end('Error uploading image to Cloudflare');
  }
}
