import React, { useEffect, useState } from "react";
import styles from './MyWallet.module.scss';
import { Col, Row } from "antd";
import TransactionHistory from "../../components/TransactionHistory/TransactionHistory";
import { AccountApi } from '../../api/services/account.api';
import { catchError, map } from 'rxjs/operators';
import { AxiosError } from 'axios';
import { throwError } from 'rxjs';

const MyWallet: React.FC<any> = props => {
  const [address, setAddress] = useState(localStorage.getItem('address') || '');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    AccountApi.getBalance(address).pipe(
      map(res => res.data),
      catchError((err: AxiosError) => {
        return throwError(err.response?.data.message)
      })
    ).subscribe(
      data => {
        if (!data.payload.code) {
          setBalance(data.payload.balance);
        }
      }
    )
  }, [])


  return (
    <>
      <Row>
        <Col sm={24}>
          <header className={styles['wallet-container']}>
            <h2>
              My wallet
            </h2>
          </header>
          <section className={styles['section-container']}>
            <Row>
              <Col xs={24} md={12}>
                <TransactionHistory balance={balance} />
              </Col>
              <Col xs={24} md={12}>
                Account settings
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={4}>
                QR code
                <img src={'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + address} alt="qrcode" />
              </Col>
              <Col xs={24} md={20}>
                Address info (PIN):
                <p>
                  <b>
                    {address}
                  </b>
                </p>
              </Col>
            </Row>
          </section>
        </Col>
      </Row>
    </>
  )
}

export default MyWallet;