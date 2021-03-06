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
      surname:Yup.string().required(),
      email: Yup.string().email().required(),
      age: Yup.number().required().positive().integer(),
      cpf:Yup.string().required().min(11),
      phone: Yup.string().required().max(12),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      console.log(schema.typeError());
      return res.status(400).json({ error: 'Dados enviados, são invalidos...' });
    }

    const { name, email, password, age, phone, surname, cpf } = req.body;

    if (email) {
      const verifyExist = await User.findOne({ email });
      if (verifyExist) {
        return res.status(400).json({ message: 'Usuário já cadastrado' });
      }
    }

    const hashPassword = await bcryptpjs.hash(password, 8);

    const objForUpdate = {
      name,
      email,
      password: hashPassword,
      age,
      phone,
      cpf,
      surname
    };

    await User.create(objForUpdate);

    return res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
  }

  async update(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      age: Yup.number(),
      cpf:Yup.string().min(11),
      phone: Yup.string().max(12),
    });


    if (!(await schema.isValid(req.body))) {
      console.log(schema.typeError());
      return res.status(400).json({ error: 'Validação falhou!' });
    }

    const idUser = req.params.id;
    const {
      email,
      name,
      oldPassword,
      newPassword,
      confirmPassword,
      age,
      phone,
      surname,
      cpf
    } = req.body;

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

    if (oldPassword && !(await checkPassword(oldPassword, user.password))) {
      return res
        .status(401)
        .json({ error: 'Senha não corresponde com a atual' });
    }

    const hashPassword = oldPassword && confirmPassword && newPassword
                          ? await bcryptpjs.hash(confirmPassword, 8)
                          : user.password

    const objForUpdate = {
      name: name || user.name,
      surname: surname || user.surname,
      email: email || user.email,
      password: hashPassword,
      age : age || user.age,
      phone: phone || user.phone,
      cpf: cpf || user.cpf
    };

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
