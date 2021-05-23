export class WalletTransModel {
  fromWalletAddr: string;
  toWalletAddr: string;
  amount: number;

  constructor(fromWalletAddr: string, toWalletAddr: string, amount: number) {
    this.fromWalletAddr = fromWalletAddr;
    this.toWalletAddr = toWalletAddr;
    this.amount = amount;
  }
}