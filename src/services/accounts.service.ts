import { generateToken } from "../helpers/auth.helper";
import { createUser, findUserByEmail } from "../helpers/knex/users/user.helpers";
import { Iuser } from "../helpers/knex/users/user.schema";
import { Ilogin, Ireturn } from "./dto/accounts/model";

export async function addUser (login: Ilogin) : Promise<Ireturn>{
    try {
      const resp = await createUser(login.email, login.password);
      return {status: 200, msg: '', data: resp}
    } catch (error) {
        return {status: 503, msg: 'server failed', data:error}
    }
}

export async function loginUser (login: Ilogin): Promise<Ireturn> {
  try {
    const user = await findUserByEmail(login.email);
    console.log('user', user);
    if(user == null) return {status: 401, msg: 'email or password does not exist', data: {}};
    const myUser:Iuser = user as unknown as Iuser;
    console.log('myuser', myUser);
    if(myUser.password !=  login.password)return {status: 401, msg: 'email or password does not exist', data: {}};
    let token = generateToken(myUser);
    console.log(token);
    return {status:200, msg: 'login successful', data: {token, user}}
   

  } catch (error) {
    return {status: 503, msg: 'server failed', data:error}
  }
  
}