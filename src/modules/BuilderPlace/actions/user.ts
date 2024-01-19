import { EntityStatus } from '.prisma/client';
import { NextApiResponse } from 'next';
import {
  ERROR_CREATING_HIRER_PROFILE,
  ERROR_CREATING_WORKER_PROFILE,
  ERROR_FETCHING_USER,
  ERROR_REMOVING_USER_OWNER,
  ERROR_SETTING_USER_OWNER,
  ERROR_UPDATING_HIRER_PROFILE,
  ERROR_UPDATING_USER_EMAIL,
  ERROR_UPDATING_WORKER_PROFILE,
  ERROR_VALIDATING_USER,
} from '../apiResponses';
import {
  CreateHirerProfileAction,
  CreateWorkerProfileAction,
  SetUserProfileOwner,
  UpdateHirerProfileAction,
  UpdateUserEmailAction,
  UpdateWorkerProfileAction,
} from '../types';
import prisma from '../../../postgre/postgreClient';

export const getUserByAddress = async (userAddress: string, res?: NextApiResponse) => {
  let errorMessage;
  try {
    console.log('Getting User Profile with address:', userAddress);
    const userProfile = await prisma.user.findUnique({
      where: {
        address: userAddress.toLocaleLowerCase(),
      },
      include: {
        workerProfile: true,
        hirerProfile: true,
        ownedBuilderPlace: true,
        managedPlaces: true,
      },
    });

    if (!userProfile) {
      return null;
    }

    console.log('Fetched user profile with id: ', userProfile?.id);
    return userProfile;
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_FETCHING_USER;
    } else {
      errorMessage = error.message;
    }
    if (res) {
      console.log(error.message);
      res.status(500).json({ error: errorMessage });
    } else {
      console.log(error.message);
      throw new Error(errorMessage);
    }
  }
};

export const getUserByTalentLayerId = async (talentLayerId: string, res?: NextApiResponse) => {
  let errorMessage;
  try {
    console.log('Getting Worker Profile with TalentLayer id:', talentLayerId);
    const userProfile = await prisma.user.findUnique({
      where: {
        talentLayerId: talentLayerId,
      },
      include: {
        workerProfile: true,
        hirerProfile: true,
        ownedBuilderPlace: true,
        managedPlaces: true,
      },
    });
    console.log(userProfile);
    if (!userProfile) {
      return null;
    }

    return userProfile;
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_FETCHING_USER;
    } else {
      errorMessage = error.message;
    }
    if (res) {
      console.log(error.message);
      res.status(500).json({ error: errorMessage });
    } else {
      console.log(error.message);
      throw new Error(errorMessage);
    }
  }
};

export const getUserById = async (id: string) => {
  let errorMessage;
  try {
    console.log('Getting User Profile with id:', id);
    const userProfile = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        workerProfile: true,
        hirerProfile: true,
        ownedBuilderPlace: true,
        managedPlaces: true,
      },
    });
    console.log('Fetched Worker Profile: ', userProfile);
    if (userProfile) {
      return userProfile;
    }

    return null;
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_FETCHING_USER;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const getUserByEmail = async (email: string) => {
  let errorMessage;
  try {
    console.log('Getting User Profile with email:', email);
    const userProfile = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        // workerProfile: true,
        // hirerProfile: true,
        ownedBuilderPlace: true,
        // managedPlaces: true,
      },
    });
    console.log('Fetched Worker Profile: ', userProfile);
    if (userProfile) {
      return userProfile;
    }

    return null;
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_FETCHING_USER;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const updateWorkerProfile = async (data: UpdateWorkerProfileAction) => {
  let errorMessage;
  /**
   * @dev: No Prisma nested update yet, so we need to update the User and WorkerProfile separately
   */
  try {
    // Step 1: Update the User
    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        email: data.email,
        picture: data.picture,
        about: data.about,
      },
    });

    // Step 2: Update the WorkerProfile with the same ID as the User
    await prisma.workerProfile.update({
      where: {
        id: data.id,
      },
      data: {
        id: user.id,
        skills: data?.skills?.split(',').map(skill => skill.trim()),
      },
    });

    return {
      message: 'Worker Profile updated successfully',
      id: user.id,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_UPDATING_WORKER_PROFILE;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const updateHirerProfile = async (data: UpdateHirerProfileAction) => {
  let errorMessage;
  /**
   * @dev: No Prisma nested update yet, so we need to update the User and WorkerProfile separately
   */
  try {
    // Step 1: Update the User
    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        email: data.email,
        picture: data.picture,
        about: data.about,
      },
    });

    /**
     * @dev: update here hirerProfile entity when needed
     */

    return {
      message: 'Hirer Profile updated successfully',
      id: user.id,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_UPDATING_HIRER_PROFILE;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const updateUserEmail = async (data: UpdateUserEmailAction) => {
  let errorMessage;
  try {
    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        email: data.email,
        isEmailVerified: false,
      },
    });

    return {
      message: 'Email updated successfully',
      id: user.id,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_UPDATING_USER_EMAIL;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const createHirerProfile = async (data: CreateHirerProfileAction) => {
  let errorMessage;
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        picture: data.picture,
        about: data.about,
        hirerProfile: {
          create: {},
        },
      },
    });

    return {
      message: 'Hirer Profile created successfully',
      id: user.id,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_CREATING_HIRER_PROFILE;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const createWorkerProfile = async (data: CreateWorkerProfileAction) => {
  let errorMessage;
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        picture: data.picture,
        about: data.about,
        workerProfile: {
          create: {
            skills: data?.skills?.split(','),
          },
        },
      },
    });

    return {
      message: 'Worker Profile created successfully',
      id: user.id,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_CREATING_WORKER_PROFILE;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const setUserOwner = async (data: SetUserProfileOwner) => {
  let errorMessage;
  try {
    await prisma.user.update({
      where: {
        id: Number(data.id),
      },
      data: {
        talentLayerId: data.talentLayerId,
        address: data.userAddress.toLocaleLowerCase(),
      },
    });
    return {
      message: 'User owner set successfully',
      id: data.talentLayerId,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_SETTING_USER_OWNER;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

/**
 * @dev: Only this function can set the User status to VALIDATED
 * @param userId
 */
export const validateUser = async (userId: string) => {
  let errorMessage;
  try {
    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        status: EntityStatus.VALIDATED,
      },
    });
    return {
      message: 'User validated successfully',
      id: userId,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_VALIDATING_USER;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};

export const removeOwnerFromUser = async (userId: string) => {
  let errorMessage;
  try {
    console.log('Removing address from pending User:', userId);
    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        address: null,
        talentLayerId: null,
      },
    });
    return {
      message: 'User address removed successfully',
      id: userId,
    };
  } catch (error: any) {
    if (error?.name?.includes('Prisma')) {
      errorMessage = ERROR_REMOVING_USER_OWNER;
    } else {
      errorMessage = error.message;
    }
    console.log(error.message);
    throw new Error(errorMessage);
  }
};
