import mongoose from "mongoose"

const { NEXT_MONGO_URI } = process.env

export const connection = async () => {
  const conn = await mongoose
    .connect(NEXT_MONGO_URI as string)
    .catch(err => console.log(err))
  console.log("Mongoose Connection Established")
  return { conn }
}
