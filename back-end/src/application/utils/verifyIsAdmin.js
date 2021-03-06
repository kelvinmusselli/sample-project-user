import mongoose from 'mongoose';
import User from '../model/userSchema';

export default async (req, res, next) => {
  const id = req.userId;
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(id) });

  if (!user.isAdmin) {
    return next();
  }
  return next();
};
