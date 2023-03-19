


  // Define the transaction model
  export interface Itransaction {
    id: number;
    fromUserId: number;
    toUserId: number;
    amount: number;
    timestamp: Date;
  }
  