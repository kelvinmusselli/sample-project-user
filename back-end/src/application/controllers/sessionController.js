import User from '../model/userSchema';
import jwt from 'jsonwebtoken';
import authConfig from '../../authConfig'
import bcrypt from 'bcryptjs';

class sessionController {



    async create(req, res){
      
      const checkPassword = (password, password_hash) =>{
        return bcrypt.compare(password, password_hash)
      };

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            return res.status(401).json({error:"Usuário não existente"});
        }

        if(!(await checkPassword(password, user.password))){
            return res.status(401).json({ error: "Senha invalida" });
        }

        const { id, name } = user;

        return res.json({
            user:{
                id,
                name,
                email
            }, 
            token:jwt.sign({ id,  }, authConfig.secret, { 
                expiresIn: authConfig.expiresIn,
            }),
            message:"Autenticado com sucesso!"
        });
    }
}

export default new sessionController();
