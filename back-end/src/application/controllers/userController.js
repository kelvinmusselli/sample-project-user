import User from '../db/schemas/user/userSchema';

class userController {

    async index(req, res){

    };

    async store(req, res) {
      const user = await User.create({name:`kelvin`});
      return res.json(user);
    };

    async update(req,res) {

    };

};

export default new userController();
