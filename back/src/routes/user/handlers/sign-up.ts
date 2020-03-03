import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';

import { hashPassword } from '../../../common/hash-password';
import { signUserToken } from '../../../common/jwt';
import validateSchema from '../../../common/validate-schema';
import { getDefaultDb } from '../../../db/db-params';
import { userLoginSchema } from '../user.schemas';
import { User, UserLogin } from '../user.types';
import { getConfig } from '../../../config';

const signUpHandler: RequestHandler = async (req, res) => {
  const userLogin: UserLogin = req.body;
  const errors = validateSchema(userLoginSchema, userLogin);
  if (errors) {
    res.sendStatus(HttpStatus.BAD_REQUEST);
    return;
  }

  const db = await getDefaultDb();
  const users = db.collection<User>('users');

  const exists = await users.findOne({ email: userLogin.email });
  if (exists) {
    res.sendStatus(HttpStatus.FORBIDDEN);
    return;
  }

  const hash = await hashPassword(userLogin.password);
  const now = Date.now();
  const insert = await users.insertOne({
    email: userLogin.email,
    password: hash,
    signUpDate: now,
    signInDate: now
  });
  if (insert.insertedCount) {
    res.status(HttpStatus.CREATED);

    const token = await signUserToken(insert.insertedId.toHexString());
    const expiresIn = getConfig('jwtExpiresIn');
    res.send({ token, expiresIn });
    return;
  }

  res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
};

export default signUpHandler;