export interface Ilogin {
    email: string,
    password: string,

}
export interface Iregister {
    email: string,
    password: string,
    name: string
    
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