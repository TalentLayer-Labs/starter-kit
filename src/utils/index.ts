export const truncateAddress = (address: string, length = 3) => {
  return `${address.substring(0, length + 1)}...${address.substring(
    address.length - length,
    address.length,
  )}`;
};

export const isValidHttpsUrl = (path: string) => {
  let url;

  try {
    url = new URL(path);
  } catch (_) {
    return false;
  }

  return url.protocol === 'https:';
};

export const shortenString = (str: string, startLength: number, endLength: number) => {
  if (str.length <= startLength + endLength) {
    return str;
  }

  const start = str.slice(0, startLength);
  const end = str.slice(-endLength);

  return start + '...' + end;
};
