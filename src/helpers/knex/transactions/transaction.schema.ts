


  // Define the transaction model
  export interface Itransaction {
    id?: number;
    from_user_id: number;
    to_user_id: number;
    amount: number;
    timestamp?: Date;
  }
  