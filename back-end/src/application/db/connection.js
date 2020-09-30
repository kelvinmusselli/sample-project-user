import mongoose from 'mongoose';

const url = mongoose.connect('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

export default url;
