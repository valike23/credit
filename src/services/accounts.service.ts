import { generateToken } from "../helpers/auth.helper";
import { createUser, findUserByEmail, Iuser } from "../helpers/knex/users.helpher";


import { Ilogin, Iregister, Ireturn } from "./dto/accounts/model";
import { WalletService } from "./wallet.service";

export async function addUser (registerDTO: Iregister) : Promise<Ireturn>{
    try {
      const resp = await createUser(registerDTO.email, registerDTO.password, registerDTO.name);
      const walletService = new WalletService();
      console.log('wallet working', resp);
      const data = await walletService.createWallet(resp as unknown as number);
      console.log('wallet worked fine', data);
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