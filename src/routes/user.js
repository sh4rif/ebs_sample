import { Op } from "sequelize";
import { Router } from "express";
import { logout, login, successResponse } from "../utils";
import { catchAsync, guestOnly, auth } from "../middlewares";
import { connection } from "../../config";

import { User, Address, Tech } from "../../database/models";
import { UserController, AddressController } from "../../controllers";
import { validate, registerSchema, loginSchema } from "../validation";
import { errResponse } from "../utils";
import { compare } from "bcryptjs";

User.init(connection);
Address.init(connection);
Tech.init(connection);

User.associate(connection.models);
Address.associate(connection.models);
Tech.associate(connection.models);

const router = Router();

router.post("/", guestOnly, async (req, res) => {
  // return res.json({ msg: "not going ahead", val: req.session });
  const response = { success: false, message: "", status: 400 };
  // await UserController.validateRequest(req, res);
  const { email, username, password, passwordConfirmation, level } = req.body;
  try {
    await registerSchema.validateAsync(
      { email, username, password, passwordConfirmation },
      { abortEarly: false }
    );
  } catch (error) {
    response.errors = error.details.map(e => e.message);
    return res.status(201).json(response);
  }

  try {
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(200).json(errResponse(["Email already in use."]));
    }

    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      return res.status(200).json(errResponse(["Username not available."]));
    }

    const { first_name, last_name } = req.body;
    const data = {
      username,
      email,
      password,
      level,
      first_name,
      last_name,
      isActive: 1
    };
    const user = await User.create(data);
    login(req, user.id);
    res.status(200).json(successResponse());
  } catch (error) {
    return res.status(200).json(errResponse([error]));
  }
});

router.get("/by/:key/:value", guestOnly, async (req, res) => {
  const { key } = req.params;

  if (key === "username" || key === "email") {
    const user = await User.findOne({ where: { [key]: req.params.value } });
    return res.json({ success: user ? true : false });
  }

  return res.json({ success: false });
});

router.post("/login", guestOnly, async (req, res) => {
  const { email, password } = req.body;
  // return res.json(req.body);
  try {
    await loginSchema.validateAsync({ email, password }, { abortEarly: false });
  } catch (error) {
    return res.status(201).json(errResponse(error.details.map(e => e.message)));
  }

  const user = await User.findOne({ where: { email, isActive: 1 } });

  if (!user || !(await compare(password, user.password))) {
    return res.json(errResponse(["Username or email is not valid"]));
  }
  login(req, user.id);
  const data = { id: user.id, email: user.email, name: user.first_name };
  res.json(successResponse(data));
});

// router.get('/home', auth, catchAsync(async (req, res) => {
//     const attributes = ['username', 'email', 'first_name', 'last_name'];
//     const user = await User.findByPk(req.session.userId, { attributes })
//     res.json(user);
// }))

// router.post("/", guestOnly, catchAsync(UserController.store));
// router.post("/login", guestOnly, catchAsync(UserController.login));
// router.post(
//   "/logout",
//   auth,
//   catchAsync(async (req, res) => {
//     await logout(req, res);
//     res.send({ message: "logout" });
//   })
// );

// router.get(
//   "/:user_id/address",
//   auth,
//   catchAsync(async (req, res) => {
//     const { user_id } = req.params;
//     const user = await User.findByPk(user_id, {
//       include: "addresses"
//     });
//     res.json({ message: "okay", addresses: user });
//   })
// );
// router.post(
//   "/:user_id/address",
//   auth,
//   catchAsync(async (req, res) => {
//     const { user_id } = req.params;

//     const { zipcode, street, city, country } = req.body;

//     const user = await User.findByPk(user_id);
//     if (!user) {
//       return res.status(400).json({ message: "User not found." });
//     }

//     const address = await Address.create({
//       user_id,
//       zipcode,
//       street,
//       city,
//       country
//     });

//     res.json({ message: "Success", data: address });
//   })
// );

// router.post("/:user_id/techs", async (req, res) => {
//   res.send("working...");
// });

// router.post(
//   "/:user_id/tech",
//   auth,
//   catchAsync(async (req, res) => {
//     const { user_id } = req.params;

//     const { title } = req.body;

//     const user = await User.findByPk(user_id);
//     if (!user) {
//       return res.status(400).json({ message: "User not found." });
//     }

//     const [tech, created] = await Tech.findOrCreate({ where: { title } });

//     const userTech = await user.addTech(tech);
//     console.log("userTech", userTech);
//     console.log("tech", tech);
//     console.log("created", created);

//     res.json({ message: "Success" });
//   })
// );

// router.delete(
//   "/:user_id/techs",
//   auth,
//   catchAsync(async (req, res) => {
//     const { user_id } = req.params;

//     const { title } = req.body;

//     const user = await User.findByPk(user_id);
//     if (!user) {
//       return res.status(400).json({ message: "User not found." });
//     }

//     const tech = await Tech.findOne({ where: { title } });

//     const removedTech = await user.removeTech(tech);

//     res.json({ message: "okay" });
//   })
// );

// router.get("/:user_id/techs", auth, async (req, res) => {
//   const { user_id } = req.params;

//   const { title } = req.body;

//   const user = await User.findByPk(user_id, {
//     include: {
//       association: "techs",
//       attributes: ["title"],
//       through: { attributes: [] }
//     }
//   });
//   if (!user) {
//     return res.status(400).json({ message: "User not found." });
//   }
//   const techArray = [];
//   user.techs.forEach(tech => {
//     techArray.push(tech.title);
//   });

//   res.json({ message: "okay", techs: user.techs, techArray });
// });

// router.get("/report", auth, async (req, res) => {
//   const users = await User.findAll({
//     where: {
//       email: {
//         [Op.like]: "%@mail.co%"
//       }
//     },
//     attributes: ["username", "email"],
//     include: [
//       {
//         association: "addresses",
//         where: { city: "karachi" },
//         attributes: ["zipcode", "street", "city", "country"],
//         required: false
//       },
//       {
//         association: "techs",
//         required: false,
//         where: { title: { [Op.like]: "React%" } },
//         attributes: ["title"],
//         through: { attributes: [] }
//       }
//     ]
//   });

//   res.json(users);
// });

export default router;
