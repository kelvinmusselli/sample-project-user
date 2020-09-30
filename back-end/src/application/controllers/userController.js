import bcryptpjs from 'bcryptjs';
import User from '../model/userSchema';
import connection from '../db/connection';

class userController {
  
  async index(req, res) {
    return res.json({ message: 'oi' });
  }

  async store(req, res) {
    const { name, email, password } = req.body;

    const hashPassword = await bcryptpjs.hash(password, 8);

    const user = await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    return res.json({ message: 'ok' });
    // user.save(() => {
    //   res.json({ message: 'ok' });
    // });
  };
  
};

export default new userController();
