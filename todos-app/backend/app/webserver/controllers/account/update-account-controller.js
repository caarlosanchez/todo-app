const bcrypt = require("bcrypt");
const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");
const PASSWORD_REGEX = require("../../../constants").PASSWORD_REGEX;
const jsonWebToken = require("jsonwebtoken");

async function updateAccount(req, res) {
  const { user_id } = req.claims;
  console.log(req);
  // Los datos de tipo texto vendrán en req.body
  // Los datos de tipo file vendrán en req.file
  const accountData = { ...req.body, file: { ...req.file } };
  // { name: "ana, "surname: "Corral", file: { originalName: "ana.jpg"}}
  let connection;

  try {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      surname: Joi.string().required(),
      gender: Joi.string().required(),
      email: Joi.string().email().required(),
      file: Joi.object().required(),
    });
    await schema.validateAsync(accountData);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
  const now = new Date();
  try {
    connection = await mysqlPool.getConnection();

    // Verificamos si hay algún otro usuario con ese email ya que debe ser único
    const sqlUserVerification = `SELECT * FROM users WHERE email = '${accountData.email}'`;
    const [userVerification] = await connection.query(sqlUserVerification);
    if (userVerification[0]?.id && userVerification[0]?.id !== user_id) {
      return res.status(409).send("Este email ya está en uso");
    }

    const sqlQuery = "UPDATE users SET ? WHERE id = ?";
    await connection.query(sqlQuery, [
      {
        name: accountData.name,
        surname: accountData.surname,
        gender: accountData.gender,
        email: accountData.email,
        avatar_url: req.file.originalname,
      },
      user_id,
    ]);
    const sqlUser = `SELECT * FROM users WHERE id = '${user_id}'`;
    const [response] = await connection.query(sqlUser);
    const user = response[0];
    const payloadJwt = { user_id: user.id };
    const jwtExpiresIn = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL);

    const token = jsonWebToken.sign(payloadJwt, process.env.AUTH_JWT_SECRET, {
      expiresIn: jwtExpiresIn,
    });

    res.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { updateAccount };
