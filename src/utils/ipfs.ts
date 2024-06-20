/* eslint-disable no-console */
import { create, IPFSHTTPClient } from 'ipfs-http-client';

export const postToIPFS = async (data: any): Promise<string> => {
  let ipfs: IPFSHTTPClient | undefined;
  let cid = '';
  try {
    const authorization =
      'Basic ' +
      Buffer.from(
        process.env.NEXT_PUBLIC_INFURA_ID + ':' + process.env.NEXT_PUBLIC_INFURA_SECRET,
      ).toString('base64');
    ipfs = create({
      url: process.env.NEXT_PUBLIC_IPFS_WRITE_URL,
      headers: {
        authorization,
      },
    });
    const result = await (ipfs as IPFSHTTPClient).add(data);
    cid = `${result.path}`;
  } catch (error) {
    console.error('IPFS error ', error);
  }
  return cid;
};

export const IpfsIsSynced = async (cid: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    const interval = setInterval(async () => {
      const response = await fetch(cid);
      if (response.status === 200) {
        clearInterval(interval);
        resolve(true);
      }
    }, 5000);
  });
};


/* eslint-disable no-console */
import { create, IPFSHTTPClient } from 'ipfs-http-client';

export const postToIPFSwithInfura = async (data: any): Promise<string> => {
  let ipfs: IPFSHTTPClient | undefined;
  let cid = '';
  try {
    const authorization =
      'Basic ' +
      Buffer.from(
        process.env.NEXT_PUBLIC_INFURA_ID + ':' + process.env.NEXT_PUBLIC_INFURA_SECRET,
      ).toString('base64');
    ipfs = create({
      url: process.env.NEXT_PUBLIC_IPFS_WRITE_URL,
      headers: {
        authorization,
      },
    });
    const result = await (ipfs as IPFSHTTPClient).add(data);
    cid = `${result.path}`;
  } catch (error) {
    console.error('IPFS error ', error);
  }
  return cid;
};

export const IpfsIsSynced = async (cid: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    const interval = setInterval(async () => {
      const response = await fetch(cid);
      if (response.status === 200) {
        clearInterval(interval);
        resolve(true);
      }
    }, 5000);
  });
};

export const postToIPFSwithQuickNode = async (data: string): Promise<string> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('x-api-key', process.env.NEXT_PUBLIC_IPFS_SECRET as unknown as string);

    const formdata = new FormData();
    formdata.append('Body', new Blob([data], { type: 'application/json' }));
    formdata.append('Key', 'metadata');
    formdata.append('ContentType', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    const response = await fetch(
      'https://api.quicknode.com/ipfs/rest/v1/s3/put-object',
      // @ts-ignore
      requestOptions,
    );
    const result: { pin?: { cid?: string } } = await response.json();

    console.log(result);

    if (!result.pin?.cid) throw new Error('Error while uploading to IPFS - no cid returned');

    return result.pin.cid;
  } catch (error: any) {
    console.error('IPFS error ', error);
    throw new Error('Error while uploading to IPFS', error);
  }
};
