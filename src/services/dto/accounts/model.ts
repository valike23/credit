export interface Ilogin {
    email: string,
    password: string,
}


export interface Ireturn{
    status: number,
    msg: string,
    data: any
}

export interface Itransfer{
    accountNumber: number,
    amount: number
}