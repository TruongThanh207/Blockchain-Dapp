export class WalletModel {
  walletAddr;
  walletName;
  walletBalance;
  accountId;

  constructor(walletAddr: string, walletName: string, walletBalance: string, accountId: string) {
    this.walletAddr = walletAddr;
    this.walletName = walletName;
    this.walletBalance = walletBalance;
    this.accountId = accountId;
  }
}