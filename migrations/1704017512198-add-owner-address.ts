import { connection } from '../src/mongo/mongodb';
import { BuilderPlace } from '../src/modules/BuilderPlace/models/BuilderPlace';
import { getUserById } from '../src/queries/users';

const chainId = 80001;
let builderPlacesWithOwners: any[] = [];
export async function up(): Promise<void> {
  await connection();

  console.log('Getting all builderPlaces');
  const builderPlaces = await BuilderPlace.find();
  console.log('Fetched builderPlaces, ', builderPlaces.length);
  builderPlacesWithOwners = builderPlaces.filter(builderPlace => !!builderPlace.ownerTalentLayerId);
  console.log('Filtered builderPlaces with owners, ', builderPlacesWithOwners.length);

  for (let builderPlace of builderPlacesWithOwners) {
    console.log('Owner TLID', builderPlace.ownerTalentLayerId);
    const owner = await getUserById(chainId, builderPlace.ownerTalentLayerId);
    if (!owner?.data?.data?.user?.address) {
      console.log('No owner found for builderPlace', builderPlace._id);
      continue;
    }
    console.log('Owner Address', owner.data.data.user.address);

    // Preparing new builderPlace data
    const builderPlaceData = { ...builderPlace }._doc;
    const builderPlaceId = builderPlaceData._id;
    delete builderPlaceData._id;
    const completeBuilderPlaceData = {
      ...builderPlaceData,
      ownerAddress: owner.data.data.user.address,
    };
    const serializedBuilderPlace = JSON.parse(JSON.stringify(completeBuilderPlaceData));

    // Delete former builderPlace (need to first delete as some fields are required & unique)
    console.log('Deleting former builderPlace', builderPlaceId);
    await BuilderPlace.deleteOne({ _id: builderPlaceId }).exec();

    // Create new builderPlace
    console.log('Creating new builderPlace');
    const newBuilderPlace = new BuilderPlace(serializedBuilderPlace);
    await newBuilderPlace.save();
  }
}

export async function down(): Promise<void> {}
