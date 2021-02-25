/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import bcryptpjs from 'bcryptjs';
import * as Yup from 'yup';
import mongoose from 'mongoose';
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

  async delete(req, res) {
    const idUser = req.params.id;
    if(!idUser){
      return res.status(400).json({ error: 'É necessário passar um id como parâmetro' });
    }

    const user = await User.findByIdAndRemove({_id: mongoose.Types.ObjectId(idUser) });

    if (!user) {
      return res.status(400).json({ error: 'Este usuário não existe' });
    }

    return res.status(200).json({ message: 'Usuário removido com sucesso' });
  }

  async store(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      console.log(await schema.typeError());
      return res.status(400).json({ error: 'Validação falhou!' });
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

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string().min(6),
      newPassword: Yup.string().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      console.log(schema.typeError());
      return res.status(400).json({ error: 'Validação falhou!' });
    }

    const idUser = req.params.id;
    const { email, name, password, newPassword } = req.body;

    const user = await User.findById({_id: mongoose.Types.ObjectId(idUser) });

    if (!user) {
      return res.status(400).json({ error: 'Este usuário não existe' });
    }

    if(email) {
      if (email !== user.email) {
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ error: 'Este email já existe!' });
        }
      }
    }


    if (password && !(await checkPassword(password, user.password))) {
      return res
        .status(401)
        .json({ error: 'Senha não corresponde com a atual' });
    }
   
    const hashPassword = password && newPassword ? await bcryptpjs.hash(newPassword, 8) : await bcryptpjs.hash(user.password, 8);

    const objForUpdate = { 
      name: name || user.name,
      email: email || user.email,
      hashPassword
    }
  
    await User.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(idUser) },
      {
        $set: objForUpdate,
      }
    );
    return res
      .status(200)
      .json({ message: 'Informações de usuário atualizadas com sucesso' });
  }
}

export default new UserController();
