import { AccountModel } from '../api/models/account.model'
import { WalletModel } from '../api/models/wallet.model'
import { WalletTransModel } from '../api/models/walletTrans.model'

export interface IAppContext {
  isAuthorized?: boolean
  setIsAuthorized?: Function
  loading?: boolean
  setLoading?: Function
}
