import {
  addDomainToVercel,
  getApexDomain,
  removeDomainFromVercelProject,
  removeDomainFromVercelTeam,
  validDomainRegex,
} from './domains';
import { CreateSpaceAction, Space } from './types';


export const createSpace = async (data: CreateSpaceAction) => {
  // TODO! add mongo code to create the space 
}


// TODO! createSpace, can be used for the onboarding workflow maybe for the creating the subdomain & deleteSpace
export interface UpdateSpaceDomain {
  id: number,
  customDomain: string
}
export const updateSpaceDomain = async (space: UpdateSpaceDomain) => {
  try {
    let response;

    if (space.customDomain.includes('builders.space')) {
      return {
        error: 'Cannot use builders.space subdomain as your custom domain',
      };

      // if the custom domain is valid, we need to store it and add it to Vercel
    } else if (validDomainRegex.test(space.customDomain!)) {
      // TODO: update mongodb document
      await addDomainToVercel(space.customDomain!);

      // null means remove the custom domain
    } else if (space.customDomain! === null) {
      // TODO: undefine entry in the mongodb document
    }
    // const currentDomain = // TODO! get current customDomain from mongo
    const currentDomain = "solarfund.wtf"
    // if the site had a different customDomain before, we need to remove it from Vercel
    if (space.customDomain !== currentDomain) {
      response = await removeDomainFromVercelProject(space.customDomain!);

      //  check if the apex domain is being used by other sites
      const apexDomain = getApexDomain(`https://${space.customDomain}`);
      // TODO! read documents with the customDomain === apexDomain and find all customDomain that ends on .apexDomain
      const domainCount = 1;

      // we should only remove it from our Vercel project
      if (domainCount >= 1) {
        await removeDomainFromVercelProject(space.customDomain!);
      } else {
        // this is the only site using this apex domain
        // so we can remove it entirely from our Vercel team
        await removeDomainFromVercelTeam(space.customDomain!);
      }
    }

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
