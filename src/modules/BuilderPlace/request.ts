import { JobType } from '../../types';
import axios from 'axios';

export const createOrganization = async (
  name: string,
  about: string,
  jobType: JobType,
  imageUrl: string,
): Promise<any> => {
  try {
    return await axios.post('/api/domain/create-organization', {
      name,
      about,
      jobType,
      imageUrl,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
