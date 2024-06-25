/* eslint-disable no-console */
import axios from 'axios';
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

export const postToIPFSwithPinata = async (data: any): Promise<string> => {
  const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

  const pinJSONToIPFS = async (jsonData: any) => {
    const formData = new FormData();
    const blob = new Blob([jsonData], { type: 'application/json' });
    formData.append('file', blob, 'data.json');

    const pinataMetadata = JSON.stringify({
      name: 'JSON Data',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
      return res.data.IpfsHash;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const cid = await pinJSONToIPFS(data);
  await pinToTheGraph(data); // pin to the graph to request indexation 
  return cid;
};

export const pinToTheGraph = async (data: any): Promise<string> => {
  let ipfs: IPFSHTTPClient | undefined;
  let cid = "";
  try {
    ipfs = create({
      host: 'api.thegraph.com',
      port: 443,
      protocol: 'https',
      apiPath: '/ipfs/api/v0'
    });
    const result = await (ipfs as IPFSHTTPClient).add(data);
    cid = `${result.path}`;
  } catch (error) {
    console.error("IPFS error ", error);
  }
  return cid;
};