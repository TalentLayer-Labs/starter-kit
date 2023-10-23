import { JobType } from '../types';
import { Organization } from '../modules/MultiDomain/models/organization';

export const persistOrganization = async (
  name: string,
  about: string,
  jobType: JobType,
  imgUrl: string,
) => {
  const organization = await Organization.create({
    name: name,
    about: about,
    job_type: jobType,
    image_url: imgUrl,
  });
  organization.save();
};
