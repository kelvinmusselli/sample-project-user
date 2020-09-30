import User from '../model/userSchema';
import connection from '../db/connection';
class userController {
  
  async index(req, res) {
    return res.json({ message: 'oi' });
  }

  async store(req, res) {
    const { name, email, password } = req.body;

    const user = new User({
      name: name,
      email: email,
      password: password,
    });

    user.save(() => {
      res.json({ message: 'ok' });
    });
  };
  
};

export default new userController();
