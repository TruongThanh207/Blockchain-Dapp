import { Button, Col, Form, Input, Row } from "antd";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { store } from "react-notifications-component";
import { useHistory } from "react-router";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthApi } from "../../api/services/auth.api";
import styles from './Verify.module.scss';

const layout = {
  labelCol: {span: 6},
  wrapperCol: {span: 16},
};
const tailLayout = {
  wrapperCol: {offset: 16, span: 16},
};


const Verify: React.FC<any> = props => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const history = useHistory();

  let handleSubmit = (value: { token: string, code: string }) => {
    AuthApi.verify(token, value.code).pipe(
        map(res => res.data),
        catchError((err: AxiosError) => {
          return throwError(err.response?.data.message)
        })
    ).subscribe(
        value1 => {
          if (value1.payload) {
            history.push('/');
            notification('success', 'Title !!', 'Verify successfully');
          }
        },
        error => {
          notification('danger', 'Error !!', error);
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
        duration: 5000,
        onScreen: true
      }
    });
  }

  return (
      <>
        <Row>
          <Col sm={24}>
            <header className={styles['verify-container']}>
              <h2>
                Verify
              </h2>
            </header>
            <section className={styles['section-container']}>
              {/* <h2>
                Please check mail to get <b>Code</b> !!!
              </h2> */}
              <Form
                  {...layout}
                  name="basic"
                  initialValues={{token, code: ''}}
                  onFinish={handleSubmit}
              >
                <Form.Item
                    label="Address"
                    // labelCol={{className: 'text-center'}}
                    name="token"
                    rules={[{required: true, message: 'Please input your token!'}]}
                >
                  <Input type={'text'} disabled/>
                </Form.Item>

                <Form.Item
                    label="Code"
                    // labelCol={{className: 'text-center'}}
                    name="code"
                    rules={[{required: true, message: 'Please input your code!'}]}
                >
                  <Input type={'text'}/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Verify
                  </Button>
                </Form.Item>
              </Form>
            </section>
          </Col>
        </Row>
      </>
  )
}
export default Verify;