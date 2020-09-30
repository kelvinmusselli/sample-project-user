/* eslint-disable no-console */
import bcryptpjs from 'bcryptjs';
import * as Yup from 'yup';
import User from '../model/userSchema';
import checkPassword from '../utils/checkPassword';

class UserController {
  async index(req, res) {
    const { email } = req.params;

    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(200).json({ user });
      }
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const user = await User.find();

    return res.status(200).json({ user });
  }

  async store(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      console.log(await schema.typeError());
      return res.status(400).json({ error: 'Validação falhou! linha 14' });
    }

    const { name, email, password } = req.body;

    if (email) {
      const verifyExist = await User.findOne({ email });
      if (verifyExist) {
        return res.status(400).json({ message: 'Usuário já cadastrado' });
      }
    }

    const hashPassword = await bcryptpjs.hash(password, 8);

    await User.create({ name, email, password: hashPassword });

    return res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
  }

  async update(req, res) {

    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: 'Este usuário já existe!' });
      }
    }

    if (oldPassword && !(await checkPassword(oldPassword, user.password))) {
      return res
        .status(401)
        .json({ error: 'Senha não corresponde com a atual' });
    }

    const { id, name, provider } = await update(req.body);
    return;
  }
}

export default new UserController();
