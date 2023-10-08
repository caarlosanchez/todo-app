const bcrypt = require("bcrypt");
const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");
const PASSWORD_REGEX = require("../../../constants").PASSWORD_REGEX;
const jsonWebToken = require("jsonwebtoken");

const HASH = 10;

async function createAccountAvatar(req, res) {
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
      password: Joi.string().regex(PASSWORD_REGEX).required(),
      file: Joi.object().required(),
    });
    await schema.validateAsync(accountData);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
  const now = new Date();
  const createDate = now.toISOString().substring(0, 19).replace("T", " ");
  const securePassword = await bcrypt.hash(accountData.password, HASH);
  try {
    connection = await mysqlPool.getConnection();

    const sqlUserVerification = `SELECT * FROM users WHERE email = '${accountData.email}'`;
    const [userVerification] = await connection.query(sqlUserVerification);
    if (userVerification.length > 0) {
      return res.status(409).send("Este email ya está en uso");
    }

    const sqlQuery = "INSERT INTO users SET ?";
    await connection.query(sqlQuery, {
      name: accountData.name,
      surname: accountData.surname,
      gender: accountData.gender,
      email: accountData.email,
      password: securePassword,
      created_at: createDate,
      avatar_url: req.file.originalname,
    });
    const sqlUser = `SELECT * FROM users WHERE email = '${accountData.email}'`;
    const [response] = await connection.query(sqlUser);
    const user = response[0];
    const payloadJwt = { user_id: user.id };
    const jwtExpiresIn = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL);

    const token = jsonWebToken.sign(payloadJwt, process.env.AUTH_JWT_SECRET, {
      expiresIn: jwtExpiresIn,
    });

    res.status(201).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { createAccountAvatar };
