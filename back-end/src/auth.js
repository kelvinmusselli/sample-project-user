import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const authConfig = {
  secret: 'c1892b69f41ccbc88ebf15a9e05d7cc0',
  expiresIn: '7d',
};

export default async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).json({ error: 'Token não enviado!' });
  }

  const [, token] = authHeaders.split(' ');

  try {
    const decodificarsenha = await promisify(jwt.verify)(
      token,
      authConfig.secret
    );

    req.userId = decodificarsenha.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalido!' });
  }
};
