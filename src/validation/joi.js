// import { BadRequest } from "../errors";
export const validate = async (schema, payload, res) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });
  } catch (e) {
    // console.log("throwing error from here", JSON.stringify(e, null, 4));
    console.log("errors", e.details);

    // throw new BadRequest(e);
    return res.json(e);
  }
};
