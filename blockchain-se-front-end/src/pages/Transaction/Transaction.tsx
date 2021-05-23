import { Button, Col, Form, Input, Row } from "antd";
import { AxiosError } from 'axios';
import React, { useContext } from "react";
import { store } from 'react-notifications-component';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AccountApi } from '../../api/services/account.api';
import AppContext from '../../context/AppContext';
import styles from './Transaction.module.scss';


const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};


const Transaction: React.FC<any> = props => {
  const appContext = useContext(AppContext);


  let handleSubmit = (value: { address: string, amount: number, address_from: string }) => {
    AccountApi.send(value.address_from || localStorage.getItem('address')!, value.address, value.amount).pipe(
      map(res => res.data),
      catchError((err: AxiosError) => {
        return throwError(err.response?.data.message)
      })
    ).subscribe(
      data => {
        if (!data.payload.code) {

          notification('success', 'Success !!', 'Transaction successfully');

        } else {
          notification('danger', 'Error !!', data.payload.error);
        }
        appContext.setLoading && appContext.setLoading(false);

      },
      error => {
        notification('danger', 'Error !!', error.payload.error);
      }
    )
  }

  let notification = (type: any, title: string, message: string) => {
    store.addNotification({
      title,
      message,
      type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });
  }

  return (
    <>
      <Row>
        <Col sm={24}>
          <header className={styles['transaction-container']}>
            <h2>
              Transaction
            </h2>
          </header>
          <section className={styles['section-container']}>
            <Form
              {...layout}
              name="basic"
              initialValues={
                {
                  address: '',
                  amount: 0,
                  address_from: localStorage.getItem('address') || ''
                }
              }
              onFinish={handleSubmit}
            >

              <Form.Item
                label="Source"
                // labelCol={{className: 'text-center'}}
                name="address_from"
                rules={[{ required: true, message: 'Please input your source!' }]}
              >
                <Input type={'text'} />
              </Form.Item>

              <Form.Item
                label="Destination"
                // labelCol={{className: 'text-center'}}
                name="address"
                rules={[{ required: true, message: 'Please input your destination!' }]}
              >
                <Input type={'text'} />
              </Form.Item>

              <Form.Item
                label="Amount"
                // labelCol={{className: 'text-center'}}
                name="amount"
                rules={[{ required: true, message: 'Please input your amount!' }]}
              >
                <Input type={'number'} />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Send money
                </Button>
              </Form.Item>
            </Form>
          </section>
        </Col>
      </Row>
    </>
  )
}
export default Transaction