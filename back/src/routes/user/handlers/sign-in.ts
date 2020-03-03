import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';

import { comparePassword } from '../../../common/hash-password';
import { signUserToken } from '../../../common/jwt';
import validateSchema from '../../../common/validate-schema';
import { getConfig } from '../../../config';
import { getDefaultDb } from '../../../db/db-params';
import { userLoginSchema } from '../user.schemas';
import { User, UserLogin } from '../user.types';

const signInHandler: RequestHandler = async (req, res) => {
  const userLogin: UserLogin = req.body;
  const errors = validateSchema(userLoginSchema, userLogin);
  if (errors) {
    res.sendStatus(HttpStatus.BAD_REQUEST);
    return;
  }

  const db = await getDefaultDb();
  const users = db.collection<User>('users');
  const user = await users.findOne({ email: userLogin.email });
  if (!user || !(await comparePassword(userLogin.password, user.password))) {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
    return;
  }

  users.updateOne({ _id: user._id }, { $set: { signInDate: Date.now() } });

  const token = await signUserToken(user._id.toHexString());
  const expiresIn = getConfig('jwtExpiresIn');
  res.send({ token, expiresIn });
};

export default signInHandler;