import { User } from "../database/models";
import { validate, registerSchema, loginSchema } from "../src/validation";
import { login } from "../src/utils";
import { compare } from "bcryptjs";

export class AddressController {
  static async index(req, res) {}

  static async view(req, res) {}

  static async store(req, res) {
    res.json({ msg: "hitting" });
    // await validate(registerSchema, req.body, res);

    // const { email, username, password } = req.body;

    // const emailExists = await User.findOne({ where: { email } });
    // if (emailExists) {
    //     throw new BadRequest('Invalid Email');
    // }
    // const userExists = await User.findOne({ where: { username } });
    // if (userExists) {
    //     throw new BadRequest('Invalid username');
    // }
    // const user = await User.create({ username, email, password });

    // login(req, user.id);
    // res.json({ message: 'success', user });
  }
}

export default AddressController;
