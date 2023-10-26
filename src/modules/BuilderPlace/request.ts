export const upload = async (file: FormData): Promise<any> => {
  try {
    return await fetch('/api/domain/upload', {
      method: 'POST',
      body: file,
      headers: {
        'Content-type': 'application/octet-stream',
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getBuilderPlaceFromOwner = async (id: string): Promise<any> => {
  try {
    return await fetch('/api/domain/get-builder-place-from-owner', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
