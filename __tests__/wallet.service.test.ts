import { WalletService } from '../src/services/wallet.service';

describe('WalletService', () => {
  let walletService: WalletService;

  beforeEach(() => {
    walletService = new WalletService();
  });

 

  describe('getWallet', () => {
    it('returns a wallet for an existing user', () => {
      const userId = 1;
      const wallet = walletService.createWallet(userId);
      const retrievedWallet = walletService.getWallet(userId);
      expect(retrievedWallet).toEqual(wallet);
    });

    it('returns undefined for a non-existing user', async () => {
      const userId = 999;
      const retrievedWallet = await walletService.getWallet(userId);
      expect(retrievedWallet).toBeUndefined();
    });
  });

  describe('fundWallet', () => {
    it('adds funds to a user\'s wallet', async () => {
      const userId = 1;
      const amount = 100;
      const updatedWallet = await walletService.fundUser(userId, amount);
      expect(updatedWallet.balance).toBe(amount);
    });

    it('throws an error for a non-existing user', () => {
      const userId = 999;
      const amount = 100;
      expect(async () => await walletService.fundUser(userId, amount)).toThrowError('User not found');
    });
  });

  describe('transferFunds', () => {
    it('transfers funds from one user\'s wallet to another user\'s wallet', async () => {
      const senderId = 1;
      const recipientId = 2;
      const amount = 50;
      await walletService.createWallet(senderId);
     await  walletService.createWallet(recipientId);
     await walletService.fundUser(senderId, 100);
     await walletService.transferFunds(senderId, recipientId, amount);
      const senderWallet = await walletService.getWallet(senderId);
      const recipientWallet = await walletService.getWallet(recipientId);
      expect(senderWallet.balance).toBe(50);
      expect(recipientWallet.balance).toBe(50);
    });

    it('throws an error if sender has insufficient funds', async () => {
      const senderId = 1;
      const recipientId = 2;
      const amount = 1000;
     await walletService.createWallet(senderId);
     await walletService.createWallet(recipientId);
    await  walletService.fundUser(senderId, 100);
      expect(async () => await walletService.transferFunds(senderId, recipientId, amount)).toThrowError('Insufficient funds');
    });

    it('throws an error for non-existing sender or recipient user', () => {
      const senderId = 1;
      const recipientId = 999;
      const amount = 50;
      walletService.createWallet(senderId);
      expect(async () => await walletService.transferFunds(senderId, recipientId, amount)).toThrowError('User not found');
    });
  });
});
