import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import fs from 'fs';
import { UpdateBuilderPlaceDomain } from '../../../modules/BuilderPlace/types';
import formidable, { IncomingForm } from 'formidable';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const cloudflareToken = process.env.NEXT_CLOUDFLARE_TOKEN;

  if (cloudflareToken === undefined) {
    throw new Error('No cloudflare token defined');
  }

  // if (req.method !== 'POST') {
  //   res.statusCode = 405;
  //   res.end('Method Not Allowed');
  // }

  // const body: any = req.body;
  // console.log('body file', body);

  // const form1 = formidable({});
  // let fields;
  // let files;
  // try {
  //   [fields, files] = await form1.parse(req);
  //   console.log({ files, fields, string: JSON.stringify({ fields, files }, null, 2) });
  // } catch (err) {
  //   // example to check for a very specific error
  //   console.error(err);
  //   res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
  //   res.end(String(err));
  // }

  const form = new IncomingForm();
  console.log('IncomingForm', form);
  form.parse(req, async (err, fields, files) => {
    console.log('IncomingForm - parse callback');

    if (err) {
      res.statusCode = 500;
      res.end('Error parsing the file upload');
      return;
    }

    console.log('IncomingForm - parse success');

    // 'file' corresponds to the name attribute in your form
    const file = files.file[0];
    if (!file) {
      res.statusCode = 400;
      res.end('No file uploaded');
      return;
    }

    console.log('IncomingForm - prepare formData', files);
    console.log('IncomingForm - prepare formData 2', file);
    console.log('IncomingForm - prepare formData 3', file.filepath);

    try {
      // Here, create a new FormData instance to send with the Axios request.
      const formData = new FormData();
      const fileStream = fs.createReadStream(file.filepath);
      fileStream.on('error', function (err) {
        console.log('File Error', err);
      });
      formData.append('file', fileStream);
      // formData.append('file', file);

      // Set up the headers, particularly for the "Authorization" and "Content-Type".
      // You may need to add your Bearer Token here for authorization.
      const headers = {
        Authorization: `Bearer ${cloudflareToken}`, // Replace with your actual token
        ...formData.getHeaders(), // This helps set the boundary in the multipart form request.
      };

      // Make the POST request to Cloudflare's API with the image file.
      const cloudflareResponse = await axios.post(
        'https://api.cloudflare.com/client/v4/accounts/ff28f5398f74c7a36566ae9404174faf/images/v1',
        formData,
        { headers: headers },
      );

      // Clean up the file stored in the temporary folder
      fs.unlinkSync(file.filepath);

      // Return the Cloudflare response or whatever response you'd like to your client.
      res.statusCode = 200;
      res.json(cloudflareResponse.data);
    } catch (error) {
      console.error('Error uploading image to Cloudflare:', error);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });
}
