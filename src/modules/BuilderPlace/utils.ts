import { ImageType } from './types';
import { Dispatch, SetStateAction } from 'react';
import { upload } from './request';

const IMG_LIMIT_SIZE = 10000000;
export function generateSubdomainPrefix(name: string): string {
  // Remove any non-alphanumeric characters and replace spaces with hyphens
  const alphanumericName = name
    .trim() // trim leading or trailing whitespace
    .replace(/[^a-zA-Z0-9\- ]/g, '')
    .replace(/\s+/g, '-');
  // Convert to lowercase and truncate to 63 characters (the maximum length for a subdomain)
  return alphanumericName.toLowerCase().substring(0, 63);
}

export function getDomainPrefix(domain: string, apexName: string): React.ReactNode {
  return domain.slice(0, domain.length - apexName.length - 1);
}

export const generateDomainName = (name: string) => {
  const subdomainPrefix = generateSubdomainPrefix(name);
  return `${subdomainPrefix}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
};

export const slugify = (str: string | undefined) => {
  if (!str) return '';
  console.log('slugify', { str });
  let string = String(str)
    .trim() // trim leading or trailing whitespace
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens

  while (string.startsWith('-') || string.startsWith('_')) {
    string = string.slice(1);
  }

  return string;
};

export const getImgExtension = (fileType: string): string | undefined => {
  switch (fileType) {
    case ImageType.JPG:
      return '.jpg';
    case ImageType.PNG:
      return '.png';
    case ImageType.SVG:
      return '.svg';
  }
};

export const isImgFormatValid = (file: File): boolean => {
  return (
    (file.type === ImageType.JPG || file.type === ImageType.PNG || file.type === ImageType.SVG) &&
    file.size <= IMG_LIMIT_SIZE
  );
};

export const uploadImage = async (
  file: File,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
  serErrorMessage: Dispatch<SetStateAction<string>>,
  fieldName: string,
  setLoader: Dispatch<SetStateAction<boolean>>,
  handle?: string,
) => {
  if (!file) {
    return;
  }

  setLoader(true);
  serErrorMessage('');
  if (!isImgFormatValid(file)) {
    setLoader(false);
    setFieldValue(fieldName, undefined);
    serErrorMessage(
      `Invalid image format - Please use ${
        fieldName === 'cover' ? 'jpg or png' : 'svg or png'
      } format and a size of 10mB max.`,
    );
    return;
  }
  const fileExtension = getImgExtension(file.type);
  const fileName = handle ? `${fieldName}-${handle}${fileExtension}` : '';
  const profilePictureUrl = await upload(file, fileName);
  console.log({ logo: profilePictureUrl, url: profilePictureUrl?.variants[0] });
  setFieldValue(fieldName, profilePictureUrl?.variants[0]);
  setLoader(false);
};
