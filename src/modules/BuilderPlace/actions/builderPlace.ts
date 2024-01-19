import { EntityStatus } from '.prisma/client';
import {
  COLLABORATOR_NOT_FOUND,
  DOMAIN_CONTAINS_BUILDER_PLACE,
  ERROR_ADDING_COLLABORATOR,
  ERROR_CREATING_BUILDERPLACE,
  ERROR_DELETING_BUILDERPLACE,
  ERROR_FETCHING_BUILDERPLACE,
  ERROR_REMOVING_BUILDERPLACE_OWNER,
  ERROR_REMOVING_BUILDERPLACE_SUBDOMAIN,
  ERROR_SETTING_BUILDERPLACE_OWNER,
  ERROR_UPDATING_BUILDERPLACE,
  ERROR_UPDATING_DOMAIN,
  ERROR_VALIDATING_BUILDERPLACE,
  INVALID_CUSTOM_DOMAIN,
  USER_PROFILE_NOT_VERIFIED,
} from '../apiResponses';
import {
  AddBuilderPlaceCollaborator,
  CreateBuilderPlaceAction,
  RemoveBuilderPlaceCollaborator,
  RemoveBuilderPlaceOwner,
  SetBuilderPlaceOwner,
  UpdateBuilderPlace,
  UpdateBuilderPlaceDomain,
} from '../types';
import {
  addDomainToVercel,
  getApexDomain,
  removeDomainFromVercelProject,
  removeDomainFromVercelTeam,
  validDomainRegex,
} from '../domains';
import prisma from '../../../postgre/postgreClient';

/**
 * @dev: Only this function can set the BuilderPlace status to VALIDATED
 * @param builderPlaceId
 */
