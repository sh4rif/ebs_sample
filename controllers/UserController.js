import { User } from "../database/models";
import { validate, registerSchema, loginSchema } from "../src/validation";
import { login } from "../src/utils";
import { compare } from "bcryptjs";

export class UserController {
  // static response = { success: false, message: "", status: 200 };

  static async index(req, res) {}

  static async view(req, res) {}

  static async store(req, res) {
    await validate(registerSchema, req.body, res);

    const { email, username, password, level } = req.body;

    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      // throw new BadRequest("Invalid Email");
    }
    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      // throw new BadRequest("Invalid username");
    }
    const user = await User.create({ username, email, password });

    login(req, user.id);
    res.json({ message: "success", user });
  }

  static async login(req, res) {
    // validate req body
    await validate(loginSchema, req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await compare(password, user.password))) {
      return res.json({ message: "Username or email is not valid" });
    }
    login(req, user.id);
    res.send({ message: "okay" });
  }

  static async validateRequest(req, res) {
    const response = { success: false, message: "", status: 200 };
    try {
      await registerSchema.validateAsync(req.body, { abortEarly: false });
    } catch (error) {
      response.errors = error.details.map(e => e.message);
      response.status = 400;
      return res.status(400).json(response);
    }
  }
}

export default UserController;
