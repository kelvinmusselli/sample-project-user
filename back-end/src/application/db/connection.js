import mongoose from 'mongoose';

const connect = () => {
  mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

export default connect;