export const validateBuilderPlace = async (builderPlaceId: string) => {
  let errorMessage;
  try {
    await prisma.builderPlace.update({
      where: {
        id: Number(builderPlaceId),
      },
      data: {
        status: EntityStatus.VALIDATED,
      },
    });
    return {
      message: 'BuilderPlace validated successfully',
      id: builderPlaceId,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_VALIDATING_BUILDERPLACE;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const removeBuilderPlaceOwner = async (data: RemoveBuilderPlaceOwner) => {
  let errorMessage;
  try {
    console.log('Removing owner from pending domain:', data.id);
    await prisma.builderPlace.update({
      where: {
        id: Number(data.id),
      },
      data: {
        ownerId: null,
        collaborators: {
          disconnect: [{ id: Number(data.ownerId) }],
        },
      },
    });
    return {
      message: 'BuilderPlace owner removed successfully',
      id: data.ownerId,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_REMOVING_BUILDERPLACE_OWNER;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const removeBuilderSubdomain = async (builderPlaceId: number) => {
  let errorMessage;
  try {
    console.log('Removing subdomain from pending BuilderPlace:', builderPlaceId);
    await prisma.builderPlace.update({
      where: {
        id: builderPlaceId,
      },
      data: {
        subdomain: null,
      },
    });
    return {
      message: 'BuilderPlace subdomain removed successfully',
      id: builderPlaceId,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_REMOVING_BUILDERPLACE_SUBDOMAIN;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const setBuilderPlaceOwner = async (data: SetBuilderPlaceOwner) => {
  let errorMessage;
  try {
    await prisma.builderPlace.update({
      where: {
        id: Number(data.id),
      },
      data: {
        ownerId: Number(data.ownerId),
        collaborators: {
          set: { id: Number(data.ownerId) },
        },
      },
    });
    return {
      message: 'BuilderPlace owner set successfully',
      id: data.ownerId,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_SETTING_BUILDERPLACE_OWNER;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

// TODO! createBuilderPlace, can be used for the onboarding workflow maybe for the creating the subdomain & deleteBuilderPlace
export const updateDomain = async (builderPlace: UpdateBuilderPlaceDomain) => {
  let errorMessage;
  try {
    console.log('Update Domain invoke, ', builderPlace);
    let response;

    if (builderPlace.customDomain.includes('builder.place')) {
      console.log(DOMAIN_CONTAINS_BUILDER_PLACE);
      throw new Error(DOMAIN_CONTAINS_BUILDER_PLACE);

      // if the custom domain is valid, we need to store it and add it to Vercel
    } else if (validDomainRegex.test(builderPlace.customDomain!)) {
      console.log(INVALID_CUSTOM_DOMAIN);
      console.log('Searching subdomain, ', builderPlace.subdomain);
      const updatedEntity = await prisma.builderPlace.update({
        where: {
          subdomain: builderPlace.subdomain,
        },
        data: {
          customDomain: builderPlace.customDomain,
        },
      });
      console.log('Updated entity with custom domain: ', updatedEntity.customDomain);

      // Add the custom domain to Vercel
      console.log('Adding domain to vercel');

      await addDomainToVercel(builderPlace.customDomain!);

      // null means remove the custom domain
    } else if (builderPlace.customDomain! === '') {
      // Remove the custom domain from the entity
      console.log('Removing custom domain');
      await prisma.builderPlace.updateMany({
        where: {
          subdomain: builderPlace.subdomain,
        },
        data: {
          customDomain: '',
        },
      });
    }

    // Get the current custom domain from the MongoDB document
    const currentBuilderPlace = await prisma.builderPlace.findFirst({
      where: {
        subdomain: builderPlace.subdomain,
      },
    });

    const currentDomain = currentBuilderPlace?.customDomain || '';

    // If the site had a different customDomain before, we need to remove it from Vercel
    if (builderPlace.customDomain !== currentDomain) {
      response = await removeDomainFromVercelProject(builderPlace.customDomain!);

      //TODO Prisma: check if this works => No Regex in Prisma
      // Check if the apex domain is being used by other sites
      const apexDomain = getApexDomain(`https://${builderPlace.customDomain}`);
      const domainsWithApexDomain = await prisma.builderPlace.findMany({
        where: {
          customDomain: {
            endsWith: `.${apexDomain}`,
          },
        },
      });

      const domainCount = domainsWithApexDomain.length;

      // we should only remove it from our Vercel project
      if (domainCount >= 1) {
        await removeDomainFromVercelProject(builderPlace.customDomain!);
      } else {
        // this is the only site using this apex domain
        // so we can remove it entirely from our Vercel team
        await removeDomainFromVercelTeam(builderPlace.customDomain!);
      }
    }

    return response;
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_UPDATING_DOMAIN;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const getBuilderPlaceByOwnerTlIdAndId = async (ownerTalentLayerId: string, id: string) => {
  let errorMessage;
  try {
    console.log("getting builderPlace with owner's TlId & postgres id:", ownerTalentLayerId, id);
    const builderPlaceSubdomain = await prisma.builderPlace.findFirst({
      where: {
        AND: [{ owner: { talentLayerId: ownerTalentLayerId } }, { id: Number(id) }],
      },
      include: {
        owner: true,
        collaborators: true,
      },
    });
    console.log('fetched builderPlace, ', builderPlaceSubdomain);
    if (builderPlaceSubdomain) {
      return builderPlaceSubdomain;
    }

    return null;
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_FETCHING_BUILDERPLACE;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const getBuilderPlaceByCollaboratorAddressAndId = async (
  address: string,
  builderPlaceId: string,
) => {
  let errorMessage;
  try {
    console.log('getting builderPlace with admin address & id:', address, builderPlaceId);
    const builderPlaceSubdomain = await prisma.builderPlace.findFirst({
      where: {
        id: Number(builderPlaceId),
        collaborators: {
          some: {
            address: address.toLocaleLowerCase(),
          },
        },
      },
    });

    console.log('fetched builderPlace, ', builderPlaceSubdomain);
    if (builderPlaceSubdomain) {
      return builderPlaceSubdomain;
    }

    return null;
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_FETCHING_BUILDERPLACE;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const getBuilderPlaceByOwnerTalentLayerId = async (id: string) => {
  let errorMessage;
  try {
    console.log("getting builderPlace with owner's id:", id);
    const builderPlaceSubdomain = await prisma.builderPlace.findFirst({
      where: {
        owner: {
          talentLayerId: id,
        },
      },
    });
    console.log('fetched builderPlace, ', builderPlaceSubdomain);
    if (builderPlaceSubdomain) {
      return builderPlaceSubdomain;
    }

    return null;
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_FETCHING_BUILDERPLACE;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const getBuilderPlaceByDomain = async (domain: string) => {
  let errorMessage;
  try {
    console.log('getting builderPlace ', domain);
    if (domain.includes(process.env.NEXT_PUBLIC_ROOT_DOMAIN as string)) {
      const builderPlace = await prisma.builderPlace.findFirst({
        where: {
          OR: [{ subdomain: domain }, { customDomain: domain }],
        },
        include: {
          owner: true,
          collaborators: true,
        },
      });

      console.log('fetched builderPlaces, ', builderPlace);

      return builderPlace;
    }
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_FETCHING_BUILDERPLACE;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const getBuilderPlaceById = async (id: string) => {
  let errorMessage;
  try {
    console.log('Getting builderPlace with id:', id);
    const builderPlaceSubdomain = await prisma.builderPlace.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        owner: true,
        collaborators: true,
      },
    });
    console.log('Fetched builderPlace, ', builderPlaceSubdomain);
    if (builderPlaceSubdomain) {
      return builderPlaceSubdomain;
    }
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_FETCHING_BUILDERPLACE;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const getBuilderPlaceByOwnerId = async (id: string) => {
  let errorMessage;
  try {
    console.log("getting builderPlace with owner's id:", id);
    const builderPlaceSubdomain = await prisma.builderPlace.findFirst({
      where: {
        owner: {
          id: Number(id),
        },
      },
      include: {
        owner: true,
        collaborators: true,
      },
    });
    console.log('fetched builderPlace, ', builderPlaceSubdomain);
    if (builderPlaceSubdomain) {
      return builderPlaceSubdomain;
    }

    return null;
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_FETCHING_BUILDERPLACE;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const getBuilderPlaceBySubdomain = async (subdomain: string) => {
  let errorMessage;
  try {
    console.log('getting builderPlace with subdomain:', subdomain);
    const builderPlaceSubdomain = await prisma.builderPlace.findFirst({
      where: {
        subdomain: subdomain,
      },
      // include: {
      //   owner: true,
      //   collaborators: true,
      // },
    });
    console.log('fetched builderPlace, ', builderPlaceSubdomain);
    if (builderPlaceSubdomain) {
      return builderPlaceSubdomain;
    }

    return null;
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_FETCHING_BUILDERPLACE;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const createBuilderPlace = async (data: CreateBuilderPlaceAction) => {
  let errorMessage;
  try {
    const newBuilderPlace = await prisma.builderPlace.create({
      data: {
        name: data.name,
        about: data.about,
        preferredWorkTypes: data.preferredWorkTypes,
        palette: { ...data.palette },
        profilePicture: data.profilePicture,
        status: EntityStatus.PENDING,
      },
    });

    return {
      message: 'BuilderPlace created successfully',
      id: newBuilderPlace.id,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_CREATING_BUILDERPLACE;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const removeBuilderPlaceCollaborator = async (body: RemoveBuilderPlaceCollaborator) => {
  console.log('Removing collaborator', body.collaboratorAddress);
  let errorMessage;
  try {
    const collaborator = await prisma.user.findUnique({
      where: {
        address: body.collaboratorAddress.toLocaleLowerCase(),
      },
    });

    if (!collaborator) {
      throw new Error('Collaborator not found');
    }

    await prisma.builderPlace.update({
      where: {
        id: Number(body.builderPlaceId),
      },
      data: {
        collaborators: {
          disconnect: [{ id: collaborator.id }],
        },
      },
    });
    console.log('Collaborator removed successfully', body.collaboratorAddress);
    return {
      message: 'Collaborator removed successfully',
      address: collaborator?.address?.toLocaleLowerCase(),
      id: collaborator.id,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_REMOVING_BUILDERPLACE_OWNER;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const addBuilderPlaceCollaborator = async (body: AddBuilderPlaceCollaborator) => {
  let errorMessage;
  try {
    const newCollaborator = await prisma.user.findUnique({
      where: {
        address: body.newCollaboratorAddress.toLocaleLowerCase(),
      },
    });

    if (!newCollaborator) {
      errorMessage = COLLABORATOR_NOT_FOUND;
      throw new Error(COLLABORATOR_NOT_FOUND);
    }

    if (newCollaborator?.status === EntityStatus.PENDING) {
      errorMessage = USER_PROFILE_NOT_VERIFIED;
      throw new Error(USER_PROFILE_NOT_VERIFIED);
    }

    await prisma.builderPlace.update({
      where: {
        id: Number(body.builderPlaceId),
      },
      data: {
        collaborators: {
          connect: [{ id: newCollaborator.id }],
        },
      },
    });

    console.log('Collaborator added successfully', body.newCollaboratorAddress);
    return {
      message: 'Collaborator added successfully',
      address: newCollaborator?.address?.toLocaleLowerCase(),
      id: newCollaborator.id,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_ADDING_COLLABORATOR;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const updateBuilderPlace = async (builderPlace: UpdateBuilderPlace) => {
  let errorMessage;
  try {
    const updatedBuilderPlace = await prisma.builderPlace.update({
      where: {
        id: Number(builderPlace.builderPlaceId),
      },
      data: {
        about: builderPlace.about,
        aboutTech: builderPlace.aboutTech,
        baseline: builderPlace.baseline,
        cover: builderPlace.cover,
        subdomain: builderPlace.subdomain,
        icon: builderPlace.icon,
        logo: builderPlace.logo,
        name: builderPlace.name,
        palette: { ...builderPlace.palette },
        preferredWorkTypes: builderPlace.preferredWorkTypes,
        presentation: builderPlace.presentation,
        profilePicture: builderPlace.profilePicture,
      },
    });
    return {
      message: 'BuilderPlace updated successfully',
      id: updatedBuilderPlace.id,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_UPDATING_BUILDERPLACE;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const deleteBuilderPlace = async (id: string) => {
  let errorMessage;
  try {
    const builderPlace = await prisma.builderPlace.delete({
      where: {
        id: Number(id),
      },
    });

    console.log(builderPlace, 'builderPlace deleted');
    return {
      message: 'BuilderPlace deleted successfully',
      id: builderPlace.id,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_DELETING_BUILDERPLACE;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};
