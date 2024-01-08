import mongoose from 'mongoose';
import { connection } from '../../mongo/mongodb';
import {
  addDomainToVercel,
  getApexDomain,
  removeDomainFromVercelProject,
  removeDomainFromVercelTeam,
  validDomainRegex,
} from './domains';
import { BuilderPlace } from './models/BuilderPlace';
import { Worker } from './models/Worker';
import {
  CreateBuilderPlaceAction,
  CreateWorkerProfileAction,
  IWorkerMongooseSchema,
  UpdateBuilderPlace,
  UpdateBuilderPlaceDomain,
  AddBuilderPlaceCollaborator,
  RemoveBuilderPlaceCollaborator,
} from './types';
import { NextApiResponse } from 'next';
import { MAX_TRANSACTION_AMOUNT } from '../../config';
import {
  EMAIL_ALREADY_VERIFIED,
  EMAIL_VERIFIED_SUCCESSFULLY,
  ERROR_VERIFYING_EMAIL,
} from './apiResponses';

export const deleteBuilderPlace = async (_id: string) => {
  await connection();
  const builderPlace = await BuilderPlace.deleteOne({ _id: _id });
  console.log(builderPlace, 'builderPlace deleted');
  if (builderPlace.deletedCount === 0) {
    return {
      error: 'BuilderPlace not found',
    };
  }
  return {
    message: 'BuilderPlace deleted successfully',
  };
};

