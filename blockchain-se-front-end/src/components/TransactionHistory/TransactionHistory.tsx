import React from "react";
import styles from './TransactionHistory.module.scss'

const TransactionHistory: React.FC<any> = props => {
  return (
    <table className={styles['table']}>
      <tbody>
        {/* <tr>
          <td>Total transactions</td>
          <td className="ng-binding">0</td>
        </tr>
        <tr>
          <td>Total received</td>
          <td className="ng-binding">0.00 DOGE</td>
        </tr>
        <tr>
          <td>Total sent</td>
          <td className="ng-binding">0.00 DOGE</td>
        </tr> */}
        <tr>
          <td>Balance</td>
          <td className="ng-binding">{Math.ceil(props.balance)} ETH</td>
        </tr>
      </tbody>
    </table>
  )
}
export default TransactionHistory;