export const upload = async (file: FormData): Promise<any> => {
  try {
    return await fetch('/api/domain/upload', {
      method: 'POST',
      body: file,
      headers: {
        'Content-type': 'multipart/form-data',
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
