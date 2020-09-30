import jwt from 'jsonwebtoken';
import auth from '../../auth';
import User from '../db/schemas/user/userSchema';


class sessionController {
    async Create(req, res){

        const body = req.body;

          const user = await User.create({
            name:body.name,
            email:body.email,
            password:body.password
          });
          console.log('====================================');

          console.log('====================================');
          console.log(user)
          // return res.json({user});

        //   return res.json({
        //     user:user,
        //     token:jwt.sign({ id,  }, auth.secret, {
        //         expiresIn: auth.expiresIn,
        //     }),
        //     message:"Autenticado com sucesso!"
        // });

        return

            // return res.status(401).json({error:"Usuário não existente"});


        // if(!(await user.checkPassword(password))){
        //     return res.status(401).json({ error: "Senha invalida" });
        // }

        // const { id, name } = user;

        // return res.json({
        //     user:{
        //         id,
        //         name,
        //         email
        //     },
        //     token:jwt.sign({ id,  }, auth.secret, {
        //         expiresIn: auth.expiresIn,
        //     }),
        //     message:"Autenticado com sucesso!"
        // });
    }
}

export default new sessionController();
