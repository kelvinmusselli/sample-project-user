import jwt from 'jsonwebtoken';
import User from '../model/userSchema';
import authConfig from '../../authConfig';
import checkPassword from '../utils/checkPassword';

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não existente' });
    }

    if (!(await checkPassword(password, user.password))) {
      return res.status(401).json({ error: 'Senha invalida' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
      message: 'Autenticado com sucesso!',
    });
  }
}

export default new SessionController();
