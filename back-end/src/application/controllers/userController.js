import bcryptpjs from 'bcryptjs';
import User from '../model/userSchema';

class userController {
  async index(req, res) {
    return res.json({ message: 'oi' });
  }

  async store(req, res) {
    const { name, email, password } = req.body;

    if (email) {
      const verifyExist = await User.findOne({ email });
      if (verifyExist) {
        return res.status(400).json({ message: 'Usuário já cadastrado' });
      }
    }

    const hashPassword = await bcryptpjs.hash(password, 8);

    await User.create({
      name,
      email,
      password: hashPassword,
    });

    return res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
  }
}

export default new userController();
