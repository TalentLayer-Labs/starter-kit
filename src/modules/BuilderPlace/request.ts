export const upload = async (file: File, fileName?: string): Promise<any> => {
  console.log(file);
  try {
    let formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`/api/domain/upload${fileName ? `?fileName=${fileName}` : ''}`, {
      method: 'POST',
      body: formData,
    });
    return (await response.json()).image;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getBuilderPlaceFromOwner = async (talentLayerId: string): Promise<any> => {
  try {
    return await fetch('/api/domain/get-builder-place-from-owner', {
      method: 'POST',
      body: JSON.stringify({
        id: talentLayerId,
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

export const getBuilderPlaceById = async (id: string): Promise<any> => {
  try {
    return await fetch('/api/domain/get-builder-place-by-id', {
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

export const getWorkerProfileByOwnerId = async (id: string): Promise<any> => {
  try {
    return await fetch('/api/domain/get-worker-profile-by-owner-id', {
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

export const getWorkerProfileById = async (id: string): Promise<any> => {
  try {
    return await fetch('/api/domain/get-worker-profile-by-id', {
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

export const verifyEmail = async (email: string, userId: string): Promise<any> => {
  try {
    return await fetch('/api/domain/verify-email', {
      method: 'PUT',
      body: JSON.stringify({
        email: email,
        userId: userId,
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

export const sendVerificationEmail = async (
  to: string,
  userId: string,
  name: string,
  domain: string,
): Promise<any> => {
  try {
    return await fetch('/api/domain/send-verification-email', {
      method: 'POST',
      body: JSON.stringify({
        to: to,
        userId: userId,
        name: name,
        domain: domain,
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

export const verifyAccount = async (userId: string, signature: string): Promise<any> => {
  try {
    const response = await fetch('/api/domain/verify-account', {
      method: 'PUT',
      body: JSON.stringify({
        userId: userId,
        signature: signature,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUserByEmail = async (email: string): Promise<any> => {
  try {
    const response = await fetch('/api/domain/get-user-by-email', {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