export const updateBuilderPlace = async (builderPlace: UpdateBuilderPlace) => {
  try {
    await connection();
    await BuilderPlace.updateOne(
      { ownerTalentLayerId: builderPlace.ownerTalentLayerId },
      builderPlace,
    ).exec();
    return {
      message: 'BuilderPlace updated successfully',
      id: builderPlace._id,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const addBuilderPlaceCollaborator = async (body: AddBuilderPlaceCollaborator) => {
  try {
    await connection();
    await BuilderPlace.updateOne(
      { _id: body.builderPlaceId },
      {
        $push: {
          owners: body.newCollaborator,
        },
      },
    ).exec();
    console.log('Collaborator added successfully', body.newCollaborator);
    return {
      message: 'Collaborator added successfully',
      collaborator: body.newCollaborator,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const removeBuilderPlaceCollaborator = async (body: RemoveBuilderPlaceCollaborator) => {
  try {
    await connection();
    const builderPlace = await BuilderPlace.findOne({ _id: body.builderPlaceId });
    if (body.collaborator === builderPlace.ownerTalentLayerId) {
      console.log('Cannot remove the owner of the BuilderPlace');
      throw new Error('Cannot remove the owner of the BuilderPlace');
    }
    await BuilderPlace.updateOne(
      { _id: body.builderPlaceId },
      {
        $pull: {
          owners: body.collaborator,
        },
      },
    ).exec();
    console.log('Collaborator removed successfully', body.collaborator);
    return {
      message: 'Collaborator removed successfully',
      collaborator: body.collaborator,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const createBuilderPlace = async (data: CreateBuilderPlaceAction) => {
  try {
    await connection();

    const newBuilderPlace = new BuilderPlace({
      _id: new mongoose.Types.ObjectId(),
      name: data.name,
      about: data.about,
      preferredWorkTypes: data.preferredWorkTypes,
      profilePicture: data.profilePicture,
      palette: {
        primary: '#FF71A2',
        primaryFocus: '#FFC2D1',
        primaryContent: '#ffffff',
        base100: '#ffffff',
        base200: '#fefcfa',
        base300: '#fae4ce',
        baseContent: '#000000',
        info: '#f4dabe',
        infoContent: '#000000',
        success: '#C5F1A4',
        successContent: '#000000',
        warning: '#FFE768',
        warningContent: '#000000',
        error: '#FFC2D1',
        errorContent: '#000000',
      },
      status: 'pending',
    });
    const { _id } = await newBuilderPlace.save();
    return {
      message: 'BuilderPlace created successfully',
      _id: _id,
    };
  } catch (error: any) {
    console.log('Error creating new builderPlace:', error);
    return {
      error: error.message!,
    };
  }
};

export const getBuilderPlaceByDomain = async (domain: string) => {
  await connection();
  console.log('getting builderPlace ', domain);
  let builderPlace;
  if (domain.includes(process.env.NEXT_PUBLIC_ROOT_DOMAIN as string)) {
    builderPlace = await BuilderPlace.findOne({ subdomain: domain });
  } else {
    builderPlace = await BuilderPlace.findOne({ customDomain: domain });
  }
  console.log('fetched builderPlaces, ', builderPlace);

  return builderPlace;
};

export const getBuilderPlaceById = async (id: string) => {
  try {
    await connection();
    console.log('getting builderPlace with id:', id);
    const builderPlaceSubdomain = await BuilderPlace.findOne({ _id: id });
    console.log('fetched builderPlace, ', builderPlaceSubdomain);
    if (builderPlaceSubdomain) {
      return builderPlaceSubdomain;
    }

    return null;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getBuilderPlaceByOwnerId = async (id: string) => {
  try {
    await connection();
    console.log("getting builderPlace with owner's id:", id);
    const builderPlaceSubdomain = await BuilderPlace.findOne({ ownerTalentLayerId: id });
    console.log('fetched builderPlace, ', builderPlaceSubdomain);
    if (builderPlaceSubdomain) {
      return builderPlaceSubdomain;
    }

    return null;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getBuilderPlaceByOwnerAddressAndId = async (address: string, _id: string) => {
  try {
    await connection();
    console.log("getting builderPlace with owner's address & mongo _id:", address, _id);
    const builderPlaceSubdomain = await BuilderPlace.findOne({
      owners: address,
      _id: _id,
    });
    console.log('fetched builderPlace, ', builderPlaceSubdomain);
    if (builderPlaceSubdomain) {
      return builderPlaceSubdomain;
    }

    return null;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getBuilderPlaceByOwnerTlIdAndId = async (ownerId: string, _id: string) => {
  try {
    await connection();
    console.log("getting builderPlace with owner's TlId & mongo _id:", ownerId, _id);
    const builderPlaceSubdomain = await BuilderPlace.findOne({
      ownerTalentLayerId: ownerId,
      _id: _id,
    });
    console.log('fetched builderPlace, ', builderPlaceSubdomain);
    if (builderPlaceSubdomain) {
      return builderPlaceSubdomain;
    }

    return null;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

// TODO! createBuilderPlace, can be used for the onboarding workflow maybe for the creating the subdomain & deleteBuilderPlace
export const updateDomain = async (builderPlace: UpdateBuilderPlaceDomain) => {
  try {
    console.log('Update Domain invoke, ', builderPlace);
    await connection();
    let response;

    if (builderPlace.customDomain.includes('builder.place')) {
      console.log('Domain contains builder.place');
      return {
        error: 'Cannot use builder.place subdomain as your custom domain',
      };

      // if the custom domain is valid, we need to store it and add it to Vercel
    } else if (validDomainRegex.test(builderPlace.customDomain!)) {
      console.log('Custom Domain is valid');
      // Update the MongoDB document with the new custom domain
      // await BuilderPlace.updateOne({ _id: new mongoose.Types.ObjectId(builderPlace.id) }, { customDomain: builderPlace.customDomain }).exec();
      console.log('Searching subdomain, ', builderPlace.subdomain);
      const entity = await BuilderPlace.findOne({ subdomain: builderPlace.subdomain });
      console.log('Search result', builderPlace.subdomain);
      entity.customDomain = builderPlace.customDomain;
      entity.save();

      // Add the custom domain to Vercel
      console.log('Adding domain to vercel');

      await addDomainToVercel(builderPlace.customDomain!);

      // null means remove the custom domain
    } else if (builderPlace.customDomain! === '') {
      // Remove the custom domain from the MongoDB document
      console.log('Removing custom domain from MongoDB document');
      // await BuilderPlace.updateOne({ _id: new mongoose.Types.ObjectId(builderPlace.id) }, { customDomain: "asd.de" }).exec();

      const entity = await BuilderPlace.findOne({ subdomain: builderPlace.subdomain });
      entity.customDomain = '';
      entity.save();
    }

    // Get the current custom domain from the MongoDB document
    // const currentBuilderPlace = await BuilderPlace.findById(new mongoose.Types.ObjectId(builderPlace.id)).exec();
    const currentBuilderPlace = await BuilderPlace.findOne({ subdomain: builderPlace.subdomain });
    const currentDomain = currentBuilderPlace?.customDomain || '';

    // If the site had a different customDomain before, we need to remove it from Vercel
    if (builderPlace.customDomain !== currentDomain) {
      response = await removeDomainFromVercelProject(builderPlace.customDomain!);

      // Check if the apex domain is being used by other sites
      const apexDomain = getApexDomain(`https://${builderPlace.customDomain}`);
      const domainsWithApexDomain = await BuilderPlace.find({
        customDomain: new RegExp(`.${apexDomain}$`),
      }).exec();
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
    return {
      error: error.message,
    };
  }
};

export const createWorkerProfile = async (data: CreateWorkerProfileAction) => {
  try {
    await connection();

    const newWorkerProfile = new Worker({
      email: data.email,
      status: data.status,
      name: data.name,
      picture: data.picture,
      about: data.about,
      skills: data.skills,
      talentLayerId: data.talentLayerId,
    });
    const { _id } = await newWorkerProfile.save();
    return {
      message: 'Worker Profile created successfully',
      _id: _id,
    };
  } catch (error: any) {
    console.log('Error creating new Worker Profile:', error);
    return {
      error: error.message!,
    };
  }
};

export const getWorkerProfileById = async (id: string) => {
  try {
    await connection();
    console.log('Getting Worker Profile with id:', id);
    const workerProfile = await Worker.findOne({ _id: id });
    console.log('Fetched Worker Profile, ', workerProfile);
    if (workerProfile) {
      return workerProfile;
    }

    return null;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getWorkerProfileByTalentLayerId = async (
  id: string,
  res?: NextApiResponse,
): Promise<IWorkerMongooseSchema | null> => {
  try {
    await connection();
    console.log('Getting Worker Profile with TalentLayer id:', id);
    const workerProfile = await Worker.findOne({ talentLayerId: id });
    console.log('Fetched Worker Profile, ', workerProfile);
    if (!workerProfile) {
      return null;
    }

    return workerProfile;
  } catch (error: any) {
    if (res) {
      res.status(500).json({ error: error.message });
    } else {
      console.log(error.message);
    }
    return null;
  }
};

export async function checkUserEmailVerificationStatus(
  worker: IWorkerMongooseSchema,
  res: NextApiResponse,
): Promise<void> {
  try {
    await connection();

    if (!worker.emailVerified) {
      console.log('Email not verified');
      throw new Error('Email not verified');
    }
    console.log('Email verified');
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function checkOrResetTransactionCounter(
  worker: IWorkerMongooseSchema,
  res: NextApiResponse,
): Promise<void> {
  try {
    await connection();

    const nowMilliseconds = new Date().getTime();
    const oneWeekAgoMilliseconds = new Date(nowMilliseconds - 7 * 24 * 60 * 60 * 1000).getTime(); // 7 days ago

    if (worker.counterStartDate > oneWeekAgoMilliseconds) {
      // Less than one week since counterStartDate
      if (worker.weeklyTransactionCounter >= MAX_TRANSACTION_AMOUNT) {
        // If the counter is already 50, stop the function
        console.log('Transaction limit reached for the week');
        throw new Error('Transaction limit reached for the week');
      }
    } else {
      console.log('More than a week since the start date, reset counter');
      worker.counterStartDate = nowMilliseconds;
      worker.weeklyTransactionCounter = 0;
      await worker.save();
    }
    console.log('Delegating transaction');
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function incrementWeeklyTransactionCounter(
  worker: IWorkerMongooseSchema,
  res: NextApiResponse,
): Promise<void> {
  try {
    await connection();
    // Increment the counter
    worker.weeklyTransactionCounter = (worker.weeklyTransactionCounter || 0) + 1;
    console.log('Transaction counter incremented', worker.weeklyTransactionCounter);
    await worker.save();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export const verifyWorkerProfileEmail = async (id: string) => {
  try {
    await connection();
    const existingWorker = await Worker.findOne({ _id: id });
    if (existingWorker) {
      const resp = await Worker.updateOne({ _id: id }, { emailVerified: true }).exec();
      if (resp.modifiedCount === 0 && resp.matchedCount === 1) {
        console.log(EMAIL_ALREADY_VERIFIED);
        return {
          error: EMAIL_ALREADY_VERIFIED,
        };
      }
      console.log('Updated worker profile email', resp);
    } else {
      console.log(ERROR_VERIFYING_EMAIL);
      return {
        error: ERROR_VERIFYING_EMAIL,
      };
    }
    return {
      message: EMAIL_VERIFIED_SUCCESSFULLY,
      email: existingWorker.email,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      error: error.message,
    };
  }
};
