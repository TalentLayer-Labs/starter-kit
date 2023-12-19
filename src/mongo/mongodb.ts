import mongoose from 'mongoose';

export const connection = async () => {
  const conn = await mongoose.connect(
    (process.env.MONGO_URI || process.env.NEXT_MONGO_URI) as string,
  );
  console.log('Mongoose Connection Established');
  return { conn };
};
