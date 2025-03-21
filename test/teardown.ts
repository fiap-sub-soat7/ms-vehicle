import mongoose from 'mongoose';

export default async (): Promise<void> => {
  await mongoose.disconnect();
};
