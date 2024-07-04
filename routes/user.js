import Router from "@koa/router";
import jwt from 'jsonwebtoken';
import { getUser } from "../db/user.js";

const secretKey = 'yongjunwang secret';

const UserRouter = new Router({
  prefix: '/api/user'
});

UserRouter.post('/login', async ctx => {
  const { username, password } = ctx.request.body;
  console.log(username);
  console.log(password);

  try {
    const user = await getUser(username, password);
    if (!user) {
      ctx.status = 401;
      ctx.body = { error: 'Invalid username or password' };
      return;
    }

    const token = jwt.sign({ id: user.id, username: user.name }, secretKey, { expiresIn: '1h' });
    console.log(token);

    ctx.body = { token: token };
  } catch (error) {
    console.error('Error:', error);
    ctx.status = 401;
    ctx.body = { error: 'Invalid username or password' };
    throw error;
  }
});


export default UserRouter;